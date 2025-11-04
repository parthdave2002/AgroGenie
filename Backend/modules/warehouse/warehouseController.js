const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const warehouseSch = require('../../schema/warehouseSchema');
const warehouseController = {};

warehouseController.getAllWarehouseList = async (req, res, next) => {
  try {
    const getid = req.query.id;
    if(getid){
      const user = await warehouseSch.findById(getid);
      return otherHelper.sendResponse(res, httpStatus.OK, true, user, null, 'Warehouse Data Found', null);
    }
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
    searchQuery = { ...searchQuery};

    if (req.query.search && req.query.search !== "null"){
      const searchResults = await warehouseSch.find({
        $or: [{ name: { $regex: req.query.search, $options: "i" } }], 
      });
      if (searchResults.length === 0)  return otherHelper.sendResponse(res, httpStatus.OK, true, null, [],'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults , " Search data found", page, size, searchResults.length);
    }

    if (!req.query.page && !req.query.size) {
      const allData = await warehouseSch.find({ ...searchQuery }).select(selectQuery).populate(populate).sort(sortQuery);
      return otherHelper.sendResponse(res, httpStatus.OK, true, allData, null, 'Warehouse Data get successfully', null);
    }

    const pulledData = await otherHelper.getQuerySendResponse(warehouseSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, "Warehouse Data get successfully", page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

warehouseController.AddWarehouse = async (req, res, next) => {
  try {
    const warehouseData = req.body;

    const existingwarehouse = await warehouseSch.findOne({ name : warehouseData.name });
    if (existingwarehouse) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, "Warehouse already exist ", null);

    const newWarehouse = new warehouseSch(warehouseData);
    await newWarehouse.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, newWarehouse, null, "Warehouse Created successfully", null);

  } catch (err) {
    next(err);
  }
};

warehouseController.DeleteWarehouse = async (req, res, next) => {
  try {
    const id = req.query.id;
    if(!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Warehouse id required', null);
    
    const Warehouse_id = await warehouseSch.findById(id);
    if(!Warehouse_id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Warehouse not found', null);

    const deleted = await warehouseSch.findByIdAndDelete(id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'Warehouse deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

module.exports = warehouseController;