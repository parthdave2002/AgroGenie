const mongoose = require('mongoose');
const schema = mongoose.Schema;

const templateSchema = new schema({
  template_name: { type: String },
  template_key: { type: String},
  information: { type: String },
  variables: [{ type: String }],
  from: { type: String },
  subject: { type: String},
  alternate_text: { type: String},
  body: { type: String},
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'agents' },
  is_deleted: { type: Boolean, default: false, required: true },
  deleted_by: { type: schema.Types.ObjectId, ref: 'agents' },
  deleted_at: { type: Date },
});

module.exports = template = mongoose.model('template', templateSchema);
