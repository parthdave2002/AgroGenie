'use strict';
const express = require('express');
const router = express.Router();
const { authentication, authorization } = require('../../middleware/auth.middleware');
const walletModule = require('../../modules/wallet/walletController');

router.get("/get-wallet-rules",authentication, walletModule.getAllWalletRulesList)
router.post("/add-wallet-rules",authentication, walletModule.AddWalletRules)
router.delete("/remove-wallet-rules",authentication, walletModule.DeleteWalletRules)
router.delete("/status-wallet-rules",authentication, walletModule.changeStatus)

module.exports = router;
