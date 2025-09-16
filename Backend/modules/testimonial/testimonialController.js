const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const testimonialSch = require('../../schema/testimonialSchema');
const testimonialController = {};

testimonialController.getAllTestimonialList = async (req, res, next) => {
  try {
    const getid = req.query.id;
    if(getid){
      const user = await testimonialSch.findById(getid);
      return otherHelper.sendResponse(res, httpStatus.OK, true, user, null, 'Testimonial Data Found', null);
    }
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
    searchQuery = { ...searchQuery};

    if (req.query.search && req.query.search !== "null"){
      const searchResults = await testimonialSch.find({
        $or: [{ name: { $regex: req.query.search, $options: "i" } }], 
      });
      if (searchResults.length === 0)  return otherHelper.sendResponse(res, httpStatus.OK, true, null, [],'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults , " Search data found", page, size, searchResults.length);
    }

    if (!req.query.page && !req.query.size) {
      const allData = await testimonialSch.find({ ...searchQuery }).select(selectQuery).populate(populate).sort(sortQuery);
      return otherHelper.sendResponse(res, httpStatus.OK, true, allData, null, 'Testimonial Data get successfully', null);
    }

    const pulledData = await otherHelper.getQuerySendResponse(testimonialSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, "Testimonial Data get successfully", page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

testimonialController.AddTestimonial = async (req, res, next) => {
  try {
    const testimonialData = req.body;
    const fileUrl = req.file?.location || null;
    if (fileUrl) {
      testimonialData.testimonial_pics = fileUrl;
    }

    const existingTestimonial = await testimonialSch.findOne({ name_eng : testimonialData.name_eng });
    if (existingTestimonial) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, "Testimonial already exist ", null);

    const newTestimonial = new testimonialSch(testimonialData);
    await newTestimonial.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, newTestimonial, null, "Testimonial Created successfully", null);

  } catch (err) {
    next(err);
  }
};

testimonialController.DeleteTestimonial = async (req, res, next) => {
  try {
    const id = req.query.id;
    if(!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Testimonial id required', null);
    
    const testimonial_id = await testimonialSch.findById(id);
    if(!testimonial_id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Testimonial not found', null);

    const deleted = await testimonialSch.findByIdAndDelete(id);
    return otherHelper.sendResponse(res, httpStatus.OK, true, deleted, null, 'Testimonial deleted successfully', null);
  } catch (err) {
    next(err);
  }
};

module.exports = testimonialController;