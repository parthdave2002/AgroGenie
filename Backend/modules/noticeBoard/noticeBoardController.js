const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const noticeSch = require('../../schema/noticeBoardSchema');
const noticeBoardController = {};

noticeBoardController.getAllNotice = async (req, res, next) => {
  try {
    const { type } = req.user;
     const { id } = req.query;
    let { page, size, populate,searchQuery, selectQuery, sortQuery } = otherHelper.parseFilters(req);

    if (id) {
      const singleNotice = await noticeSch.findOne({ _id: id, is_active: true });
      if (!singleNotice) {
        return otherHelper.sendResponse( res, httpStatus.NOT_FOUND,false, null, null,'Notice not found or inactive',null);
      }
       return otherHelper.sendResponse( res, httpStatus.OK,true, singleNotice, null, 'Notice fetched successfully',null );
    }

    searchQuery = { ...searchQuery, is_active: true };
    if (type !== "admin") {
      const notification = await noticeSch.find({ is_active: true }).sort({ created_at: -1 });
      return otherHelper.sendResponse(res, httpStatus.OK, true, notification, 'Notification data get successfully', null);
    }

    const totalData = await noticeSch.countDocuments(searchQuery);
    const notices = await noticeSch.find(searchQuery).select(selectQuery || "").sort(sortQuery || { created_at: -1 }).skip((page - 1) * size).limit(size);
    return otherHelper.paginationSendResponse(res, httpStatus.OK,true, notices, 'Notices fetched successfully',page,size,totalData);

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