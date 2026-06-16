import { combineReducers } from "redux";

import AdminDashboard from "./AdminDashboard/reducer";
import Login from "./Login/reducer";
import User from "./User/reducer";
import Role from "./Roles/reducer";
import RoleAccess from "./RoleAccess/reducer";
import PackingType from "./Packing/Packing type/reducer";
import Packing from "./Packing/Packing/reducer";
import Category from "./Category/reducer";
import Company from "./Company/reducer";
import Product from "./Product/reducer";
import Order from "./Order/reducer";
import Banner from "./Banner/reducer";
import Taglog from "./Taglog/reducer";
import ExportData from "./ExportData/reducer";
import Customer from "./Customer/reducer";
import Crop from "./Crop/reducer";
import Coupon from "./Coupon/reducer";
import Lead from "./Lead/reducer";
import Complain from "./Complain/reducer";
import Location from "./Location/reducer";
import Leave from "./Leave/reducer";
import Testimonial from "./Testimonial/reducer";
import NoticeBoard from "./NoticeBoard/reducer";
import Warehouse from "./Warehouse/reducer";
import SalesDashboard from "./SalesExecutive/dashboard/reducer";
import Kanban from "./Kanban/reducer";
import Wallet from "./Wallet/reducer";

const rootReducer = combineReducers({
    // public
    AdminDashboard,
    Login,
    User,
    Role,
    RoleAccess,

    PackingType,
    Packing,
    Category,
    Company,
    Order,
    Product,
    Banner,
    Taglog,
    ExportData,
    Customer,
    Crop,
    Coupon,
    Lead,
    Leave,
    Testimonial,
    NoticeBoard,
    Complain,
    SalesDashboard,
    Location,
    Warehouse,
    Kanban,
    Wallet
});

export default rootReducer;