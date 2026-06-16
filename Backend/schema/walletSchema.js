const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletRulesSchema = new Schema({
    event_type: { type: String, enum: [ 'CUSTOMER_REGISTERED', 'REFERRAL_SUCCESS', 'ORDER_COMPLETED', 'FIRST_ORDER_COMPLETED', 'PROFILE_COMPLETED', 'BIRTHDAY_REWARD', 'REVIEW_ADDED'],  required: true},
    reward_receiver: { type: String, enum: [ 'CUSTOMER', 'REFERRER', 'REFERRED_USER',  'BOTH' ]},
    reward_type: { type: String,enum: ['FIXED','PERCENTAGE' ], default: 'FIXED'},
    min_order_amount: { type: Number, default: 0},
    name: {  type: String,  required: true },
    amount: {  type: Number,  required: true },
    is_active: { type: Boolean, required: true,  default: true,},
    added_at: { type: Date,  default: Date.now },
    is_deleted:{ type: Boolean, default: false},
    updated_at: { type: Date,  default: Date.now},
});

module.exports = ReferralRules = mongoose.model('wallet-rules', walletRulesSchema);