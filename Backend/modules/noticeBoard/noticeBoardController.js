const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const noticeSch = require('../../schema/noticeBoardSchema');
const noticeBoardController = {};

noticeBoardController.getAllNotice = async (req, res, next) => {
  try {
    const { type } = req.user;
    let { page, size, populate, selectQuery, sortQuery } = otherHelper.parseFilters(req);

    if (type !== "admin" ) {
      const user = await categorySch.findById(req.query.id);
      return otherHelper.sendResponse(res, httpStatus.OK, true, notification, 'Notification data get successfully', null);
    }


  } catch (err) {
    next(err);
  }
};

noticeBoardController.addNotice = async (req, res, next) => {
  try {
    const Notification = req.body;

    if (req.file && req.file.location) {
      Notification.document_pics =  req.file.location;
    }

    const newNotification = new noticeSch(Notification);
    await newNotification.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, newNotification, null, 'Nofication created successfully', null);
  } catch (err) {
    next(err);
  }
};

noticeBoardController.deleteNotice = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Notification id required', null);

    const notificationdata = await noticeSch.findById(id);
    if (!notificationdata) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Notification not found', null);

    const deleted = await noticeSch.findByIdAndUpdate(id, {  is_active: false, updated_at: new Date() }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'Notification delete successfully', null);
  } catch (err) {
    next(err);
  }
};

module.exports = noticeBoardController;