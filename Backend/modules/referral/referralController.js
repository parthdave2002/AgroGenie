const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const referralSchema = require('../../schema/referralSchema');

const referralController = {};

referralController.getAllReferralRulesList = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
    searchQuery = { ...searchQuery, is_deleted: false };
    
    if (req.query.search && req.query.search !== 'null') {  
      const searchResults = await referralSchema.find({
        $or: [{ name: { $regex: req.query.search, $options: 'i' } }, { amount: { $regex: req.query.search, $options: 'i' } }],
      });
      if (searchResults.length === 0) return otherHelper.sendResponse(res, httpStatus.OK, true, null, [], 'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults, 'Referral Rule Data found', page, size, searchResults.length);
    }
   
    const pulledData = await otherHelper.getQuerySendResponse(referralSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, 'Referral Rule Data get successfully', page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

referralController.AddReferralRules = async (req, res, next) => {
  try {
    const ReferralRule = req.body;

    if(ReferralRule._id) {
      const update = await referralSchema.findByIdAndUpdate(ReferralRule._id, { $set: ReferralRule }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Referral Rule Data updated successfully', null);
    } else {
      const existingReferralRule = await referralSchema.findOne({ name: ReferralRule.name, is_deleted: false });
      if(existingReferralRule) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Referral Rule with this name already exist', null);

      const newReferralRule = new referralSchema(ReferralRule);
      await newReferralRule.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newReferralRule, null, "Referral Rule Created successfully", null);
    }
  } catch (err) {
    next(err);
  }
};

referralController.DeleteReferralRules = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Referral Rule id required', null);
    
    const deleted = await referralSchema.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    if (!deleted) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Referral Rule not found', null);
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'Referral Rule deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

referralController.changeStatus = async (req, res, next) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Referral Rule ID is required', null);
    const referralRule = await referralSchema.findById(id);
    if (!referralRule) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Referral Rule not found', null);

    const updatedReferralRule = await referralSchema.findByIdAndUpdate(id, { $set: { is_active: !referralRule.is_active } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, updatedReferralRule, null, 'Referral Rule status updated successfully', null);
  } catch (err) {
    next(err);
  }
};

module.exports = referralController;