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

    if (type === "admin") {
      const { month } = req.query;

      const currentDate = new Date();
      const defaultMonth = `${String(currentDate.getMonth() + 1).padStart(2, "0")}-${currentDate.getFullYear()}`;
      const targetMonth = month || defaultMonth;

      const parseDate = (dateStr) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          return new Date(dateStr);
        }

        if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
          const [day, month, year] = dateStr.split("-");
          return new Date(`${year}-${month}-${day}`);
        }

        return null;
      };

      const getMonthRange = (monthStr) => {
        const [m, y] = monthStr.split("-");
        const start = new Date(`${y}-${m}-01`);
        const end = new Date(y, m, 0);
        return { start, end };
      };
      const { start: monthStart, end: monthEnd } = getMonthRange(targetMonth);

      const allLeaves = await leaveSch.find().populate(userPopulate).sort(sortQuery || { createdAt: -1 });
      const leavesThisMonth = allLeaves.filter((leave) => {
        if (!leave.start_date || !leave.end_date) return false;

        const leaveStart = parseDate(leave.start_date);
        const leaveEnd = parseDate(leave.end_date);

        if (!leaveStart || !leaveEnd) return false;

        return leaveStart <= monthEnd && leaveEnd >= monthStart;
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
    const { leave_type, reason, request_for, start_date, end_date, days } = req.body;

    if(type === "admin"){
      if(!request_for) otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Please select user', null);
      
      const newLeave = new leaveSch({ leave_type, reason,  start_date,  end_date,  days, request_for : request_for, requested_by: userid, status: 'pending', });
      await newLeave.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newLeave, null, 'Leave created successfully', null);
    }

    if (!userid || !start_date || !end_date) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Missing required parameters', null);
    }

    const alreadyonleave = await leaveSch.findOne({request_for : userid, start_date: { $lte: start_date }, end_date: { $gte: end_date }, status: { $in: ['pending', 'approved'] } });
    if (alreadyonleave) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'You have already applied for leave on this date', null);

    const newLeave = new leaveSch({ start_date,  end_date, days, leave_type, reason, requested_by: userid,  request_for : userid,  status: 'pending'  });
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