const mongoose = require('mongoose');
const schema = mongoose.Schema;

const leaveSchema = new schema({
  start_date : { type: Date },
  end_date : { type: Date },
  request_for : { type: schema.Types.ObjectId, ref: 'users' },
  leave_type: { type: schema.Types.ObjectId, ref: 'leave_management' },
  leave_plan : {type: String },
  reason: { type: String },
  days: { type: Number, default: 1 },
  status: { type: String,  enum: [ 'pending','approved', 'rejected', 'cancel'], default : "pending"  },
  requested_by: { type: schema.Types.ObjectId, ref: 'users' },
  requested_at: { type: Date, default: Date.now },
  approved_by: { type: schema.Types.ObjectId, ref: 'users', default: null},
  approved_date : { type: Date, default: Date.now , default: null},
},{ timestamps: { createdAt: 'requested_at' }});

module.exports = Leave = mongoose.model('user_leaves', leaveSchema);