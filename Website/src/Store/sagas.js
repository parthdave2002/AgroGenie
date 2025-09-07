import { all, fork } from "redux-saga/effects";
import BannerSaga from "./Banner/saga";
import CategorySaga from "./Category/saga";
import CompanySaga from "./Company/saga";
import CouponSaga from "./Coupon/saga";
import CropSaga from "./Crop/saga";
import ProductSaga from "./Product/saga";
import LeadSaga from "./Lead/saga";


export default function* rootSaga() {
  yield all([

    fork(CategorySaga),
    fork(CompanySaga),
    fork(ProductSaga),
    fork(BannerSaga),
    fork(CropSaga),
    fork(CouponSaga),
    fork(LeadSaga),
  ]);
}
