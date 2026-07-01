const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const leaveSch = require('../../schema/leaveSchema');
const userSch = require('../../schema/userSchema');

const hrController = {};

hrController.getDashboard = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
    searchQuery = { ...searchQuery, is_deleted: false };

    const today = new Date();
    const month = today.getMonth() + 1;
    const day =  today.getDate();

    const birthdays = await User.find({ is_deleted: false,
      $expr: {
        $and: [
            { $eq: [{ $month: "$date_of_birth" }, month] },
            { $eq: [{ $dayOfMonth: "$date_of_birth" }, day]}
        ]
      }
    }).select("name email user_pic date_of_birth");

    // Work Anniversary Employees
    const anniversaries = await User.find({ is_deleted: false,
      $expr: {
        $and: [
          {$eq: [{ $month: "$date_of_joining" }, month ]},
          {$eq: [{ $dayOfMonth: "$date_of_joining" }, day]}
        ]
      }
    }).select("name email user_pic date_of_joining");

    // Employees on leave today
    const startOfDay = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0,0);
    const endOfDay = new Date(today.getFullYear(),today.getMonth(),today.getDate(),23,59,59,999);

    const onLeave = await Leave.find({
      status: "approved",
      start_date: { $lte: endOfDay },
      end_date: { $gte: startOfDay }
    }).populate({
        path: "request_for",
        select: "name email user_pic"
      })  
    .populate({
      path: "leave_type",
      select: "name"
    }).select("request_for leave_type start_date end_date days");

    return otherHelper.sendResponse(res, httpStatus.OK, true, { birthdays, anniversaries, onLeave }, "Category data get successfully", null);
  } catch (err) {
    next(err);
  }
};

module.exports = hrController;