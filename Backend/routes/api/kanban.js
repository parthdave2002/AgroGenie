'use strict';
const express = require('express');
const router = express.Router();
const kanbanModule = require('../../modules/kanban/kanbanController');

router.get('/board', kanbanModule.GetBoard);
router.post('/add-column', kanbanModule.AddColumn);
router.delete('/delete-column', kanbanModule.DeleteColumn);
router.post('/add-task', kanbanModule.AddTask);
router.put('/update-task', kanbanModule.UpdateTask);
router.delete('/delete-task', kanbanModule.DeleteTask);
router.post('/add-subtask', kanbanModule.AddSubTask);
router.delete('/delete-subtask', kanbanModule.DeleteSubTask);

module.exports = router;
