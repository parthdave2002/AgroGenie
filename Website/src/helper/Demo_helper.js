import { useEffect } from "react";
import { APIClient, setAuthorization } from "./api_helper";
import * as url from "./url_helper";
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
export const CategorylistApi = (requserdata) => api.get(url.GET_CATEGORY_LIST, requserdata); // Category API

export const CompanylistApi = (requserdata) => api.get(url.GET_COMPANY_LIST, requserdata); // Company API

// Product API
export const RelatedProductlistApi = (requserdata) => api.get(url.GET_RELATED_PRODUCT_LIST, requserdata);
export const ProductlistApi = (requserdata) => api.get(url.GET_PRODUCT_LIST, requserdata);
export const DetailProductlistApi = (requserdata) => api.get(url.GET_PRODUCT_LIST, requserdata);

export const BannerlistApi = (requserdata) => api.get(url.GET_BANNER_LIST, requserdata); // Banner API

export const CroplistApi = (requserdata) => api.get(url.GET_CROP_LIST, requserdata);   // Crops API

export const CouponlistApi = (requserdata) => api.get(url.GET_COUPON_LIST, requserdata); // Coupon API

// Lead API
export const LeadlistApi = (requserdata) => api.get(url.GET_LEAD_LIST, requserdata);
export const AddLeadlistApi = async (requserdata) => await api.create(url.ADD_LEAD_LIST, requserdata);
export const MarkAsReadLeadlistApi = async (requserdata) => await api.create(url.MARK_AS_READ_LEAD_LIST, requserdata);
export const DelLeadlistApi = async (requserdata) => await api.delete(url.DELETE_LEAD_LIST, requserdata);