const httpStatus = require('http-status');
const mongoose = require("mongoose");
const otherHelper = require('../../helper/others.helper');
const leaveSch = require('../../schema/leaveSchema');
const leaveManageSch = require('../../schema/leaveManagementSchema');
const leaveController = {};

leaveController.GetLeaveManagementList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    const leaveManagements = await leaveManageSch.find({is_active: true});

    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
    searchQuery = { ...searchQuery };

    const usedLeaves = await leaveSch.aggregate([
      {
        $match: {
          request_for: new mongoose.Types.ObjectId(userId),
          status: { $in: ["approved", "pending"] }, // count approved & pending
        },
      },
      {
        $group: {
          _id: "$leave_type",
          used: { $sum: "$days" },
        },
      },
    ]);

    const usedLeaveMap = {};
    usedLeaves.forEach((leave) => { usedLeaveMap[leave._id] = leave.used;});
    const leaveSummary = leaveManagements.map((item) => {
    const used = usedLeaveMap[item.name] || 0;

      return {
        _id: item._id,
        leave_type: item.name,
        total_leave: item.count,
        used_leave: used,
        remaining_leave: Math.max(item.count - used, 0),
        is_active: item.is_active,
      };
    });

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, leaveSummary, 'Leave Data get successfully', page, size, leaveSummary.totalData);
  } catch (err) {
    next(err);
  }
};

leaveController.AddLeaveManagement = async (req, res, next) => {
  try {
    const Leave = req.body;
    if (Leave._id) {
      const updated = await leaveManageSch.findByIdAndUpdate(Leave._id, { $set: Leave }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, updated, null, 'Leave updated successfully', null);
    } else {
      const existingLeave = await leaveManageSch.findOne({ name: Leave.name });
      if (existingLeave) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'name already exists', null);
      const newLeave = new leaveManageSch(Leave);
      await newLeave.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newLeave, null, 'Leave created successfully', null);
    }
  } catch (err) {
    next(err);
  }
};

leaveController.LeaveManagementChangeStatus = async (req, res, next) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Leave ID is required', null);
    const leave = await leaveManageSch.findById(id);
    if (!leave) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Leave not found', null);
    const newStatus = !leave.is_active;
    const updated = await leaveManageSch.findByIdAndUpdate(id, { is_active: newStatus, updated_at: new Date() }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, updated, null, leave.is_active ? 'Leave deactivated successfully' : 'Leave activated successfully', null);
  } catch (err) {
    next(err);
  }
};

leaveController.getAllleave = async (req, res, next) => {
  try {
    
    const { id : userid, type } = req.user;
    let { page, size, populate, selectQuery, sortQuery } = otherHelper.parseFilters(req);
  
    const userPopulate = [
      { path: 'requested_by', select: 'name' },
      { path: 'request_for', select: 'name' },
      { path: 'approved_by', select: 'name' }
    ];

    if (userid && type !== "admin") {
      const lead = await otherHelper.getQuerySendResponse(leaveSch, page, size, sortQuery,{request_for:userid}, selectQuery, next, userPopulate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, lead, 'Leave data get successfully', page, size, lead.totalData);
    }

    if (type === "admin") {
      const { month } = req.query;
      const currentDate = new Date();
      const defaultMonth = `${String(currentDate.getMonth() + 1).padStart(2, "0")}-${currentDate.getFullYear()}`;
      const targetMonth = month || defaultMonth;

      const getMonthRange = (monthStr) => {
        const [m, y] = monthStr.split("-");
        const start = new Date( Number(y), Number(m) - 1, 1, 0, 0, 0, 0);
        const end = new Date( Number(y),Number(m),0,23,59,59,999);
        return { start, end };
      };
      const { start: monthStart, end: monthEnd } = getMonthRange(targetMonth);

      const allLeaves = await leaveSch.find().populate(userPopulate).sort(sortQuery || { createdAt: -1 });
      const leavesThisMonth =  await leaveSch.find({
        start_date: { $lte: monthEnd },
        end_date: { $gte: monthStart },
      }).populate(userPopulate).sort(sortQuery || { createdAt: -1 });

      const groupedData = {};

      leavesThisMonth.forEach((leave) => {
        const user = leave.request_for;
        if (!user) return;

        const userId = user._id.toString();
        if (!groupedData[userId]) {
          groupedData[userId] = {
            name: user.name,
            leaves: [],
          };
        }
        groupedData[userId].leaves.push(leave);
      });

      const responseData = Object.values(groupedData);
      return otherHelper.sendResponse(res, httpStatus.OK, true, responseData, null, 'Users leave fetched successfully', null);
    }
  } catch (err) {
    next(err);
  }
};

leaveController.addleave = async (req, res, next) => {
  try {
    const { id : userid ,type } = req.user
    const { leave_type,leave_plan, reason, request_for, start_date, end_date, days } = req.body;

    if(type === "admin"){
      if(!request_for) otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Please select user', null);
      
      const newLeave = new leaveSch({ leave_type, leave_plan, reason,  start_date,  end_date,  days, request_for : request_for, requested_by: userid, status: 'pending', });
      await newLeave.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newLeave, null, 'Leave created successfully', null);
    }

    if (!userid || !start_date || !end_date) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Missing required parameters', null);
    }

    const alreadyonleave = await leaveSch.findOne({request_for : userid, start_date: { $lte: start_date }, end_date: { $gte: end_date }, status: { $in: ['pending', 'approved'] } });
    if (alreadyonleave) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'You have already applied for leave on this date', null);

    const newLeave = new leaveSch({ start_date,  end_date, days, leave_type, leave_plan, reason, requested_by: userid,  request_for : userid,  status: 'pending'  });
    await newLeave.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, newLeave, null, 'Leave created successfully', null);
  } catch (err) {
    next(err);
  }
};

leaveController.changeStatus = async (req, res, next) => {
  try {
    if (!req.body.id || !req.body.status) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Missing required parameters', null);
    }

    const leave = await leaveSch.findByIdAndUpdate(req.body.id, { status: req.body.status, approved_by: req.user.id, approved_date : Date.now() }, { new: true });
    if (!leave)  return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'leave request not found', null);
    return otherHelper.sendResponse(res, httpStatus.OK, true, leave, null, 'Leave updated successfully', null);

  } catch (err) {
    next(err);
  }
};

module.exports = leaveController;