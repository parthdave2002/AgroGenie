const mongoose = require('mongoose');
const schema = mongoose.Schema;

const companySchema = new schema({
    name_eng: { type: String,  required: true},
    name_guj: { type: String,  required: true},
    description: { type: String,  required: true, },
    is_active: { type: Boolean, required: true,  default: true,},
    added_at: { type: Date,  default: Date.now},
    is_deleted: { type: Boolean, default: false },
    added_by: { type: schema.Types.ObjectId, ref: 'users' },
});

companySchema.set('toObject', { virtuals: true });
companySchema.set('toJSON', { virtuals: true });

companySchema.virtual('products', {
    ref: 'product',
    localField: '_id',
    foreignField: 'company',
    justOne: false,
});

module.exports = Company = mongoose.model('company', companySchema);