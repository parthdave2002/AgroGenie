const express = require('express');
const router = express.Router();
const uploadHelper = require("../../helper/upload.helper")
const TestimonialController = require('../../modules/testimonial/testimonialController');
const { authentication, authorization } = require('../../middleware/auth.middleware');

router.get('/get-testimonial',  TestimonialController.getAllTestimonialList);
router.post('/add-testimonial',authentication,authorization("Testimonial"), uploadHelper.uploadFiles('testimonial', 'single', 'testimonial_pics'),  TestimonialController.AddTestimonial);
router.delete('/remove-testimonial',authentication,authorization("Testimonial"), TestimonialController.DeleteTestimonial);

module.exports = router