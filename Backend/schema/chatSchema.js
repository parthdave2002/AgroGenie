const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatSchema = new schema({
  sender: { type: schema.Types.ObjectId, ref: 'users' },
  receiver: { type: schema.Types.ObjectId, ref: 'users' },
  message: { type: String, required: true },
  sent_at: { type: Date, default: Date.now },
  type : { type: String, enum: ['group', 'personal'], default: 'personal' },
  message_type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  unread_count: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: { type: schema.Types.ObjectId, ref: 'users' },
});

module.exports = Chats = mongoose.model('chats', chatSchema);