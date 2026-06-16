import { all, fork } from "redux-saga/effects";

//  >>>>>>>>>>>>>>>>>>>>>>> Node Api <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
import AdminDashboardSaga from "./AdminDashboard/saga"
import LoginSaga from "./Login/saga";
import UserSaga from "./User/saga";
import RoleSaga from "./Roles/saga";
import RoleAccessSaga from "./RoleAccess/saga";
import PackingSaga from "./Packing/Packing/saga";
import PackingTypeSaga from "./Packing/Packing type/saga";
import CategorySaga from "./Category/saga";
import CompanySaga from "./Company/saga";
import OrderSaga from "./Order/saga";
import ProductSaga from "./Product/saga";
import BannerSaga from "./Banner/saga";
import TaglogSaga from "./Taglog/saga";
import ExportDataSaga from "./ExportData/saga";
import CustomerSaga from "./Customer/saga";
import CropSaga from "./Crop/saga";
import CouponSaga from "./Coupon/saga";
import LeadSaga from "./Lead/saga";
import ComplainSaga from "./Complain/saga";
import LocationSaga from "./Location/saga";
import LeaveSaga from "./Leave/saga";
import TestimonialSaga from "./Testimonial/saga";
import NoticeBoardSaga from "./NoticeBoard/saga";
import WarehouseSaga from "./Warehouse/saga.js";
import SalesDashboardSaga from "./SalesExecutive/dashboard/saga";
import KanbanSaga from "./Kanban/saga";
import WalletSaga from "./Wallet/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AdminDashboardSaga),
    fork(LoginSaga),
    fork(UserSaga),
    fork(RoleSaga),
    fork(RoleAccessSaga),
    fork(PackingTypeSaga),
    fork(PackingSaga),
    fork(CategorySaga),
    fork(CompanySaga),
    fork(OrderSaga),
    fork(ProductSaga),
    fork(BannerSaga),
    fork(TaglogSaga),
    fork(CustomerSaga),
    fork(ExportDataSaga),
    fork(CropSaga),
    fork(CouponSaga),
    fork(LeadSaga),
    fork(LeaveSaga),
    fork(TestimonialSaga),
    fork(NoticeBoardSaga),
    fork(ComplainSaga),
    fork(SalesDashboardSaga),
    fork(LocationSaga),
    fork(WarehouseSaga),
    fork(KanbanSaga),
    fork(WalletSaga),
  ]);
}
