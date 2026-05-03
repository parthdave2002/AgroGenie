const mongoose = require('mongoose');
const schema = mongoose.Schema;

const warehouseSchema = new schema({
  name: { type: String },
  location: { type: String },
  address: { type: String },
  is_active: { type: Boolean },
}, { timestamps : true});

module.exports = warehouse = mongoose.model('warehouse', warehouseSchema);