const mongoose = require('mongoose');
const schema = mongoose.Schema;

const testimonialSchema = new schema({
  name_eng: { type: String },
  name_guj: { type: String },
  village_eng: { type: String},
  village_guj: { type: String},
  body_eng: { type: String},
  body_guj: { type: String},
  rating : { type: Number, min: 1, max: 5 },
  testimonial_pics: { type: String, default: null },
}, { timestamps : true});

module.exports = testimonial = mongoose.model('testimonial', testimonialSchema);