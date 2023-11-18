
const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/courses/:courseId/modules/:moduleId/lessons', lessonController.getAllLessonsForModule);
router.get('/courses/:courseId/modules/:moduleId/lessons', lessonController.getAllLessons);
router.get('/courses/:courseId/modules/:moduleId/lessons/:id', lessonController.getLessonById);
router.post('/lessons', lessonController.createLesson);
router.put('/courses/:courseId/modules/:moduleId/lessons/:id', lessonController.updateLesson);
router.delete('/courses/:courseId/modules/:moduleId/lessons/:id', lessonController.deleteLesson);


module.exports = router;
