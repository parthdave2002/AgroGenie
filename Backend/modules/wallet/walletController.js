const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const walletSchema = require('../../schema/walletSchema');
const walletHistorySchema = require('../../schema/walletTransactionSchema');
const walletController = {};

walletController.getAllWalletRulesList = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
    searchQuery = { ...searchQuery, is_deleted: false };

    if(req.query.id){
      const wallerRules = await walletSchema.findById(req.query.id).select(selectQuery).populate(populate);;
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, wallerRules,  null, " Search Data found", page, size, wallerRules.length);
    }
    
    if (req.query.search && req.query.search !== 'null') {  
      const searchResults = await walletSchema.find({
        $or: [{ name: { $regex: req.query.search, $options: 'i' } }, { amount: { $regex: req.query.search, $options: 'i' } }],
      });
      if (searchResults.length === 0) return otherHelper.sendResponse(res, httpStatus.OK, true, null, [], 'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults, 'Wallet Rule Data found', page, size, searchResults.length);
    }
   
    const pulledData = await otherHelper.getQuerySendResponse(walletSchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, 'Wallet Rule Data get successfully', page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

walletController.AddWalletRules = async (req, res, next) => {
  try {
    const WalletRule = req.body;

    if(WalletRule._id) {
      const update = await walletSchema.findByIdAndUpdate(WalletRule._id, { $set: WalletRule }, { new: true });
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, 'Wallet Rule Data updated successfully', null);
    } else {
      const existingWalletRule = await walletSchema.findOne({ name: WalletRule.name, is_deleted: false });
      if(existingWalletRule) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Wallet Rule with this name already exist', null);

      const newWalletRule = new walletSchema(WalletRule);
      await newWalletRule.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, newWalletRule, null, "Wallet Rule Created successfully", null);
    }
  } catch (err) {
    next(err);
  }
};

walletController.DeleteWalletRules = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Wallet Rule id required', null);
    
    const deleted = await walletSchema.findByIdAndUpdate(id, { $set: { is_deleted: true } }, { new: true });
    if (!deleted) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Wallet Rule not found', null);
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'Wallet Rule deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

walletController.changeStatus = async (req, res, next) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Wallet Rule ID is required', null);
    const walletRule = await walletSchema.findById(id);
    if (!walletRule) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Wallet Rule not found', null);

    const updatedWalletRule = await walletSchema.findByIdAndUpdate(id, { $set: { is_active: !walletRule.is_active } }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, updatedWalletRule, null, 'Wallet Rule status updated successfully', null);
  } catch (err) {
    next(err);
  }
};

walletController.getWalletHistory = async (req, res, next) => {
  try {
    const {customer_id} = req.query || req.body;
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
    searchQuery = { ...searchQuery, customer_id };

    if (!customer_id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'ID is required', null);
    const pulledData = await otherHelper.getQuerySendResponse(walletHistorySchema, page, size, sortQuery, searchQuery, selectQuery, next, populate);

    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, 'Wallet history get successfully', page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

module.exports = walletController;