const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const leaveSch = require('../../schema/leaveSchema');
const leaveController = {};

leaveController.getAllleave = async (req, res, next) => {
  try {
    
    const { id : userid ,roles } = req.user
    let { page, size, populate, selectQuery, sortQuery } = otherHelper.parseFilters(req);
  
    // if (userid) {
    //   const lead = await otherHelper.getQuerySendResponse(leaveSch, page, size, sortQuery,{request_for:userid}, selectQuery, next, populate);
    //   return otherHelper.paginationSendResponse(res, httpStatus.OK, true, lead, 'Leave data get successfully', page, size, lead.totalData);
    // }

    if(roles === "67b388a7d593423df0e24295"){
      console.log("calll")
     
    }

  } catch (err) {
    next(err);
  }
};

leaveController.addleave = async (req, res, next) => {
  try {
    const { id : userid ,roles } = req.user
    const { request_date, leave_type, reason, request_for } = req.body;

    if(roles === "67b388a7d593423df0e24295"){
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