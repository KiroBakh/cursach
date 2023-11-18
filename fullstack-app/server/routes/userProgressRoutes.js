const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgressController');

router.post('/user-progress', userProgressController.createUserProgress);
router.get('/user-progress', userProgressController.getAllUserProgress);
router.get('/user-progress/:id', userProgressController.getUserProgressById);
router.put('/user-progress/:id', userProgressController.updateUserProgress);
router.delete('/user-progress/:id', userProgressController.deleteUserProgress);

module.exports = router;
