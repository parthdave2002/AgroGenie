'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const kanbanColumnSchema = new schema({
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  createdBy: {
    id: { type: String },
    name: { type: String },
    email: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  is_deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('kanban_columns', kanbanColumnSchema);
