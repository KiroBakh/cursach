const { body, param, validationResult } = require('express-validator');
const { Course } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

class CourseController {
    async createCourse(req, res) {
        try {
            const { title, description,  author, materials } = req.body;

            const newCourse = new Course({
                title: title,
                description: description,
                author: author,
                materials: materials,
            });

            await newCourse.save()
                .then(() => {
                    console.log("Successfully created a course");
                })
                .catch((err) => {
                    console.log(err);
                });

            res.status(201).json(newCourse);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create a course' });
        }
    }


    async getAllCourses(req, res) {
        console.log(req.body);
        try {
            const courses = await Course.find();
            res.json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch courses' });
        }
    }

    async getCourseById(req, res) {
        try {
            const courseId = req.params.id;
            if (!ObjectId.isValid(courseId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(course);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get course' });
        }
    }

    async updateCourse(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const courseId = req.params.id;
            const updatedCourseData = req.body;

            const updatedCourse = await Course.findByIdAndUpdate(courseId, updatedCourseData, { new: true });

            if (!updatedCourse) {
                return res.status(404).json({ error: 'Course not found' });
            }

            res.json(updatedCourse);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update course' });
        }
    }

    async deleteCourse(req, res) {
        try {
            const courseId = req.params.id;
            const course = await Course.findById(courseId);

            if (!course) {
                return res.status(404).json({ error: 'Course not found' });
            }

            await Course.findByIdAndDelete(courseId);
            res.json({ message: 'Course deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete course' });
        }
    }
}

module.exports = new CourseController();
