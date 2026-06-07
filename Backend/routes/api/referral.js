'use strict';
const express = require('express');
const router = express.Router();
const { authentication, authorization } = require('../../middleware/auth.middleware');
const referralModule = require('../../modules/referral/referralController');

router.get("/get-referral-rules",authentication, referralModule.getAllReferralRulesList)
router.post("/add-referral-rules",authentication, referralModule.AddReferralRules)
router.delete("/remove-referral-rules",authentication, referralModule.DeleteReferralRules)
router.delete("/status-referral-rules",authentication, referralModule.changeStatus)

module.exports = router;
