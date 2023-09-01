// routes/taskroutes.js

const express = require('express');
const router = express.Router();
const authmiddleware=require('../middleware/authmidleware')
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/', authmiddleware.verifytoken, taskController.createTask);

// Get all tasks for the authenticated user
router.get('/', authmiddleware.verifytoken, taskController.getTasks);

// // Get a specific task by ID
router.get('/:taskId', authmiddleware.verifytoken, taskController.getTaskById);

// // Update a task by ID
router.put('/:taskId', authmiddleware.verifytoken, taskController.updateTask);

// // Delete a task by ID
router.delete('/:taskId', authmiddleware.verifytoken, taskController.deleteTask);

module.exports = router;
