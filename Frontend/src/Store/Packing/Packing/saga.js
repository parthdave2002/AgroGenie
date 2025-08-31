import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getPackinglistSuccess,
  getPackinglistFail,
  AddPackinglistSuccess,
  AddPackinglistFail,
  DeletePackinglistSuccess,
  DeletePackinglistFail,

  ResetPackinglist,
  ResetPackinglistSuccess,
  ResetPackinglistFail
} from "./action";
import {
  GET_PACKING_LIST,
  ADD_PACKING_LIST,
  DELETE_PACKING_LIST,
  RESET_PACKING_LIST
} from "./actionType";
import { PackinglistApi, AddPackinglistApi, DelPackinglistApi,} from "../../../helper/Demo_helper";

function* onGetPackingList({ payload: requstuser }) {
  try {
    const response = yield call(PackinglistApi, requstuser);
    yield put(getPackinglistSuccess(GET_PACKING_LIST, response));
   
  } catch (error) {
    yield put(getPackinglistFail(error));
  }
}

function* onAddPackingList({ payload: requstuser }) {
  try {
    const response = yield call(AddPackinglistApi, requstuser);
    yield put(AddPackinglistSuccess(ADD_PACKING_LIST, response));
  } catch (error) {
    yield put(AddPackinglistFail(error));
  }
}

function* onDelPackingList({ payload: requstuser }) {
  try {
    const response = yield call(DelPackinglistApi, requstuser);
    yield put(DeletePackinglistSuccess(DELETE_PACKING_LIST, response));

    if(response.success === true || response.success === "true"){
      const newresponse = yield call(PackinglistApi, requstuser);
      yield put(getPackinglistSuccess(GET_PACKING_LIST, newresponse));
    }
    
  } catch (error) {
    yield put(DeletePackinglistFail(error));
  }
}

function* onResetPackingList({ payload: requstuser }) {
  const response = yield call(ResetPackinglist, requstuser);
  yield put(ResetPackinglistSuccess(RESET_PACKING_LIST, response));
}

function* PackingSaga() {
  yield takeEvery(GET_PACKING_LIST, onGetPackingList);
  yield takeEvery(ADD_PACKING_LIST, onAddPackingList);
  yield takeEvery(DELETE_PACKING_LIST, onDelPackingList);
  yield takeEvery(RESET_PACKING_LIST, onResetPackingList);
}
export default PackingSaga;
