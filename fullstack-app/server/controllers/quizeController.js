const { body, param, validationResult } = require('express-validator');
const { Quiz } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

class QuizController {
    async createQuiz(req, res) {
        try {
            const { question, options, correctOption, moduleId } = req.body;

            if (!ObjectId.isValid(moduleId)) {
                return res.status(400).json({ error: 'Invalid lessonId' });
            }

            const newQuiz = new Quiz({
                question: question,
                options: options,
                correctOption: correctOption,
                moduleId: moduleId,
            });

            await newQuiz.save();
            res.status(201).json(newQuiz);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create a quiz' });
        }
    }

    async getAllQuizzes(req, res) {
        try {
            const quizzes = await Quiz.find();
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch quizzes' });
        }
    }

    async getAllQuizzesForModule(req, res) {
        try {
            const moduleId = req.params.moduleId;
            if (!ObjectId.isValid(moduleId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }
            const quizzesForModule = await Quiz.find({ moduleId: moduleId });

            const quizzesWithQuestions = quizzesForModule.map((quiz) => ({
                ...quiz.toObject(),
                question: quiz.question || 'Missing question',
            }));

            res.json(quizzesWithQuestions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch quizzes for the module' });
        }
    }




    async getQuizById(req, res) {
        try {
            const quizId = req.params.id;
            if (!ObjectId.isValid(quizId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            const quiz = await Quiz.findById(quizId);

            if (!quiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            res.json(quiz);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get quiz' });
        }
    }

    async updateQuiz(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const quizId = req.params.id;
            const updatedQuizData = req.body;

            const updatedQuiz = await Quiz.findByIdAndUpdate(
                quizId,
                updatedQuizData,
                { new: true }
            );

            if (!updatedQuiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            res.json(updatedQuiz);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update quiz' });
        }
    }

    async deleteQuiz(req, res) {
        try {
            const quizId = req.params.id;
            const quiz = await Quiz.findById(quizId);

            if (!quiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            await Quiz.findByIdAndDelete(quizId);
            res.json({ message: 'Quiz deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete quiz' });
        }
    }
}

module.exports = new QuizController();

