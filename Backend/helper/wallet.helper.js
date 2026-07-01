'use strict';

const walletRuleSch = require('../schema/walletSchema');
const customerSch = require('../schema/customerSchema');
const walletTransactionSch = require('../schema/walletTransactionSchema');

const WalletHelper = {};

WalletHelper.creditPoints = async ({ customerId, eventType, orderAmount = 0 }) => {

    try {
        const rule = await walletRuleSch.findOne({ event_type: eventType, is_active: true,is_deleted: false });
        if (!rule)  return;

        let points = 0;
        if (rule.reward_type === 'FIXED') {
            points = Number(rule.amount);
        } else if (rule.reward_type === 'PERCENTAGE') {
            if ( orderAmount <(rule.min_order_amount || 0) ) return;
            points = (Number(orderAmount) * Number(rule.amount)) / 100;
        }

        if (points <= 0) return;
        await customerSch.findByIdAndUpdate(customerId,{ $inc: {wallet_points: points}});
        await walletTransactionSch.create({customer_id: customerId, event_type: eventType, points, transaction_type: 'CREDIT'});
        return true;

    } catch (err) {
        throw err;
    }
};

WalletHelper.processReferral = async (customer) => {

    const rule = await walletRuleSch.findOne({ event_type: 'REFERRAL_SUCCESS',is_active: true,is_deleted: false});
    if (!rule) return;

    const points = Number(rule.amount);
    const referrerId = customer.ref_name;

    switch (rule.reward_receiver) {
        case 'REFERRER':
            await WalletHelper.creditPoints({ customerId: referrerId, eventType: 'REFERRAL_SUCCESS', points });
            break;

        case 'REFERRED_USER':
            await WalletHelper.creditPoints({ customerId: customer._id, eventType: 'REFERRAL_SUCCESS',  points });
            break;

        case 'BOTH':
            await WalletHelper.creditPoints({ customerId: customer._id,  eventType: 'REFERRAL_SUCCESS', points });
            await WalletHelper.creditPoints({ customerId: referrerId, eventType: 'REFERRAL_SUCCESS', points });
            break;
    }
};

module.exports = WalletHelper;