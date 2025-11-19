const mongoose = require('mongoose');
const schema = mongoose.Schema;

const leaveSchema = new schema({
  start_date : { type: String },
  end_date : { type: String },
  request_for : { type: schema.Types.ObjectId, ref: 'users' },
  leave_type: { type: String, enum: ['casual', 'lwp', 'sick', 'emergency'] },
  reason: { type: String },
  days: { type: Number, default: 1 },
  status: { type: String,  enum: [ 'pending','approved', 'rejected', 'cancel'], default : "pending"  },
  requested_by: { type: schema.Types.ObjectId, ref: 'users' },
  requested_at: { type: Date, default: Date.now },
  approved_by: { type: schema.Types.ObjectId, ref: 'users', default: null},
  approved_date : { type: Date, default: Date.now , default: null},
},{ timestamps: { createdAt: 'requested_at' }});

module.exports = Leave = mongoose.model('Leave', leaveSchema);