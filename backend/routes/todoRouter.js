const express = require('express');
const todoController = require('../controllers/todoController');
const router = express.Router();

router.route('/').get(todoController.getAllTasks);
router.route('/add').post(todoController.createTask);
router.route('/update/:todoId').patch(todoController.updateTask);
router.route('/mark/:todoId').patch(todoController.markTask);

module.exports = router;