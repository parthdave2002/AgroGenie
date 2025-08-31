import { useEffect } from "react";
import { APIClient, setAuthorization } from "./api_helper";
import * as url from "./url_helper";
import axios from "axios";
import Cookies from "js-cookie";

const api = new APIClient();

// Gets the logged in user data from local session
// export const getLoggedInUser = () => {
//   const user = Cookies.get("token");
//   if (user) {
//     return JSON.parse(user);
//   }
//   return null;
// };

export const getLoggedInUser = () => {
  const token = Cookies.get("token");
  try {
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error("Invalid token format:", error);
    return null;
  }
};




if (Cookies.get("token")) {
  const users = Cookies.get("token");
  setAuthorization(users);
}

// //is user is logged in
// export const isUserAuthenticated = () => {
//   return getLoggedInUser() !== null;
// };
export const isUserAuthenticated = () => getLoggedInUser() !== null;

// ----- Login page redirect-----
// const token = Cookies.get("token");
//   if (token == "null") {
//     Cookies.remove()
//     window.location.pathname = "/login";
//   }

export const handleLoginRedirect = () => {
  const token = Cookies.get("token");
  if (!token || token === "null") {
    Cookies.remove("token");
    // window.location.pathname = "/login";
  }
};
handleLoginRedirect();
// ----- Login page redirect-----

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          window.location.pathname = "/login";
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Node Apis <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Login
export const LoginApi = (requserdata) => api.create(url.INSERT_LOGIN, requserdata);
export const ForgotPassApi = (requserdata) => api.create(url.FORGOT_PASSWORD_DATA, requserdata);
export const VerifyTokenApi = (requserdata) => api.get(url.VERIFY_TOKEN_DATA, requserdata);
export const ResetPasswordApi = (requserdata) => api.create(url.RESET_PASSWORD_DATA, requserdata);
export const LogoutApi = (requserdata) => api.get(url.LOGOUT, requserdata);

//  Dashboard Api
export const DashboardDatalistApi = (requserdata) => api.get(url.GET_DASHBOARD_DATA_LIST, requserdata);
export const ReportDataApi = (requserdata) => api.get(url.GET_REPORT_DATA_LIST, requserdata);

// User Api
export const UserlistApi = (requserdata) => api.get(url.GET_USER_LIST, requserdata);
export const UserlistViewApi = (requserdata) => api.get(url.GET_USER_VIEW, requserdata);
export const AddUserlistApi = async (requserdata) => await api.postMultipart(url.ADD_USER_LIST, requserdata);
export const DelUserlistApi = async (requserdata) => await api.get(url.DELETE_USER_LIST, requserdata);
export const UpdateUserdatalistApi = async (requserdata) => await api.create(url.UPDATE_USER_DATA_LIST, requserdata);
export const CheckUserdatalistApi = async (requserdata) => await api.get(url.CHECK_USER_LIST, requserdata);
export const profileUserdatalistApi = async (requserdata) => await api.get(url.GET_PROFILE_DATA_LIST, requserdata);
export const updateprofileUserdatalistApi = async (requserdata) => await api.postMultipart(url.UPDATE_PROFILE_DATA_LIST, requserdata);

// Roles Api
export const RolelistApi = async (requserdata) => await api.get(url.GET_ROLES_LIST, requserdata);
export const UpdatelistApi = async (requserdata) => await api.get(url.UPDATE_ROLES_LIST,requserdata);
export const AddRolelistApi = async (requserdata) => await api.create(url.ADD_ROLES_LIST,requserdata);
export const DelRolelistApi =  async (requserdata) => await  api.delete(url.DELETE_ROLES_LIST,requserdata);
export const SearchRolelistApi = async (requserdata) => await api.get(url.GET_SEARCH_ROLES_LIST, requserdata);

// Role Access Api
export const RoleAccesslistApi = async (requserdata) => await api.get(url.GET_ROLES_ACCESS_LIST, requserdata);
export const PostRoleAccesslistApi = async (requserdata) => await api.create(url.SAVE_ROLES_ACCESS_LIST, requserdata);

// Packing Type API
export const PackingTypelistApi = (requserdata) => api.get(url.GET_PACKING_TYPE_LIST, requserdata);
export const AddPackingTypelistApi = async (requserdata) => await api.create(url.ADD_PACKING_TYPE_LIST, requserdata);
export const DelPackingTypelistApi = async (requserdata) => await api.delete(url.DELETE_PACKING_TYPE_LIST, requserdata);
export const StatusPackingTypelistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_PACKING_TYPE_LIST, requserdata);

// Packing API
export const PackinglistApi = (requserdata) => api.get(url.GET_PACKING_LIST, requserdata);
export const AddPackinglistApi = async (requserdata) => await api.create(url.ADD_PACKING_LIST, requserdata);
export const DelPackinglistApi = async (requserdata) => await api.delete(url.DELETE_PACKING_LIST, requserdata);

// Category API
export const CategorylistApi = (requserdata) => api.get(url.GET_CATEGORY_LIST, requserdata);
export const AddCategorylistApi = async (requserdata) => await api.postMultipart(url.ADD_CATEGORY_LIST, requserdata);
export const DelCategorylistApi = async (requserdata) => await api.delete(url.DELETE_CATEGORY_LIST, requserdata);
export const StatusCategorylistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_CATEGORY_LIST, requserdata);

// Company API
export const CompanylistApi = (requserdata) => api.get(url.GET_COMPANY_LIST, requserdata);
export const AddCompanylistApi = async (requserdata) => await api.create(url.ADD_COMPANY_LIST, requserdata);
export const DelCompanylistApi = async (requserdata) => await api.delete(url.DELETE_COMPANY_LIST, requserdata);
export const StatusCompanylistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_COMPANY_LIST, requserdata);

// Complain API
export const ComplainlistApi = (requserdata) => api.get(url.GET_COMPLAIN_LIST, requserdata);
export const SalesComplainlistApi = (requserdata) => api.get(url.GET_SALES_COMPLAIN_LIST, requserdata);
export const FarmerComplainlistApi = (requserdata) => api.get(url.GET_FARMER_COMPLAIN_LIST, requserdata);
export const ComplainDetailslistApi = (requserdata) => api.get(url.GET_COMPLAIN_DETAILS_LIST, requserdata);
export const AddComplainlistApi = async (requserdata) => await api.create(url.ADD_COMPLAIN_LIST, requserdata);
export const DelComplainlistApi = async (requserdata) => await api.delete(url.DELETE_COMPLAIN_LIST, requserdata);
export const UpdateComplainlistApi = async (requserdata) => await api.update(url.UPDATE_COMPLAIN_LIST, requserdata);

// Product API
export const RelatedProductlistApi = (requserdata) => api.get(url.GET_RELATED_PRODUCT_LIST, requserdata);
export const ProductlistApi = (requserdata) => api.get(url.GET_PRODUCT_LIST, requserdata);
export const AddProductlistApi = async (requserdata) => await api.postMultipart(url.ADD_PRODUCT_LIST, requserdata);
export const UpdateProductApi = async (requserdata) => await api.update(url.UPDATE_PRODUCT_LIST, requserdata);
export const DelProductlistApi = async (requserdata) => await api.delete(url.DELETE_PRODUCT_LIST, requserdata);
export const DetailProductlistApi = (requserdata) => api.get(url.GET_PRODUCT_LIST, requserdata);

// Order API
export const UpdateOrderlistApi = (requserdata) => api.update(url.GET_UPDATE_ORDER_LIST, requserdata);
export const OrderlistApi = (requserdata) => api.get(url.GET_ORDER_LIST, requserdata);
export const SalesOrderlistApi = (requserdata) => api.get(url.GET_SALES_EXECUTIVE_ORDER_LIST, requserdata);
export const FermerOrderlistApi = (requserdata) => api.get(url.GET_FARMER_ORDER_LIST, requserdata);
export const OrderDetaillistApi = (requserdata) => api.get(url.GET_ORDER_DETAILS_LIST, requserdata);
export const AddOrderlistApi = async (requserdata) => await api.create(url.ADD_ORDER_LIST, requserdata);
export const DelOrderlistApi = async (requserdata) => await api.delete(url.DELETE_ORDER_LIST, requserdata);
export const ReturnOrderlistApi = async (requserdata) => await api.get(url.RETURN_ORDER_LIST, requserdata);

// Banner API
export const BannerlistApi = (requserdata) => api.get(url.GET_BANNER_LIST, requserdata);
export const AddBannerlistApi = async (requserdata) => await api.postMultipart(url.ADD_BANNER_LIST, requserdata);
export const DelBannerlistApi = async (requserdata) => await api.delete(url.DELETE_BANNER_LIST, requserdata);

// Taglog API
export const TagloglistApi = (requserdata) => api.get(url.GET_TAGLOG_LIST, requserdata);
export const AddTagloglistApi = async (requserdata) => await api.create(url.ADD_TAGLOG_LIST, requserdata);
export const DelTagloglistApi = async (requserdata) => await api.delete(url.DELETE_TAGLOG_LIST, requserdata);
export const StatusTagloglistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_TAGLOG_LIST, requserdata);

export const SubTagloglistApi = (requserdata) => api.get(url.GET_SUB_TAGLOG_LIST, requserdata);
export const AddSubTagloglistApi = async (requserdata) => await api.create(url.ADD_SUB_TAGLOG_LIST, requserdata);
export const DelSubTagloglistApi = async (requserdata) => await api.delete(url.DELETE_SUB_TAGLOG_LIST, requserdata);
export const StatusSubTagloglistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_SUB_TAGLOG_LIST, requserdata);

export const CustomerTagloglistApi = (requserdata) => api.get(url.GET_CUSTOMER_TAGLOG_LIST, requserdata);
export const AddCustomerTagloglistApi = async (requserdata) => await api.create(url.ADD_CUSTOMER_TAGLOG_LIST, requserdata);

export const ExportDatalistApi = async (requserdata,name) => await api.get(url.GET_EXPORT_DATA_LIST, requserdata,name);

// Customer API
export const CustomerlistApi = (requserdata) => api.get(url.GET_CUSTOMER_DATA_LIST, requserdata);
export const AddCustomerlistApi = async (requserdata) => await api.create(url.ADD_CUSTOMER_DATA_LIST, requserdata);
export const UpdateCustomerlistApi = async (requserdata) => await api.update(url.UPDATE_CUSTOMER_DATA_LIST, requserdata);
export const DelCustomerlistApi = async (requserdata) => await api.delete(url.DELETE_CUSTOMER_DATA_LIST, requserdata);
export const BlockCustomerlistApi = async (requserdata) => await api.update(url.BLOCK_CUSTOMER_DATA_LIST, requserdata);
export const CheckCustomerApi = async (requserdata) => await api.get(url.CHECK_CUSTOMER_EXIST_LIST, requserdata);

// Crops API
export const CroplistApi = (requserdata) => api.get(url.GET_CROP_LIST, requserdata);
export const AddCroplistApi = async (requserdata) => await api.postMultipart(url.ADD_CROP_LIST, requserdata);
export const DelCroplistApi = async (requserdata) => await api.delete(url.DELETE_CROP_LIST, requserdata);
export const StatusCroplistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_CROP_LIST, requserdata);

// Coupon API
export const CouponlistApi = (requserdata) => api.get(url.GET_COUPON_LIST, requserdata);
export const AddCouponlistApi = async (requserdata) => await api.create(url.ADD_COUPON_LIST, requserdata);
export const DelCouponlistApi = async (requserdata) => await api.delete(url.DELETE_COUPON_LIST, requserdata);
export const StatusCouponlistApi = async (requserdata) => await api.delete(url.CHANGE_STATUS_COUPON_LIST, requserdata);

// Lead API
export const LeadlistApi = (requserdata) => api.get(url.GET_LEAD_LIST, requserdata);
export const AddLeadlistApi = async (requserdata) => await api.create(url.ADD_LEAD_LIST, requserdata);
export const MarkAsReadLeadlistApi = async (requserdata) => await api.get(url.MARK_AS_READ_LEAD_LIST, requserdata);
export const DelLeadlistApi = async (requserdata) => await api.delete(url.DELETE_LEAD_LIST, requserdata);

// ==========  sales executive API =========================
export const SalesExcutiveDashboardlistApi = (requserdata) => api.get(url.GET_SALES_DASHBOARD_DATA, requserdata);
export const SalesExcutiveCallbacklistApi = (requserdata) => api.get(url.GET_CALLBACK_DATA, requserdata);
export const MarkasDonelistApi = (requserdata) => api.get(url.GET_MARK_AS_DONE_DATA, requserdata);

// Location API
export const StatelistApi = (requserdata) => api.get(url.GET_STATE_DATA_LIST, requserdata);
export const DistrictlistApi = (requserdata) => api.get(url.GET_DISTRICT_DATA_LIST, requserdata);
export const TalukalistApi = (requserdata) => api.get(url.GET_TALUKA_DATA_LIST, requserdata);
export const VillagelistApi = (requserdata) => api.get(url.GET_VILLAGE_DATA_LIST, requserdata);