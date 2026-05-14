const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userCategorySchema = new schema({
  category_name: { type: String, required: true },
  description: { type: String },
  goal_amt: { type: Number, required: true, default: 0 },
  is_active: { type: Boolean, required: true, default: false },
  updated_at: { type: Date, default: Date.now },
  added_at: { type: Date, default: Date.now},
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false},
  deleted_by: { type: schema.Types.ObjectId},
  deleted_at: {type: Date},
});

module.exports = User = mongoose.model('user_categories', userCategorySchema);
