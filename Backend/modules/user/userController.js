const userSch = require('../../schema/userSchema');
const userCategorySch = require('../../schema/userCategorySchema');
const roleAccessModel = require("../../schema/role_accessschema")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./userConfig');
const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const loginLogs = require('./loginlogs/loginlogController').internal;
const { getSetting } = require('../../helper/settings.helper');
const userController = {};

userController.GetCheckUser = async (req, res, next) => {
  try {
      const email = req.query.search;
      const existingUser = await userSch.findOne({email : email});
      if(existingUser){
        return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'user exist!', null);
      }
      else{
        return otherHelper.sendResponse(res, httpStatus.OK, false, null, null, 'user not exist!', null );
      }
  } catch (err) {
    next(err);
  }
};

userController.GetAllUser = async (req, res, next) => {
  try {
   
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
    searchQuery = { ...searchQuery, is_deleted: false, user_type: { $ne: 'superadmin' }  };
    selectQuery = 'name email password gender mobile_no date_of_joining date_of_birth address emergency_mobile_no emergency_contact_person added_at role pan_card bank_passbook aadhar_card user_id is_active user_pic';
    populate = [{ path: 'role',  model: 'roles', select: 'role_title' }, { path: 'user_category', model: 'user_categories', select: 'category_name' }];

    if(req.query.id){
      const user = await userSch.findById(req.query.id).select(selectQuery).populate(populate);;
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, user,  null, " Search Data found", page, size, user.length);
    }

    if(req.query.user_type){
      const user = await userSch.find({ is_deleted: false, user_type: req.query.user_type}).select(selectQuery).populate(populate);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, user,  null, " Search Data found", page, size, user.length);
    }

    if (req.query.search && req.query.search !== "null"){
      const searchResults = await userSch.find({   is_deleted: false, user_type:"subadmin" , $or: [{ name: { $regex: req.query.search, $options: "i" } }]}) .select(selectQuery).populate(populate);
      if (searchResults.length === 0)   return otherHelper.sendResponse(res, httpStatus.OK, true, null, [],'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults , " Search Data found", page, size, searchResults.length);
    }

    const pulledData = await otherHelper.getQuerySendResponse(userSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, config.gets, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};


userController.DeleteUser = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'User id required', null);

    const userdata = await userSch.findById(id);
    if (!userdata) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'User not found', null);

    const user = await userSch.findByIdAndUpdate(id, { is_deleted : true, is_active :false, updated_at: new Date() }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'User delete Successfully', null);
  } catch (err) {
    next(err);
  }
};

userController.GetUserDetail = async (req, res, next) => {
  try {
    const user = await userSch.findById(req.query.id, {
      email_verified: 1,
      roles: 1,
      name: 1,
      email: 1,
      bio: 1,
      updated_at: 1,
      is_active: 1,
      password: 1,
    });

    return otherHelper.sendResponse(res, httpStatus.OK, true, user, null, config.get, null);
  } catch (err) {
    next(err);
  }
};

userController.PostUser = async (req, res, next) => {
  try {
    const user = req.body;

     if (req.file && req.file.location) {
      user.user_pic = req.file.location;
    }

    const existingUserName = await userSch.findOne({ name: req.body.name })
    if (existingUserName) return otherHelper.sendResponse(res, httpStatus.OK, false, null, null, 'Username already exist!', null);

    let email = req.body.email && req.body.email.toLowerCase();
    const existingUser = await userSch.findOne({ email: email })
    if (existingUser) return otherHelper.sendResponse(res, httpStatus.OK, false, null, null, 'user email already exist!', null);
    
    const existingMobile = await userSch.findOne({ mobile_no: user.mobile_no })
    if (existingMobile)  return otherHelper.sendResponse(res, httpStatus.OK, false, null, null, 'user mobile  already exist!', null);
    
    let salt = await bcrypt.genSalt(10);
    let hashPwd = await bcrypt.hash(req.body.password, salt);

    const data = await userSch.create({
      ...req.body,
      user_pic : user.user_pic,
      password: hashPwd
    });

    // const newUser = new userSch(user);
    // await newUser.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'user add success!', null);
  } catch (err) {
    next(err);
  }
};

userController.UpdateUserImage = async (req, res, next) => {
  try {
    const userId = req.body.id;
    const user = req.body;

    if (!userId) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, "User id not found", null);

    let updateData = {
      $set: { ...user, updated_at: new Date() },
    };

    if (req.file && req.file.location) {
      updateData.$set.user_pic = req.file.location;
    }


    const updatedUser = await userSch.findByIdAndUpdate( userId, updateData, { new: true } );
    return otherHelper.sendResponse(res, httpStatus.OK, true, updatedUser, null, 'user updated successfully', null);
  } catch (err) {
    next(err);
  }
};
// User List Api Code End

userController.validLoginResponse = async (req, user, next) => {
  try {
    // let accesses = await accessSch.find({ role_id: user.roles, is_active: true }, { access_type: 1, _id: 0 });
    let routes = [];
    // if (accesses && accesses.length) {
    //   const access = accesses.map((a) => a.access_type).reduce((acc, curr) => [...curr, ...acc]);
    //   const routers = await moduleSch.find({ 'path._id': access }, { 'path.admin_routes': 1, 'path.access_type': 1 });
    //   for (let i = 0; i < routers.length; i++) {
    //     for (let j = 0; j < routers[i].path.length; j++) {
    //       routes.push(routers[i].path[j]);
    //     }
    //   }
    // }
    
    // const secretOrKey = await getSetting('auth', 'token', 'secret_key');
    const secretOrKey = process.env.JWTSecret;
    
    var tokenExpireTime = await getSetting('auth', 'token', 'expiry_time');
    tokenExpireTime = Number.parseInt(tokenExpireTime);
    // Create JWT payload

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.role,
       type : user.user_type
    };
    // Sign Token
    let token = await jwt.sign(payload, secretOrKey, {
      expiresIn: "5d",
    });
    // loginLogs.addloginlog(req, token, next);
    token = `${token}`;
    return { token, payload };
  } catch (err) {
    next(err);
  }
};

userController.Login = async (req, res, next) => {
  try {
    let errors = {};
    const password = req.body.password;
    let email = req.body.email;
    const user = await userSch.findOne({ email: email });
    if (!user) {
      errors.email = "User email not found";
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.email, null);
    }

    if (!user.is_active) {
      errors.inactive = "Please Contact Admin to reactivate your account";
      return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, null, errors, errors.inactive, null);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errors.password = "Password incorrect";
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, errors.password, null);
    }
    let rolePermissions = [];
    let user_img = "";

    if (user.role) {
      rolePermissions = await roleAccessModel.find({ role_id: user.role }).select("permissions module_name");
    }
    if (user) {
      user_img = await userSch.findOne({ _id: user.id }).select("user_pic");
    }
    const { token, payload } = await userController.validLoginResponse(req, user, next);
    payload.rolePermissions = rolePermissions;
    payload.user_img = user_img;
    payload.user_type = user.user_type;
    return otherHelper.sendResponse(res, httpStatus.OK, true, payload, null, "Login Successful", token);
  } catch (err) {
    console.error("Error in Login API:", err);
    return next(err);
  }
};

userController.GetProfile = async (req, res, next) => {
  try {
    let populate = [{ path: 'role', select: '_id role_title' }];
    const userProfile = await userSch.findById(req.user.id, 'user_pic name email  role').populate(populate);
    return otherHelper.sendResponse(res, httpStatus.OK, true, userProfile, null, null, null);
  } catch (err) {
    next(err);
  }
};

userController.updateUserProfileImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId)  return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'User ID is required', null);
    if (!req?.file?.location)    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Profile image file is required', null);

    const user = await userSch.findById(userId);
    if (!user)  return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'User not found', null);
    
    const updateData = {$set: {  user_pic: req.file.location,  updated_at: new Date()  } };
    const updatedUser = await userSch.findByIdAndUpdate(userId, updateData, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, updatedUser, null, 'User profile image updated successfully!', null);
  } catch (err) {
    next(err);
  }
};

userController.updateUserPassword = async (req, res, next) => {
  let { password, current_password } = req.query;
  let userId = req.user.id;

  try {
    if (!current_password) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Current Password is required', null);
    if (!password) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Password is required', null);
    if (!userId) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'User ID is required', null);

    const user = await userSch.findById(userId);
    if (!user) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'User not found', null);

    
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, 'Current Password is incorrect', null);
    }

    let salt = await bcrypt.genSalt(10);
    let hashPwd = await bcrypt.hash(password, salt);    
    const updateData = { $set: { password: hashPwd, updated_at: new Date() } };
    await userSch.findByIdAndUpdate(userId, updateData, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, 'Password updated successfully', null);
  } catch (err) {
    next(err);    
  }
};

userController.GetAllUserCategory = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10);
    searchQuery = { ...searchQuery, is_deleted: false };

    if(req.query.id){
      const user = await userCategorySch.findById(req.query.id).select(selectQuery).populate(populate);;
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, user,  null, " Search Data found", page, size, user.length);
    }

    if (req.query.search && req.query.search !== "null"){
      const searchResults = await userCategorySch.find({ is_deleted: false, $or: [{ category_name: { $regex: req.query.search, $options: "i" } }]}) .select(selectQuery).populate(populate);
      if (searchResults.length === 0)   return otherHelper.sendResponse(res, httpStatus.OK, true, null, [],'Data not found', null);
      return otherHelper.paginationSendResponse(res, httpStatus.OK, true, searchResults , " Search Data found", page, size, searchResults.length);
    }

    const pulledData = await otherHelper.getQuerySendResponse(userCategorySch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, pulledData.data, config.category_get, page, size, pulledData.totalData);
  } catch (err) {
    next(err);
  }
};

userController.AddUserCategory = async (req, res, next) => {
  try {
    const { category_name, description, is_active, goal_amt } = req.body;
    if (!category_name) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, config.validationMessage.categoryRequired, null);
    const existingCategory = await userCategorySch.findOne({ category_name: category_name, is_deleted: false });
    if (existingCategory) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, config.validationMessage.categoryExists, null);
    const newCategory = await userCategorySch.create({ category_name, description, is_active, goal_amt });
    return otherHelper.sendResponse(res, httpStatus.OK, true, newCategory, null, config.category_add, null);
  } catch (err) {
    next(err);
  }
};

userController.UpdateUserCategory = async (req, res, next) => {
  try {
    const { id, category_name, description, is_active, goal_amt } = req.body;
    if (!id) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, config.validationMessage.categoryIdRequired, null);
    const category = await userCategorySch.findById(id);
    if (!category) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, config.validationMessage.categoryNotFound, null);
    if (category_name) {
      const existingCategory = await userCategorySch.findOne({ category_name: category_name, is_deleted: false, _id: { $ne: id } });
      if (existingCategory) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, config.validationMessage.categoryExists, null);
    }
    const updateData = { category_name, description, is_active, goal_amt, updated_at: new Date() };
    const updatedCategory = await userCategorySch.findByIdAndUpdate(id, updateData, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, updatedCategory, null, 'User category updated successfully!', null);
  } catch (err) {
    next(err);
  } 
};

userController.DeleteUserCategory = async (req, res, next) => {
  try {
    const categoryId = req.query.id;
    if (! categoryId) return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, null, config.validationMessage.categoryRequired, null);
    const category = await userCategorySch.findById(categoryId);
    if (!category) return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, config.validationMessage.categoryNotFound, null);
    await userCategorySch.findByIdAndUpdate(categoryId, { is_active: !category.is_active, deleted_at: new Date() }, { new: true });
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, config.category_delete, null);
  } catch (err) {
    next(err);
  } 
};

module.exports = userController;