/*Task Routes for Handling CRUD operations for tasks */

const express = require('express');
const { body } = require('express-validator');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');
const validate = require('../middleware/validation');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);


router.get('/', async (req, res) => {
  try {
    const { status, sortBy = 'deadline', page = 1, limit = 10 } = req.query;
    
    // Build query filter
    const filter = { user: req.user._id };
    if (status && ['Pending', 'In Progress', 'Done'].includes(status)) {
      filter.status = status;
    }

    // Build sort object
    const sortOptions = {};
    if (sortBy === 'deadline') {
      sortOptions.deadline = 1; // Ascending
    } else if (sortBy === 'createdAt') {
      sortOptions.createdAt = -1; // Descending (newest first)
    } else if (sortBy === 'status') {
      sortOptions.status = 1;
    } else {
      sortOptions.deadline = 1; // Default
    }

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch tasks with pagination
    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .select('-__v');

    // Get total count for pagination
    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalTasks: total,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});


router.post(
  '/',
  [
    // Validation rules
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Description cannot exceed 1000 characters'),
    body('status')
      .optional()
      .isIn(['Pending', 'In Progress', 'Done'])
      .withMessage('Status must be one of: Pending, In Progress, Done'),
    body('deadline')
      .notEmpty()
      .withMessage('Deadline is required')
      .isISO8601()
      .withMessage('Deadline must be a valid date')
  ],
  validate,
  async (req, res) => {
    try {
      const { title, description, status, deadline } = req.body;

      // Create new task
      const task = new Task({
        title,
        description: description || '',
        status: status || 'Pending',
        deadline: new Date(deadline),
        user: req.user._id
      });

      await task.save();

      res.status(201).json({
        message: 'Task created successfully',
        task
      });
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({ message: 'Error creating task', error: error.message });
    }
  }
);


router.put(
  '/:id',
  [
    // Validation rules
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 200 })
      .withMessage('Title cannot exceed 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Description cannot exceed 1000 characters'),
    body('status')
      .optional()
      .isIn(['Pending', 'In Progress', 'Done'])
      .withMessage('Status must be one of: Pending, In Progress, Done'),
    body('deadline')
      .optional()
      .isISO8601()
      .withMessage('Deadline must be a valid date')
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Find task and verify ownership
      const task = await Task.findOne({ _id: id, user: req.user._id });
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Update fields
      if (updates.title !== undefined) task.title = updates.title;
      if (updates.description !== undefined) task.description = updates.description;
      if (updates.status !== undefined) task.status = updates.status;
      if (updates.deadline !== undefined) task.deadline = new Date(updates.deadline);

      await task.save();

      res.json({
        message: 'Task updated successfully',
        task
      });
    } catch (error) {
      console.error('Update task error:', error);
      res.status(500).json({ message: 'Error updating task', error: error.message });
    }
  }
);


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find task and verify ownership
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

module.exports = router;

