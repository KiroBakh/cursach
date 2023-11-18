const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizeController');


router.get('/quizzes/module/:moduleId', quizController.getAllQuizzesForModule);
router.get('/quizzes', quizController.getAllQuizzes);
router.get('/quizzes', quizController.getAllQuizzesForModule);
router.get('/quizzes/:id', quizController.getQuizById);
router.post('/quizzes', quizController.createQuiz);
router.put('/quizzes/:id', quizController.updateQuiz);
router.delete('/quizzes/:id', quizController.deleteQuiz);

module.exports = router;