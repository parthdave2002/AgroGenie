import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getDashboarddatalistSuccess,
  getDashboarddatalistFail,
  getReportDatalistSuccess,
  getReportDatalistFail,
  ResetReportDatalist,
  ResetReportDatalistSuccess,
} from "./action";
import {
  GET_DASHBOARD_DATA_LIST,
  GET_REPORT_DATA_LIST,
  REST_REPORT_DATA_LIST
} from "./actionType";
import { DashboardDatalistApi, ReportDataApi } from "../../helper/Demo_helper";

function* onGetDashboardData({ payload: requstuser }) {
  try {
    const response = yield call(DashboardDatalistApi, requstuser);
    yield put(getDashboarddatalistSuccess(GET_DASHBOARD_DATA_LIST, response));
  } catch (error) {
    yield put(getDashboarddatalistFail(error));
  }
}

function* onGetReportDatalist({ payload: requstuser }) {
  try {
    const response = yield call(ReportDataApi, requstuser);
    yield put(getReportDatalistSuccess(GET_REPORT_DATA_LIST, response));
  } catch (error) {
    yield put(getReportDatalistFail(error));
  }
}

function* onResetReportDataList() {
    const response = yield call(ResetReportDatalist);
    yield put(ResetReportDatalistSuccess(REST_REPORT_DATA_LIST, response)); 
}

function* AdminDashboardSaga() {
  yield takeEvery(GET_DASHBOARD_DATA_LIST, onGetDashboardData);
  yield takeEvery(GET_REPORT_DATA_LIST, onGetReportDatalist);
  yield takeEvery(REST_REPORT_DATA_LIST, onResetReportDataList);
}
export default AdminDashboardSaga;
