import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getBannerlistSuccess, getBannerlistFail } from "./action";
import {GET_BANNER_LIST} from "./actionType";
import { BannerlistApi} from "../../helper/Demo_helper";

function* onGetBannerList({ payload: requstuser }) {
  try {
    const response = yield call(BannerlistApi, requstuser);
    yield put(getBannerlistSuccess(GET_BANNER_LIST, response));
  } catch (error) {
    yield put(getBannerlistFail(error));
  }
}

function* BannerSaga() {
  yield takeEvery(GET_BANNER_LIST, onGetBannerList);
}
export default BannerSaga;