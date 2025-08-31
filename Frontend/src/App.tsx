import { useState, type FC, lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import LoaderPage from "./components/loader";
import { useSelector } from "react-redux";

const DashboardPage = lazy(() => import("./pages"));
const ManagerDashboardPage = lazy(() => import("./pages/mdashboard/dashoboard"));
const SignInPage = lazy(() => import("./pages/authentication/sign-in"));
const ResetPasswordPage = lazy(() => import("./pages/authentication/reset-password"));
const UserListPage = lazy(() => import("./pages/users/list"));
const AddUserPage = lazy(() => import("./pages/users/useradd"));
const UserDetailsPage = lazy(() => import("./pages/users/userdetails"));
const RolesPage = lazy(() => import("./pages/roles/roles"));
const AddRolePage = lazy(() => import("./pages/roles/roleadd"));
const RoleDetailsPage = lazy(() => import("./pages/roles/roledeatails"));
const RolesAccessPage = lazy(() => import("./pages/roles/roles-access"));
const PackingTypeListPage = lazy(() => import("./pages/packingType/packingType"));
const AddpackingTypePage = lazy(() => import("./pages/packingType/packingTypeAdd"));
const PackingTypeDetailsPage = lazy(() => import("./pages/packingType/packingTypeDetails"));
const PackingListPage = lazy(() => import("./pages/packing/packing"));
const AddpackingPage = lazy(() => import("./pages/packing/packingAdd"));
const PackingDetailsPage = lazy(() => import("./pages/packing/packingDetails"));
const CompanyListPage = lazy(() => import("./pages/company/companyList"));
const CompanyAddPage = lazy(() => import("./pages/company/companyAdd"));
const CompanyDetailsPage = lazy(() => import("./pages/company/companyDetails"));
const CategoryListPage = lazy(() => import("./pages/category/categoryList"));
const CategoryAddPage = lazy(() => import("./pages/category/categoryAdd"));
const CategoryDetailsPage = lazy(() => import("./pages/category/categoryDetails"));
const CustomerListPage = lazy(() => import("./pages/customer/customerlist"));
const CustomerDetailsPage = lazy(() => import("./pages/customer/customerdetails"));
const ProfilePage = lazy(() => import("./pages/profile/profile"));
const PageNotFound = lazy(() => import("./pages/pagenotfound/pagenotfound"));
const BannerListPage = lazy(() => import("./pages/banner/bannerList"));
const BannerAddPage = lazy(() => import("./pages/banner/bannerAdd"));
const BannerDetailsPage = lazy(() => import("./pages/banner/bannerDetails"));
const ProductAddPage = lazy(() => import("./pages/product/productAdd"));
const ProductListPage = lazy(() => import("./pages/product/productList"));
const ProductDetailsPage = lazy(() => import("./pages/product/productDetails"));
const OrderListPage = lazy(() => import("./pages/order/order"));
const OrderDetailsPage = lazy(() => import("./pages/order/orderdetails"));
const LeadListPage = lazy(() => import("./pages/lead/lead"));
const TaglogListPage = lazy(() => import("./pages/taglog/taglogList"));
const TaglogAddPage = lazy(() => import("./pages/taglog/taglogAdd"));
const TaglogDetailsPage = lazy(() => import("./pages/taglog/taglogDetails"));
const SubTaglogListPage = lazy(() => import("./pages/taglog/subTaglogList"));
const SubTaglogAddPage = lazy(() => import("./pages/taglog/subTaglogAdd"));
const ReportPage = lazy(() => import("./pages/report/report"));
const CropsListPage = lazy(() => import("./pages/crops/cropsList"));
const AddCropsPage = lazy(() => import("./pages/crops/cropsAdd"));
const CropsDetailsPage = lazy(() => import("./pages/crops/cropsDetails"));
const SalesCRMPage = lazy(() => import("./pages/salesExecutive"));
const CouponListPage = lazy(() => import("./pages/coupon/couponList"));
const AddCouponPage = lazy(() => import("./pages/coupon/couponAdd"));
const WarehousePage = lazy(() => import("./pages/warehouse/warehouse"));

const App: FC = function () {
  const isAuthenticated = useSelector((state: any) => state.Login.Logincode?.success);
  
  return (
    <Suspense fallback={<div> <LoaderPage /> </div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>

          {/* Admin Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/manager-dashboard" element={<ManagerDashboardPage />} />
            <Route path="/users/list" element={<UserListPage />} />
            <Route path="/users/add" element={<AddUserPage />} />
            <Route path="/users/edit/:id" element={<AddUserPage />} />
            <Route path="/users/details/:id" element={<UserDetailsPage />} />
            <Route path="/roles/list" element={<RolesPage />} />
            <Route path="/roles/add" element={<AddRolePage />} />
            <Route path="/roles/:id" element={<AddRolePage />} />
            <Route path="/roles/details" element={<RoleDetailsPage />} />
            <Route path="/role-access/:id" element={<RolesAccessPage />} />
            <Route path="/packing-type/list" element={<PackingTypeListPage />} />
            <Route path="/packing-type/add" element={<AddpackingTypePage />} />
            <Route path="/packing-type/:id" element={<AddpackingTypePage />} />
            <Route path="/packing-type/details/:id" element={<PackingTypeDetailsPage />} />
            <Route path="/packing/list" element={<PackingListPage />} />
            <Route path="/packing/add" element={<AddpackingPage />} />
            <Route path="/packing/:id" element={<AddpackingPage />} />
            <Route path="/packing/details/:id" element={<PackingDetailsPage />} />
            <Route path="/company/list" element={<CompanyListPage />} />
            <Route path="/company/add" element={<CompanyAddPage />} />
            <Route path="/company/:id" element={<CompanyAddPage />} />
            <Route path="/company/details/:id" element={<CompanyDetailsPage />} />
            <Route path="/category/list" element={<CategoryListPage />} />
            <Route path="/category/add" element={<CategoryAddPage />} />
            <Route path="/category/:id" element={<CategoryAddPage />} />
            <Route path="/category/details/:id" element={<CategoryDetailsPage />} />
            <Route path="/customer/list" element={<CustomerListPage />} />
            <Route path="/customer/details/:id" element={<CustomerDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/banner/list" element={<BannerListPage />} />
            <Route path="/banner/add" element={<BannerAddPage />} />
            <Route path="/banner/:id" element={<BannerAddPage />} />
            <Route path="/banner/details/:id" element={<BannerDetailsPage />} />
            <Route path="/taglog/list" element={<TaglogListPage />} />
            <Route path="/taglog/add" element={<TaglogAddPage />} />
            <Route path="/taglog/:id" element={<TaglogAddPage />} />
            <Route path="/taglog/details/:id" element={<TaglogDetailsPage />} />
            <Route path="/subtaglog/list/:id" element={<SubTaglogListPage />} />
            <Route path="/subtaglog/add/:id" element={<SubTaglogAddPage />} />
            <Route path="/product/list" element={<ProductListPage />} />
            <Route path="/product/add" element={<ProductAddPage />} />
            <Route path="/product/edit/:id" element={<ProductAddPage />} />
            <Route path="/product/details/:id" element={<ProductDetailsPage />} />
            <Route path="/order/list" element={<OrderListPage />} />
            <Route path="/order/details/:id" element={<OrderDetailsPage />} />
            <Route path="/lead/list" element={<LeadListPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/crop/list" element={<CropsListPage />} />
            <Route path="/crop/add" element={<AddCropsPage />} />
            <Route path="/crop/:id" element={<AddCropsPage />} />
            <Route path="/crop/details/:id" element={<CropsDetailsPage />} />

            <Route path="/coupon/list" element={<CouponListPage />} />
            <Route path="/coupon/add" element={<AddCouponPage />} />
            {/* Sales Routes */}
            <Route path="/sales-crm" element={<SalesCRMPage />} />
            <Route path="/warehouse" element={<WarehousePage />} />
          </Route>

          <Route path="/login" element={<SignInPage />} index />
          <Route path="/reset-password/:token/:id" element={<ResetPasswordPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;