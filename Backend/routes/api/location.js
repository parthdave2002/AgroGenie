const express = require('express');
const router = express.Router();
const locationController = require('../../modules/location/locationController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/get-state',authentication, locationController.getAllState);
router.get('/get-district',authentication, locationController.getAllDistrict);
router.get('/get-taluka',authentication, locationController.getAllTaluka);
router.get('/get-village',authentication, locationController.getAllVillage);

module.exports = router