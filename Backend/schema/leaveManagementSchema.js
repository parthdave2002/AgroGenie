const mongoose = require('mongoose');
const schema = mongoose.Schema;

const leavemanagementSchema = new schema({
  name : { type: String },
  count : { type: Number, required: true, default :0 },
  is_active: { type: Boolean, required: true, default: true },
},{ timestamps: { createdAt: 'requested_at' }});

module.exports = LeaveManagement = mongoose.model('leave_management', leavemanagementSchema);