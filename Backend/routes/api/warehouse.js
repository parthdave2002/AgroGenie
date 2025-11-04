const express = require('express');
const router = express.Router();
const WarehouseController = require('../../modules/warehouse/warehouseController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/get-warehouse',  WarehouseController.getAllWarehouseList);
router.post('/add-warehouse',authentication,authorization("Warehouse"), WarehouseController.AddWarehouse);
router.delete('/remove-warehouse',authentication,authorization("Warehouse"), WarehouseController.DeleteWarehouse);

module.exports = router