'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subTaskSchema = new schema({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const kanbanTaskSchema = new schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  column: { type: schema.Types.ObjectId, ref: 'kanban_columns', required: true },
  createdBy: {
    id: { type: String },
    name: { type: String },
    email: { type: String },
  },
  assignedTo: [
    {
      id: { type: String },
      name: { type: String },
      email: { type: String },
    },
  ],
  subTasks: [subTaskSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('kanban_tasks', kanbanTaskSchema);
