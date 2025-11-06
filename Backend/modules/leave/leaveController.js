const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const leaveSch = require('../../schema/leaveSchema');
const leaveController = {};

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

    if(type === "admin"){

      const currentDate = new Date();
      const currentMonthYear = `${String(currentDate.getMonth() + 1).padStart(2, "0")}-${currentDate.getFullYear()}`;

      const allLeaves = await leaveSch.find().populate(userPopulate).sort(sortQuery || { createdAt: -1 });

      const leavesThisMonth = allLeaves.filter((leave) => {
        if (!leave.request_date) return false;
        return leave.request_date.slice(3) === currentMonthYear;
      });

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

        groupedData[userId].leaves.push({
          _id: leave._id,
          request_date: leave.request_date,
          leave_type: leave.leave_type,
          reason: leave.reason,
          status: leave.status,
          approved_by: leave.approved_by || null,
          approved_date: leave.approved_date || null,
          requested_by: leave.requested_by || null,
          request_for: leave.request_for || null,
          requested_at: leave.createdAt,
          updatedAt: leave.updatedAt,
        });
      });

      const responseData = Object.values(groupedData);

      return otherHelper.sendResponse( res, httpStatus.OK, true,responseData, null,'Users leave fetched successfully', null);
    }

  } catch (err) {
    next(err);
  }
};

leaveController.addleave = async (req, res, next) => {
  try {
    const { id : userid ,type } = req.user
    const { request_date, leave_type, reason, request_for } = req.body;

    if(type === "admin"){
      if(!request_for){
        return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Please select user', null);
      }

      const newLeave = new leaveSch({
        request_date: request_date,
        leave_type,
        reason,
        request_for : request_for,
        requested_by: userid,
        status: 'pending',
      });

      await newLeave.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newLeave, null, 'Leave created successfully', null);
    }

    if (!userid || !request_date) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Missing required parameters', null);
    }

    const alreadyonleave = await leaveSch.findOne({
      request_for : userid,
      request_date: request_date
    });

    if (alreadyonleave) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'You have already applied for leave on this date', null);
    }

    const newLeave = new leaveSch({
      request_date: request_date,
      leave_type,
      reason,
      requested_by: userid,
       request_for : userid,
      status: 'pending',
    });

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