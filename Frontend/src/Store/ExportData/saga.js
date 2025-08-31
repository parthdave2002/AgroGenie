import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getExportDatalistSuccess,
  getExportDatalistFail,

  ResetExportDatalist,
  ResetExportDatalistSuccess,
} from "./action";
import {
  GET_EXPORT_DATA_LIST,
  RESET_EXPORT_DATA_LIST
} from "./actionType";
import { ExportDatalistApi } from "../../helper/Demo_helper";

function* onGetExportDatalist({ payload: requstuser, name }) {
  try {
    const response = yield call(ExportDatalistApi, requstuser,name);
    yield put(getExportDatalistSuccess(GET_EXPORT_DATA_LIST, response));
  } catch (error) {
    yield put(getExportDatalistFail(error));
  }
}

function* onRestetExportList() {
    const response = yield call(ResetExportDatalist);
    yield put(ResetExportDatalistSuccess(RESET_EXPORT_DATA_LIST, response)); 
}

function* ExportDataSaga() {
  yield takeEvery(GET_EXPORT_DATA_LIST, onGetExportDatalist);
  yield takeEvery(RESET_EXPORT_DATA_LIST, onRestetExportList);
}
export default ExportDataSaga;
