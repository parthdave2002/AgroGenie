import { combineReducers } from "redux";

import Banner from "./Banner/reducer";
import Category from "./Category/reducer";
import Company from "./Company/reducer";
import Coupon from "./Coupon/reducer";
import Crop from "./Crop/reducer";
import Product from "./Product/reducer";
import Lead from "./Lead/reducer";


const rootReducer = combineReducers({
    Category,
    Company,
    Product,
    Banner,
    Crop,
    Coupon,
    Lead
});

export default rootReducer;