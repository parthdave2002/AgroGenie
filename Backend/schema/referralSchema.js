const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referralRulesSchema = new Schema({
    name: {  type: String,  required: true },
    amount: {  type: String,  required: true },
    is_active: { type: Boolean, required: true,  default: true,},
    added_at: { type: Date,  default: Date.now },
    is_deleted:{ type: Boolean, default: false},
    updated_at: { type: Date,  default: Date.now},
});

module.exports = ReferralRules = mongoose.model('referral_rules', referralRulesSchema);