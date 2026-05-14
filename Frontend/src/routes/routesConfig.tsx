import { lazy } from "react";
const lazyImport = (importFn: () => Promise<any>) => lazy(importFn);

export const adminRoutes = [
  { path: "/dashboard", component: lazyImport(() => import("../pages/Admin/adminDashboard/index")) },
  { path: "/manager-dashboard", component: lazyImport(() => import("../pages/Managerdashboard/dashoboard")) },

  // Users
  { path: "/users/list", component: lazyImport(() => import("../pages/Admin/users/list")) },
  { path: "/users/add", component: lazyImport(() => import("../pages/Admin/users/useradd")) },
  { path: "/users/edit/:id", component: lazyImport(() => import("../pages/Admin/users/useradd")) },
  { path: "/users/details/:id", component: lazyImport(() => import("../pages/Admin/users/userdetails")) },

  //  User Category
  { path: "/users/category/list", component: lazyImport(() => import("../pages/Admin/usersCategory/userCategorylist")) },
  { path: "/users/category/add", component: lazyImport(() => import("../pages/Admin/usersCategory/userCategoryadd")) },
  { path: "/users/category/edit/:id", component: lazyImport(() => import("../pages/Admin/usersCategory/userCategoryadd")) },


  // Roles
  { path: "/roles/list", component: lazyImport(() => import("../pages/Admin/roles/roles")) },
  { path: "/roles/add", component: lazyImport(() => import("../pages/Admin/roles/roleadd")) },
  { path: "/roles/:id", component: lazyImport(() => import("../pages/Admin/roles/roleadd")) },
  { path: "/roles/details", component: lazyImport(() => import("../pages/Admin/roles/roledeatails")) },
  { path: "/role-access/:id", component: lazyImport(() => import("../pages/Admin/roles/roles-access")) },

  // Packing Type
  { path: "/packing-type/list", component: lazyImport(() => import("../pages/Admin/packingType/packingType")) },
  { path: "/packing-type/add", component: lazyImport(() => import("../pages/Admin/packingType/packingTypeAdd")) },
  { path: "/packing-type/:id", component: lazyImport(() => import("../pages/Admin/packingType/packingTypeAdd")) },
  { path: "/packing-type/details/:id", component: lazyImport(() => import("../pages/Admin/packingType/packingTypeDetails")) },

  // Packing
  { path: "/packing/list", component: lazyImport(() => import("../pages/Admin/packing/packing")) },
  { path: "/packing/add", component: lazyImport(() => import("../pages/Admin/packing/packingAdd")) },
  { path: "/packing/:id", component: lazyImport(() => import("../pages/Admin/packing/packingAdd")) },
  { path: "/packing/details/:id", component: lazyImport(() => import("../pages/Admin/packing/packingDetails")) },

  // Company
  { path: "/company/list", component: lazyImport(() => import("../pages/Admin/company/companyList")) },
  { path: "/company/add", component: lazyImport(() => import("../pages/Admin/company/companyAdd")) },
  { path: "/company/:id", component: lazyImport(() => import("../pages/Admin/company/companyAdd")) },
  { path: "/company/details/:id", component: lazyImport(() => import("../pages/Admin/company/companyDetails")) },

  // Category
  { path: "/category/list", component: lazyImport(() => import("../pages/Admin/category/categoryList")) },
  { path: "/category/add", component: lazyImport(() => import("../pages/Admin/category/categoryAdd")) },
  { path: "/category/:id", component: lazyImport(() => import("../pages/Admin/category/categoryAdd")) },
  { path: "/category/details/:id", component: lazyImport(() => import("../pages/Admin/category/categoryDetails")) },

  // Customer
  { path: "/customer/list", component: lazyImport(() => import("../pages/Admin/customer/customerlist")) },
  { path: "/customer/details/:id", component: lazyImport(() => import("../pages/Admin/customer/customerdetails")) },

  // Others
  { path: "/profile", component: lazyImport(() => import("../pages/Admin/profile/profile")) },
  { path: "/banner/list", component: lazyImport(() => import("../pages/Admin/banner/bannerList")) },
  { path: "/banner/add", component: lazyImport(() => import("../pages/Admin/banner/bannerAdd")) },
  { path: "/banner/:id", component: lazyImport(() => import("../pages/Admin/banner/bannerAdd")) },
  { path: "/banner/details/:id", component: lazyImport(() => import("../pages/Admin/banner/bannerDetails")) },

  // Taglog
  { path: "/taglog/list", component: lazyImport(() => import("../pages/Admin/taglog/taglogList")) },
  { path: "/taglog/add", component: lazyImport(() => import("../pages/Admin/taglog/taglogAdd")) },
  { path: "/taglog/:id", component: lazyImport(() => import("../pages/Admin/taglog/taglogAdd")) },
  { path: "/taglog/details/:id", component: lazyImport(() => import("../pages/Admin/taglog/taglogDetails")) },
  { path: "/subtaglog/list/:id", component: lazyImport(() => import("../pages/Admin/taglog/subTaglogList")) },
  { path: "/subtaglog/add/:id", component: lazyImport(() => import("../pages/Admin/taglog/subTaglogAdd")) },

  // Product
  { path: "/product/list", component: lazyImport(() => import("../pages/Admin/product/productList")) },
  { path: "/product/add", component: lazyImport(() => import("../pages/Admin/product/productAdd")) },
  { path: "/product/edit/:id", component: lazyImport(() => import("../pages/Admin/product/productAdd")) },
  { path: "/product/details/:id", component: lazyImport(() => import("../pages/Admin/product/productDetails")) },

  // Orders
  { path: "/order/list", component: lazyImport(() => import("../pages/Admin/order/order")) },
  { path: "/order/details/:id", component: lazyImport(() => import("../pages/Admin/order/orderdetails")) },

  // Lead & Report
  { path: "/lead/list", component: lazyImport(() => import("../pages/Admin/lead/lead")) },
  { path: "/report", component: lazyImport(() => import("../pages/Admin/report/report")) },

  // Crops
  { path: "/crop/list", component: lazyImport(() => import("../pages/Admin/crops/cropsList")) },
  { path: "/crop/add", component: lazyImport(() => import("../pages/Admin/crops/cropsAdd")) },
  { path: "/crop/:id", component: lazyImport(() => import("../pages/Admin/crops/cropsAdd")) },
  { path: "/crop/details/:id", component: lazyImport(() => import("../pages/Admin/crops/cropsDetails")) },

  // Testimonial
  { path: "/testimonial/list", component: lazyImport(() => import("../pages/Admin/testimonial/testimonialList")) },
  { path: "/testimonial/add", component: lazyImport(() => import("../pages/Admin/testimonial/testimonialAdd")) },

  // leave Management
  { path: "/leave/list", component: lazyImport(() => import("../pages/Admin/leave/leaves")) },

  // Notice Board
  { path: "/notice-board/list", component: lazyImport(() => import("../pages/Admin/noticeBoard/noticeBoardList")) },
  { path: "/notice-board/add", component: lazyImport(() => import("../pages/Admin/noticeBoard/noticeBoardAdd")) },
  { path: "/notice-board/details/:id", component: lazyImport(() => import("../pages/Admin/noticeBoard/noticeBoardDetails")) },


  { path: "/kanban", component: lazyImport(() => import("../pages/Admin/kanban/kanban")) },

  // Coupon
  { path: "/coupon/list", component: lazyImport(() => import("../pages/Admin/coupon/couponList")) },
  { path: "/coupon/add", component: lazyImport(() => import("../pages/Admin/coupon/couponAdd")) },

  // Misc
  { path: "/sales-crm", component: lazyImport(() => import("../pages/salesExecutive")) },
  { path: "/chat", component: lazyImport(() => import("../components/chat/chatButton")) },


  { path: "/warehouse/list", component: lazyImport(() => import("../pages/warehouse/warehouse")) },
  { path: "/warehouse/add", component: lazyImport(() => import("../pages/warehouse/warehouseAdd")) },
  { path: "/warehouse/edit/:id", component: lazyImport(() => import("../pages/warehouse/warehouseAdd")) },
  { path: "/warehouse/details/:id", component: lazyImport(() => import("../pages/warehouse/warehouseDetails")) },
];
