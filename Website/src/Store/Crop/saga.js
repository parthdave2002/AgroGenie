import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getCroplistSuccess, getCroplistFail } from "./action";
import { GET_CROP_LIST } from "./actionType";
import { CroplistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCropList({ payload: requstuser }) {
  try {
    const response = yield call(CroplistApi, requstuser);
    yield put(getCroplistSuccess(GET_CROP_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getCroplistFail(error));
  }
}

function* CropSaga() {
  yield takeEvery(GET_CROP_LIST, onGetCropList);
}
export default CropSaga;
