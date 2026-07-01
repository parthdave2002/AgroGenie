const express = require('express');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const router = express.Router();
const uploadHelper = require("../../helper/upload.helper")
const HRController = require('../../modules/hr/hrController');

router.get("/detail", authentication,HRController.getDashboard)

module.exports = router