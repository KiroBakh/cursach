const { body, param, validationResult } = require('express-validator');
const { Lesson } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

class LessonController {
    async createLesson(req, res) {
        try {
            const { title, content, quizzes, moduleId } = req.body;

            if ( !ObjectId.isValid(moduleId)) {
                return res.status(400).json({ error: 'Invalid courseId or moduleId' });
            }

            const newLesson = new Lesson({
                title: title,
                content: content,
                moduleId: moduleId,
                quizzes: quizzes || [],
            });

            await newLesson.save();
            res.status(201).json(newLesson);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create a lesson' });
        }
    }

    async getAllLessons(req, res) {
        try {
            const { courseId, moduleId } = req.params;
            if (!ObjectId.isValid(courseId) || !ObjectId.isValid(moduleId)) {
                return res.status(400).json({ error: 'Invalid courseId or moduleId' });
            }

            const lessons = await Lesson.find({ courseId: courseId, moduleId: moduleId });
            res.json(lessons);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch lessons' });
        }
    }


    async getAllLessonsForModule(req, res) {
        try {
            const courseId = req.params.courseId;
            const moduleId = req.params.moduleId;

            if (!ObjectId.isValid(courseId)) {
                return res.status(400).json({ error: 'Invalid courseId' });
            }

            if (!ObjectId.isValid(moduleId)) {
                return res.status(400).json({ error: 'Invalid courseId' });
            }

            const lessonForModule = await Lesson.find({ moduleId });

            res.json(lessonForModule);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch modules for the course' });
        }
    }

    async getLessonById(req, res) {
        try {
            const lessonId = req.params.id;
            if (!ObjectId.isValid(lessonId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            const lesson = await Lesson.findById(lessonId);

            if (!lesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }

            res.json(lesson);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get lesson' });
        }
    }

    async updateLesson(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const lessonId = req.params.id;
            const updatedLessonData = req.body;

            const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updatedLessonData, { new: true });

            if (!updatedLesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }

            res.json(updatedLesson);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update lesson' });
        }
    }

    async deleteLesson(req, res) {
        try {
            const lessonId = req.params.id;
            const lesson = await Lesson.findById(lessonId);

            if (!lesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }

            await Lesson.findByIdAndDelete(lessonId);
            res.json({ message: 'Lesson deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete lesson' });
        }
    }
}

module.exports = new LessonController();
