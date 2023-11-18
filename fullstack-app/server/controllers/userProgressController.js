const { body, param, validationResult } = require('express-validator');
const { UserProgress } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

class UserProgressController {
    async createUserProgress(req, res) {
        try {
            const { user, course, completedLessons } = req.body;

            const newUserProgress = new UserProgress({
                user: user,
                course: course,
                completedLessons: completedLessons,
            });

            await newUserProgress.save();
            res.status(201).json(newUserProgress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user progress' });
        }
    }

    async getAllUserProgress(req, res) {
        try {
            const userProgress = await UserProgress.find();
            res.json(userProgress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user progress' });
        }
    }

    async getUserProgressById(req, res) {
        try {
            const userProgressId = req.params.id;
            if (!ObjectId.isValid(userProgressId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            const userProgress = await UserProgress.findById(userProgressId);

            if (!userProgress) {
                return res.status(404).json({ error: 'User progress not found' });
            }

            res.json(userProgress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user progress' });
        }
    }

    async updateUserProgress(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const userProgressId = req.params.id;
            const updatedUserProgressData = req.body;

            const updatedUserProgress = await UserProgress.findByIdAndUpdate(
                userProgressId,
                updatedUserProgressData,
                { new: true }
            );

            if (!updatedUserProgress) {
                return res.status(404).json({ error: 'User progress not found' });
            }

            res.json(updatedUserProgress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user progress' });
        }
    }

    async deleteUserProgress(req, res) {
        try {
            const userProgressId = req.params.id;
            const userProgress = await UserProgress.findById(userProgressId);

            if (!userProgress) {
                return res.status(404).json({ error: 'User progress not found' });
            }

            await UserProgress.findByIdAndDelete(userProgressId);
            res.json({ message: 'User progress deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete user progress' });
        }
    }
}

module.exports = new UserProgressController();
