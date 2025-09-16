const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerTypeSchema = new Schema({
    banner_type : { type: String,  required: true },
    banner_URL : { type: String },
    banner_pic: {  type: String },
    banner_duration :  { type: Number },
    name: {  type: String,  required: true },
    description : {  type: String },
    is_active: { type: Boolean, required: true,  default: true},
    is_promotion : { type: Boolean, required: true,  default: false},
    added_at: { type: Date,  default: Date.now },
});

module.exports = Banner = mongoose.model('banner', bannerTypeSchema);