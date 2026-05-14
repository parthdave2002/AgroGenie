'use strict';
const kanbanColumnModel = require('../../schema/kanbanColumnSchema');
const kanbanTaskModel = require('../../schema/kanbanTaskSchema');
const otherHelper = require('../../helper/others.helper');
const httpStatus = require('http-status');

const kanbanController = {};

kanbanController.GetBoard = async (req, res, next) => {
  try {
    const columns = await kanbanColumnModel.find({ is_deleted: false }).sort({ order: 1, createdAt: 1 }).lean();
    const columnIds = columns.map((column) => column._id);
    const tasks = await kanbanTaskModel
      .find({ is_deleted: false, column: { $in: columnIds } })
      .lean();

    const board = columns.map((column) => ({
      ...column,
      id: column._id,
      tasks: tasks
        .filter((task) => task.column?.toString() === column._id.toString())
        .map((task) => ({
          ...task,
          id: task._id,
        })),
    }));

    return otherHelper.sendResponse(res, httpStatus.OK, true, board, null, 'Kanban board loaded', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.AddColumn = async (req, res, next) => {
  try {
    const { title, createdBy } = req.body;

    if (!title || !title.trim()) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Column title is required', null);
    }

    const order = await kanbanColumnModel.countDocuments({ is_deleted: false });
    const newColumn = await kanbanColumnModel.create({
      title: title.trim(),
      order,
      createdBy: createdBy || {},
    });

    return otherHelper.sendResponse(res, httpStatus.OK, true, newColumn, null, 'Column created successfully', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.DeleteColumn = async (req, res, next) => {
  try {
    const columnId = req.query.id || req.body.id;
    if (!columnId) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Column id is required', null);
    }

    const taskCount = await kanbanTaskModel.countDocuments({ column: columnId, is_deleted: false });
    if (taskCount > 0) {
      return otherHelper.sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        false,
        null,
        null,
        'Cannot delete column with existing tasks',
        null,
      );
    }

    const column = await kanbanColumnModel.findById(columnId);
    if (!column) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Column not found', null);
    }

    await kanbanColumnModel.findByIdAndUpdate(columnId, { is_deleted: true, updatedAt: new Date() });
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Column deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.AddTask = async (req, res, next) => {
  try {
    const { title, description, priority, column, createdBy, assignedTo, subTasks } = req.body;

    if (!title || !title.trim()) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Task title is required', null);
    }
    if (!column) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Column id is required', null);
    }

    const columnExists = await kanbanColumnModel.findOne({ _id: column, is_deleted: false });
    if (!columnExists) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Column not found', null);
    }

    const newTask = await kanbanTaskModel.create({
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      column,
      createdBy: createdBy || {},
      assignedTo: Array.isArray(assignedTo) ? assignedTo : [],
      subTasks: Array.isArray(subTasks) ? subTasks : [],
    });

    return otherHelper.sendResponse(res, httpStatus.OK, true, newTask, null, 'Task created successfully', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.UpdateTask = async (req, res, next) => {
  try {
    const { id, title, description, priority, column, assignedTo, subTasks } = req.body;
    if (!id) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Task id is required', null);
    }

    const updateData = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (column !== undefined) updateData.column = column;
    if (assignedTo !== undefined) updateData.assignedTo = Array.isArray(assignedTo) ? assignedTo : [];
    if (subTasks !== undefined) updateData.subTasks = Array.isArray(subTasks) ? subTasks : [];

    if (column) {
      const columnExists = await kanbanColumnModel.findOne({ _id: column, is_deleted: false });
      if (!columnExists) {
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Target column not found', null);
      }
    }

    const updatedTask = await kanbanTaskModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTask) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Task not found', null);
    }

    return otherHelper.sendResponse(res, httpStatus.OK, true, updatedTask, null, 'Task updated successfully', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.DeleteTask = async (req, res, next) => {
  try {
    const taskId = req.query.id || req.body.id;
    if (!taskId) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Task id is required', null);
    }

    const task = await kanbanTaskModel.findById(taskId);
    if (!task) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Task not found', null);
    }

    await kanbanTaskModel.findByIdAndUpdate(taskId, { is_deleted: true, updatedAt: new Date() });
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Task deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.AddSubTask = async (req, res, next) => {
  try {
    const { taskId, title } = req.body;
    if (!taskId) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Task id is required', null);
    }
    if (!title || !title.trim()) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Subtask title is required', null);
    }

    const task = await kanbanTaskModel.findById(taskId);
    if (!task) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Task not found', null);
    }

    const newSubTask = {
      id: `subtask-${Date.now()}`,
      title: title.trim(),
      completed: false,
    };

    task.subTasks.push(newSubTask);
    await task.save();

    return otherHelper.sendResponse(res, httpStatus.OK, true, task, null, 'Subtask added successfully', null);
  } catch (err) {
    next(err);
  }
};

kanbanController.DeleteSubTask = async (req, res, next) => {
  try {
    const { taskId, subTaskId } = req.body;
    if (!taskId) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Task id is required', null);
    }
    if (!subTaskId) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Subtask id is required', null);
    }

    const task = await kanbanTaskModel.findById(taskId);
    if (!task) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Task not found', null);
    }

    task.subTasks = task.subTasks.filter(st => st.id !== subTaskId);
    await task.save();

    return otherHelper.sendResponse(res, httpStatus.OK, true, task, null, 'Subtask deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

module.exports = kanbanController;
