const express = require('express');
const router = express.Router();
const leaveController = require('../../modules/leave/leaveController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/get-leave-management', authentication, leaveController.GetLeaveManagementList);
router.post('/add-leave-management',authentication, leaveController.AddLeaveManagement);
router.post('/changestatus-leave-management',authentication, leaveController.LeaveManagementChangeStatus);
router.get('/get-leave', authentication, leaveController.getAllleave);
router.post('/add-leave',authentication, leaveController.addleave);
router.post('/approve-leave',authentication, leaveController.changeStatus);

module.exports = router