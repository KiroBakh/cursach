const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/courses/:courseId/modules', moduleController.getAllModulesForCourse);
router.get('/courses/:courseId/modules', moduleController.getAllModules);
router.get('/courses/:courseId/modules/:moduleId', moduleController.getModuleById);
router.post('/modules', moduleController.createModule);
router.put('/courses/:courseId/modules/:moduleId', moduleController.updateModule);
router.delete('/courses/:courseId/modules/:moduleId', moduleController.deleteModule);

module.exports = router;
