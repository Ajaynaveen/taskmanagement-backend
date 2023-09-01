// controllers/taskController.js
const mongoose=require('mongoose')
const Task = require('../models/task');

const taskController = {
    createTask: async (req, res) => {
        try {
            const { title, description, dueDate } = req.body;
            const assignedTo = req.userId;

            const newTask = new Task({
                title,
                description,
                assignedTo,
                dueDate,
            });

            await newTask.save();
            res.status(201).json({ message: 'Task created successfully' });
        } catch (error) {
            console.error('Error creating task', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getTasks: async (req, res) => {
        try {
            const userId = req.userId;
            
            const tasks = await Task.find({ assignedTo: userId });
            res.json(tasks);
        } catch (error) {
            console.error('Error fetching tasks', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getTaskById: async (req, res) => {
        try {
            const userId = req.userId;
            const taskId = req.params.taskId;

            // Create an ObjectId instance from the string taskId
          

            const task = await Task.findOne({ _id: taskId, assignedTo: userId });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            console.error('Error fetching task by ID', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateTask: async (req, res) => {
        try {
            const userId = req.userId;
            const taskId = req.params.taskId;
            const { title, description, dueDate } = req.body;

            const updatedTask = await Task.findOneAndUpdate(
                { _id: taskId, assignedTo: userId },
                { title, description, dueDate },
                { new: true }
            );

            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json({ message: 'Task updated successfully' });
        } catch (error) {
            console.error('Error updating task by ID', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const userId = req.userId;
            const taskId = req.params.taskId;
            const deletedTask = await Task.findOneAndDelete({
                _id: taskId,
                assignedTo: userId,
            });

            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task by ID', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

};

module.exports = taskController;
