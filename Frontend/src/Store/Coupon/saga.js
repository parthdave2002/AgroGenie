import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCouponlistSuccess,
  getCouponlistFail,
  AddCouponlistSuccess,
  AddCouponlistFail,
  DeleteCouponlistSuccess,
  DeleteCouponlistFail,
  ResetCouponlist,
  ResetCouponlistSuccess,
  ChangestatusCouponlistSuccess,
  ChangestatusCouponlistFail
} from "./action";
import {
  GET_COUPON_LIST,
  ADD_COUPON_LIST,
  DELETE_COUPON_LIST,
  CHANGE_STATUS_COUPON_LIST,
  RESET_COUPON_LIST
} from "./actionType";
import { CouponlistApi, AddCouponlistApi, DelCouponlistApi, StatusCouponlistApi} from "../../helper/Demo_helper";
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

function* onAddCouponList({ payload: requstuser }) {
  try {
    const response = yield call(AddCouponlistApi, requstuser);
    yield put(AddCouponlistSuccess(ADD_COUPON_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddCouponlistFail(error));
  }
}

function* onDelCouponList({ payload: requstuser }) {
  try {
    const response = yield call(DelCouponlistApi, requstuser);
    yield put(DeleteCouponlistSuccess(DELETE_COUPON_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      let requ ={
        page :1,
        size: 5
      }
      const newresponse = yield call(CouponlistApi, requ);
      yield put(getCouponlistSuccess(GET_COUPON_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteCouponlistFail(error));
  }
}

function* onChangeCouponList({ payload: requstuser }) {
  try {
    const response = yield call(StatusCouponlistApi, requstuser);
    yield put(ChangestatusCouponlistSuccess(CHANGE_STATUS_COUPON_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      let requ ={
        page :1,
        size: 5
      }
      const newresponse = yield call(CouponlistApi, requ);
      yield put(getCouponlistSuccess(GET_COUPON_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangestatusCouponlistFail(error));
  }
}


function* onResetCouponList({ payload: requstuser }) {
    const response = yield call(ResetCouponlist);
    yield put(ResetCouponlistSuccess(RESET_COUPON_LIST, response));
}

function* CouponSaga() {
  yield takeEvery(GET_COUPON_LIST, onGetCouponList);
  yield takeEvery(ADD_COUPON_LIST, onAddCouponList);
  yield takeEvery(DELETE_COUPON_LIST, onDelCouponList);
  yield takeEvery(CHANGE_STATUS_COUPON_LIST, onChangeCouponList);
  yield takeEvery(RESET_COUPON_LIST, onResetCouponList);
}
export default CouponSaga;
