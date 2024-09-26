const express = require('express');
const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.authenticate);
router.route('/').get(todoController.getAllTasks);
router.route('/add').post(todoController.createTask);
router.route('/update/:todoId').patch(todoController.updateTask);
router.route('/mark/:todoId').patch(todoController.markTask);
router.route('/:todoId').delete(todoController.deleteTask);
module.exports = router;