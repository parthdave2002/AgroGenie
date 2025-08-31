import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getBannerlistSuccess,
  getBannerlistFail,
  AddBannerlistSuccess,
  AddBannerlistFail,
  DeleteBannerlistSuccess,
  DeleteBannerlistFail,
  ResetBannerlist,
  ResetBannerlistSuccess,
  ResetBannerlistFail
} from "./action";
import {
  GET_BANNER_LIST,
  ADD_BANNER_LIST,
  DELETE_BANNER_LIST,
  REST_BANNER_LIST
} from "./actionType";
import { BannerlistApi, AddBannerlistApi, DelBannerlistApi,} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetBannerList({ payload: requstuser }) {
  try {
    const response = yield call(BannerlistApi, requstuser);
    yield put(getBannerlistSuccess(GET_BANNER_LIST, response));
  } catch (error) {
    yield put(getBannerlistFail(error));
  }
}

function* onAddBannerList({ payload: requstuser }) {
  try {
    const response = yield call(AddBannerlistApi, requstuser);
    yield put(AddBannerlistSuccess(ADD_BANNER_LIST, response));
  } catch (error) {
    yield put(AddBannerlistFail(error));
  }
}

function* onDelBannerList({ payload: requstuser }) {
  try {
    const response = yield call(DelBannerlistApi, requstuser);
    yield put(DeleteBannerlistSuccess(DELETE_BANNER_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(BannerlistApi);
      yield put(getBannerlistSuccess(GET_BANNER_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteBannerlistFail(error));
  }
}

function* onResetBannerList() {
    const response = yield call(ResetBannerlist);
    yield put(ResetBannerlistSuccess(REST_BANNER_LIST, response)); 
}

function* BannerSaga() {
  yield takeEvery(GET_BANNER_LIST, onGetBannerList);
  yield takeEvery(ADD_BANNER_LIST, onAddBannerList);
  yield takeEvery(DELETE_BANNER_LIST, onDelBannerList);
  yield takeEvery(REST_BANNER_LIST, onResetBannerList);
}
export default BannerSaga;
