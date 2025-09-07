import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCouponlistSuccess,
  getCouponlistFail,
} from "./action";
import { GET_COUPON_LIST } from "./actionType";
import { CouponlistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCouponList({ payload: requstuser }) {
  try {
    const response = yield call(CouponlistApi, requstuser);
    yield put(getCouponlistSuccess(GET_COUPON_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getCouponlistFail(error));
  }
}

function* CouponSaga() {
  yield takeEvery(GET_COUPON_LIST, onGetCouponList);
}
export default CouponSaga;
