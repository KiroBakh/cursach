const { body, param, validationResult } = require('express-validator');
const { Comment } = require('../models/models');
const { ObjectId } = require('mongoose').Types;

class CommentController {
    async createComment(req, res) {
        try {
            const { text, user, lesson, rating, courseId } = req.body;

            if (!ObjectId.isValid(courseId) || !ObjectId.isValid(lesson)) {
                return res.status(400).json({ error: 'Invalid courseId or lessonId' });
            }
            const newComment = new Comment({
                text: text,
                user: user,
                lesson: lesson,
                date: new Date(),
                rating: rating,
                courseId: courseId,
            });

            await newComment.save();
            res.status(201).json(newComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create a comment' });
        }
    }

    async getAllComments(req, res) {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch comments' });
        }
    }

    async getCommentById(req, res) {
        try {
            const commentId = req.params.id;
            if (!ObjectId.isValid(commentId)) {
                return res.status(400).json({ error: 'Invalid ObjectId' });
            }

            const comment = await Comment.findById(commentId);

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            res.json(comment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get comment' });
        }
    }

    async updateComment(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const commentId = req.params.id;
            const updatedCommentData = req.body;

            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                updatedCommentData,
                { new: true }
            );

            if (!updatedComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            res.json(updatedComment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update comment' });
        }
    }

    async deleteComment(req, res) {
        try {
            const commentId = req.params.id;
            const comment = await Comment.findById(commentId);

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            await Comment.findByIdAndDelete(commentId);
            res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete comment' });
        }
    }
}

module.exports = new CommentController();
