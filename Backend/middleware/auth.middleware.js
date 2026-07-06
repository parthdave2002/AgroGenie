const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status');
const loginLogSch = require('../modules/user/loginlogs/loginlogSchema');
const otherHelper = require('../helper/others.helper');
const roleAccessModel = require('../schema/role_accessschema');
const authMiddleware = {};


authMiddleware.authentication = async (req, res, next) => {
  try {
    const expiresIn = '5d';
    const secretOrKey = process.env.JWTSecret;
    // const secretOrKey = await getSetting('auth', 'token', 'secret_key', { expiresIn });
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization || req.headers.token;
    if (token && token.length) {
      token = token.replace('Bearer ', '');
      const decoded = await jwt.verify(token, secretOrKey);
      req.user = decoded;
      let passed = await loginLogSch.find({ token, is_active: true });
      if (passed) {
        return next();
      } else {
        return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, null, 'Session Expired', null);
      }
    }
    return otherHelper.sendResponse(res, HttpStatus.UNAUTHORIZED, false, null, token, 'Token not found', null);
  } catch (err) {
    return next(err);
  }
};

authMiddleware.authorization = (module) => async (req, res, next) => {
  const methodPermissionMap = {
    GET: 'view',
    POST: 'add',
    PUT: 'edit',
    DELETE: 'delete',
  };

  try {
    const {type, roles } = req.user;
    if(type != "superadmin"){
      const { method } = req;
      const requiredPermission = methodPermissionMap[method];

      if (!roles || !roles.length)  return otherHelper.sendResponse(res, 401, false, null, null, 'Role Not Found', null);
      const roleAccesses = await roleAccessModel.findOne({ role_id: roles, module_name: module }).select('permissions');
      if (!roleAccesses)  return otherHelper.sendResponse(res, 401, false, null, null, 'Module Access Restricted', null);

      const userModulePermission = roleAccesses?.permissions;
      if (!userModulePermission || !userModulePermission[requiredPermission])  return otherHelper.sendResponse(res, 401, false, null, null, 'Module Access Restricted', null);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;