'use strict';
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const otherHelper = require('../../helper/others.helper');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

router.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt, notes } = req.body;

  if (!amount || amount <= 0) {
    return otherHelper.sendResponse(res, 400, false, null, 'Amount is required and must be greater than 0', 'Invalid request', null);
  }

  try {
    const orderOptions = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: notes || {},
    };

    const order = await razorpay.orders.create(orderOptions);
    return otherHelper.sendResponse(res, 200, true, { order, key_id: process.env.RAZORPAY_KEY_ID || '' }, null, 'Order created successfully', null);
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return otherHelper.sendResponse(res, 500, false, null, error.message || error, 'Unable to create Razorpay order', null);
  }
});

router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return otherHelper.sendResponse(res, 400, false, null, 'Missing payment verification parameters', 'Invalid request', null);
  }

  try {
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = generatedSignature === razorpay_signature;
    return otherHelper.sendResponse(res, 200, true, { valid: isValid }, null, isValid ? 'Payment verified successfully' : 'Payment verification failed', null);
  } catch (error) {
    return otherHelper.sendResponse(res, 500, false, null, error.message || error, 'Payment verification error', null);
  }
});

module.exports = router;
