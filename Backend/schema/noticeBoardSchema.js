const mongoose = require('mongoose');
const schema = mongoose.Schema;

const noticeBoardSchema = new schema({
  name: { type: String },
  send_to: { type: String, enum: ["all", "selected"] },
  employee: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  type_document: { type: String, enum: ["pdf", "text", "video", "youtube"] },
  document_pics: { type: String, default: null },
  duration: { type: String, enum: ["permenet", "part-time"] },
  start_date: { type: Date, default: Date.now, default: null },
  end_date: { type: Date, default: Date.now, default: null },
  is_active: { type: Boolean }
}, { timestamps: true });

module.exports = board = mongoose.model('board', noticeBoardSchema);