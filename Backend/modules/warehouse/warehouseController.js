const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const warehouseSch = require('../../schema/warehouseSchema');
const productSchema = require('../../schema/productSchema');
const mongoose = require('mongoose');
const warehouseController = {};

warehouseController.getAllWarehouseList = async (req, res, next) => {
  try {

    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req);
    searchQuery = { ...searchQuery};

    const getid = req.query.id;
    if(getid){
      const warehouse = await warehouseSch.findById(getid);
      if (!warehouse) otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Warehouse not found', null);
      const productFilter = { ...searchQuery, warehouse: mongoose.Types.ObjectId(getid) };
      const productData = await otherHelper.getQuerySendResponse(productSchema, page, size, sortQuery, productFilter, selectQuery, next, populate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, { warehouse, products: productData.data }, 'Warehouse Data Found', page, size, productData.totalData);
    }

    if (req.query.search && req.query.search !== "null"){
      const searchResults = await warehouseSch.find({
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { location: { $regex: req.query.search, $options: "i" } },
          { address: { $regex: req.query.search, $options: "i" } }
        ]
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

    const isAssociated = await  productSchema.findOne({ warehouse: id }); 
    if (isAssociated)  return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Cannot delete warehouse because its assign to product', null);
    
    let changeStatus = !Warehouse_id.is_active;
    const deleted = await warehouseSch.findByIdAndUpdate(id, { is_active : changeStatus ,updated_at: new Date() }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'Warehouse status updated successfully', null);
  } catch (err) {
    next(err);
  }
};

module.exports = warehouseController;