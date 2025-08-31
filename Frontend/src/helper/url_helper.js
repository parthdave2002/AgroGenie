// Login/Logout Api
export const INSERT_LOGIN = "/api/user/login";
export const FORGOT_PASSWORD_DATA = "/api/user/forgot-password";
export const VERIFY_TOKEN_DATA = "/api/user/verify-token";
export const RESET_PASSWORD_DATA = "/api/user/reset-password";
export const LOGOUT ="/api/user/logout";

//   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Dialer Apis <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Dashboard Api
export const GET_DASHBOARD_DATA_LIST = "/api/dashboard/details";
export const GET_REPORT_DATA_LIST = "/api/report/get-report";

// User Api
export const GET_USER_LIST = "/api/user/get-user";
export const GET_USER_VIEW = "/api/user/get-user";
export const ADD_USER_LIST = "/api/user/add-user";
export const DELETE_USER_LIST = "/api/user/deluser";
export const UPDATE_USER_DATA_LIST = "/api/user/update-user";
export const CHECK_USER_LIST = "/api/user/check-user";
export const GET_PROFILE_DATA_LIST = "/api/user/profile";
export const UPDATE_PROFILE_DATA_LIST = "/api/user/update-profile";

// Role Api
export const GET_ROLES_LIST = "/api/role/get-role";
export const UPDATE_ROLES_LIST = "/api/role/roleview";
export const ADD_ROLES_LIST = "/api/role/add-role";
export const DELETE_ROLES_LIST = "/api/role/remove-role";
export const GET_SEARCH_ROLES_LIST = "/api/role/role-search";

// Role access Api
export const GET_ROLES_ACCESS_LIST = "/api/role/role-permission";
export const SAVE_ROLES_ACCESS_LIST = "/api/role/access/role";


// Packingtype
export const GET_PACKING_TYPE_LIST = "/api/packing-type";
export const ADD_PACKING_TYPE_LIST = "/api/packing-type/add-packing-type";
export const DELETE_PACKING_TYPE_LIST = "/api/packing-type/remove-packing-type";
export const CHANGE_STATUS_PACKING_TYPE_LIST = "/api/packing-type/status-packing-type";
// Packing
export const GET_PACKING_LIST = "/api/packing/get-packing";
export const ADD_PACKING_LIST = "/api/packing/add-packing";
export const DELETE_PACKING_LIST = "/api/packing/remove-packing";

// Category
export const GET_CATEGORY_LIST = "/api/category/get-category";
export const ADD_CATEGORY_LIST = "/api/category/add-category";
export const DELETE_CATEGORY_LIST = "/api/category/remove-category";
export const CHANGE_STATUS_CATEGORY_LIST = "/api/category/status-category";

// Company
export const GET_COMPANY_LIST = "/api/company/get-company-list";
export const ADD_COMPANY_LIST = "/api/company/add-company-list";
export const DELETE_COMPANY_LIST = "/api/company/remove-company-list";
export const CHANGE_STATUS_COMPANY_LIST = "/api/company/status-company-list";

// Complain
export const GET_COMPLAIN_LIST = "/api/complain/get-complain";
export const GET_SALES_COMPLAIN_LIST = "/api/complain/get-sales-complain";
export const GET_FARMER_COMPLAIN_LIST = "/api/complain/getbyid";
export const GET_COMPLAIN_DETAILS_LIST = "/api/complain/get-complain";
export const ADD_COMPLAIN_LIST = "/api/complain/add-complain";
export const DELETE_COMPLAIN_LIST = "/api/complain/remove-complain";
export const UPDATE_COMPLAIN_LIST = "/api/complain/update-complain";

// Product
export const GET_PRODUCT_LIST = "/api/product/get-product";
export const ADD_PRODUCT_LIST = "/api/product/add-product";
export const UPDATE_PRODUCT_LIST = "/api/product/update-product";
export const DELETE_PRODUCT_LIST = "/api/product/remove-product";
export const GET_RELATED_PRODUCT_LIST = "/api/product/product-related";

// Order
export const GET_UPDATE_ORDER_LIST = "/api/order/update-order";
export const GET_ORDER_LIST = "/api/order/get-order";
export const GET_SALES_EXECUTIVE_ORDER_LIST  = "/api/order/get-order-sales-executive";
export const GET_FARMER_ORDER_LIST = "/api/order/get-order";
export const GET_ORDER_DETAILS_LIST = "/api/order/get-order";
export const DELETE_ORDER_LIST = "/api/order/remove-order";
export const ADD_ORDER_LIST = "/api/order/add-order";
export const RETURN_ORDER_LIST = "/api/order/add-return-product";

// Banner
export const GET_BANNER_LIST = "/api/banner/get-banner";
export const ADD_BANNER_LIST = "/api/banner/add-banner";
export const DELETE_BANNER_LIST = "/api/banner/remove-banner";

// Taglog
export const GET_TAGLOG_LIST = "/api/taglog/get-taglog";
export const ADD_TAGLOG_LIST = "/api/taglog/add-taglog";
export const DELETE_TAGLOG_LIST = "/api/taglog/remove-taglog";
export const CHANGE_STATUS_TAGLOG_LIST = "/api/taglog/status-taglog";

export const GET_SUB_TAGLOG_LIST = "/api/taglog/get-subtaglog";
export const ADD_SUB_TAGLOG_LIST = "/api/taglog/add-subtaglog";
export const DELETE_SUB_TAGLOG_LIST = "/api/taglog/remove-subtaglog";
export const CHANGE_STATUS_SUB_TAGLOG_LIST = "/api/taglog/update-subtaglog";

export const GET_CUSTOMER_TAGLOG_LIST = "/api/taglog/get-customer-taglog";
export const ADD_CUSTOMER_TAGLOG_LIST = "/api/taglog/add-customer-taglog";

export const GET_EXPORT_DATA_LIST = "/api/export/export-data";

// Customer
export const GET_CUSTOMER_DATA_LIST = "/api/customer/get-customers";
export const ADD_CUSTOMER_DATA_LIST = "/api/customer/add-customer";
export const UPDATE_CUSTOMER_DATA_LIST = "/api/customer/update-customer";
export const DELETE_CUSTOMER_DATA_LIST = "/api/customer/remove-customer";
export const BLOCK_CUSTOMER_DATA_LIST = "/api/customer/change-status";
export const CHECK_CUSTOMER_EXIST_LIST = "/api/customer/matchnumber";

export const GET_CROP_LIST = "/api/crop/get-crop";
export const ADD_CROP_LIST = "/api/crop/add-crop";
export const DELETE_CROP_LIST = "/api/crop/remove-crop";
export const CHANGE_STATUS_CROP_LIST = "/api/crop/status-crop";

export const GET_COUPON_LIST = "/api/coupon/get-coupon";
export const ADD_COUPON_LIST = "/api/coupon/add-coupon";
export const DELETE_COUPON_LIST = "/api/coupon/remove-coupon";
export const CHANGE_STATUS_COUPON_LIST = "/api/coupon/status-coupon";

export const GET_LEAD_LIST = "/api/lead/get-lead";
export const ADD_LEAD_LIST = "/api/lead/add-lead";
export const MARK_AS_READ_LEAD_LIST = "/api/lead/mark-lead";
export const DELETE_LEAD_LIST = "/api/lead/remove-lead";


// ================== sales executive api =================
export const GET_SALES_DASHBOARD_DATA = "/api/sales-executive/dashboard";
export const GET_CALLBACK_DATA = "/api/order/get-callbacks";
export const GET_MARK_AS_DONE_DATA = "/api/order/get-callbacks"

export const GET_STATE_DATA_LIST = "/api/location/get-state";
export const GET_DISTRICT_DATA_LIST = "/api/location/get-district";
export const GET_TALUKA_DATA_LIST = "/api/location/get-taluka";
export const GET_VILLAGE_DATA_LIST = "/api/location/get-village";