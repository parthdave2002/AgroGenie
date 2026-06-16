const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId,  ref: 'customer',   required: true},
    event_type: { type: String, required: true },
    points: { type: Number, required: true},
    transaction_type: {  type: String,  enum: ['CREDIT', 'DEBIT'],  default: 'CREDIT'},
    remark: {  type: String},
    added_at: { type: Date, default: Date.now}
});

module.exports = mongoose.model('wallet-transactions', walletTransactionSchema);