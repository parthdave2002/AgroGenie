import { lazy } from "react";

const lazyImport = (path: string) => lazy(() => import(path));

export const adminRoutes = [
  { path: "/dashboard", component: lazyImport("../pages/Admin/adminDashboard/index") },
  { path: "/manager-dashboard", component: lazyImport("../pages/Managerdashboard/dashoboard") },

  // Users
  { path: "/users/list", component: lazyImport("../pages/Admin/users/list") },
  { path: "/users/add", component: lazyImport("../pages/Admin/users/useradd") },
  { path: "/users/edit/:id", component: lazyImport("../pages/Admin/users/useradd") },
  { path: "/users/details/:id", component: lazyImport("../pages/Admin/users/userdetails") },

  // Roles
  { path: "/roles/list", component: lazyImport("../pages/Admin/roles/roles") },
  { path: "/roles/add", component: lazyImport("../pages/Admin/roles/roleadd") },
  { path: "/roles/:id", component: lazyImport("../pages/Admin/roles/roleadd") },
  { path: "/roles/details", component: lazyImport("../pages/Admin/roles/roledeatails") },
  { path: "/role-access/:id", component: lazyImport("../pages/Admin/roles/roles-access") },

  // Packing Type
  { path: "/packing-type/list", component: lazyImport("../pages/Admin/packingType/packingType") },
  { path: "/packing-type/add", component: lazyImport("../pages/Admin/packingType/packingTypeAdd") },
  { path: "/packing-type/:id", component: lazyImport("../pages/Admin/packingType/packingTypeAdd") },
  { path: "/packing-type/details/:id", component: lazyImport("../pages/Admin/packingType/packingTypeDetails") },

  // Packing
  { path: "/packing/list", component: lazyImport("../pages/Admin/packing/packing") },
  { path: "/packing/add", component: lazyImport("../pages/Admin/packing/packingAdd") },
  { path: "/packing/:id", component: lazyImport("../pages/Admin/packing/packingAdd") },
  { path: "/packing/details/:id", component: lazyImport("../pages/Admin/packing/packingDetails") },

  // Company
  { path: "/company/list", component: lazyImport("../pages/Admin/company/companyList") },
  { path: "/company/add", component: lazyImport("../pages/Admin/company/companyAdd") },
  { path: "/company/:id", component: lazyImport("../pages/Admin/company/companyAdd") },
  { path: "/company/details/:id", component: lazyImport("../pages/Admin/company/companyDetails") },

  // Category
  { path: "/category/list", component: lazyImport("../pages/Admin/category/categoryList") },
  { path: "/category/add", component: lazyImport("../pages/Admin/category/categoryAdd") },
  { path: "/category/:id", component: lazyImport("../pages/Admin/category/categoryAdd") },
  { path: "/category/details/:id", component: lazyImport("../pages/Admin/category/categoryDetails") },

  // Customer
  { path: "/customer/list", component: lazyImport("../pages/Admin/customer/customerlist") },
  { path: "/customer/details/:id", component: lazyImport("../pages/Admin/customer/customerdetails") },

  // Others
  { path: "/profile", component: lazyImport("../pages/Admin/profile/profile") },
  { path: "/banner/list", component: lazyImport("../pages/Admin/banner/bannerList") },
  { path: "/banner/add", component: lazyImport("../pages/Admin/banner/bannerAdd") },
  { path: "/banner/:id", component: lazyImport("../pages/Admin/banner/bannerAdd") },
  { path: "/banner/details/:id", component: lazyImport("../pages/banner/Admin/bannerDetails") },

  // Taglog
  { path: "/taglog/list", component: lazyImport("../pages/Admin/taglog/taglogList") },
  { path: "/taglog/add", component: lazyImport("../pages/Admin/taglog/taglogAdd") },
  { path: "/taglog/:id", component: lazyImport("../pages/Admin/taglog/taglogAdd") },
  { path: "/taglog/details/:id", component: lazyImport("../pages/Admin/taglog/taglogDetails") },
  { path: "/subtaglog/list/:id", component: lazyImport("../pages/Admin/taglog/subTaglogList") },
  { path: "/subtaglog/add/:id", component: lazyImport("../pages/Admin/taglog/subTaglogAdd") },

  // Product
  { path: "/product/list", component: lazyImport("../pages/Admin/product/productList") },
  { path: "/product/add", component: lazyImport("../pages/Admin/product/productAdd") },
  { path: "/product/edit/:id", component: lazyImport("../pages/Admin/product/productAdd") },
  { path: "/product/details/:id", component: lazyImport("../pages/Admin/product/productDetails") },

  // Orders
  { path: "/order/list", component: lazyImport("../pages/Admin/order/order") },
  { path: "/order/details/:id", component: lazyImport("../pages/Admin/order/orderdetails") },

  // Lead & Report
  { path: "/lead/list", component: lazyImport("../pages/Admin/lead/lead") },
  { path: "/report", component: lazyImport("../pages/report/report") },

  // Crops
  { path: "/crop/list", component: lazyImport("../pages/Admin/crops/cropsList") },
  { path: "/crop/add", component: lazyImport("../pages/Admin/crops/cropsAdd") },
  { path: "/crop/:id", component: lazyImport("../pages/Admin/crops/cropsAdd") },
  { path: "/crop/details/:id", component: lazyImport("../pages/Admin/crops/cropsDetails") },

  // Testimonial
  { path: "/testimonial/list", component: lazyImport("../pages/Admin/testimonial/testimonialList") },
  { path: "/testimonial/add", component: lazyImport("../pages/Admin/testimonial/testimonialAdd") },

  // Coupon
  { path: "/coupon/list", component: lazyImport("../pages/Admin/coupon/couponList") },
  { path: "/coupon/add", component: lazyImport("../pages/Admin/coupon/couponAdd") },

  // Misc
  { path: "/sales-crm", component: lazyImport("../pages/salesExecutive") },
  { path: "/warehouse", component: lazyImport("../pages/warehouse/warehouse") },
];
