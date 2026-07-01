import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getHRDashbaordlistSuccess,
  getHRDashbaordlistFail,
  ResetHRDashbaordlist,
  ResetHRDashbaordlistSuccess,
  ResetHRDashbaordlistFail
} from "./action";
import { GET_HR_DASHBOARD_LIST, REST_HR_DASHBOARD_LIST } from "./actionType";
import { HRDatalistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetHrDataList({ payload: requstuser }) {
  try {
    const response = yield call(HRDatalistApi, requstuser);
    yield put(getHRDashbaordlistSuccess(GET_HR_DASHBOARD_LIST, response));
  } catch (error) {
    yield put(getHRDashbaordlistFail(error));
  }
}

function* onResetHrDataList() {
    const response = yield call(ResetHRDashbaordlist);
    yield put(ResetHRDashbaordlistSuccess(REST_HR_DASHBOARD_LIST, response)); 
}

function* HrDashboardSaga() {
  yield takeEvery(GET_HR_DASHBOARD_LIST, onGetHrDataList);
  yield takeEvery(REST_HR_DASHBOARD_LIST, onResetHrDataList);
}
export default HrDashboardSaga;
