import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getPackingTypelistSuccess,
  getPackingTypelistFail,

  AddPackingTypelistSuccess,
  AddPackingTypelistFail,

  DeletePackingTypelistSuccess,
  DeletePackingTypelistFail,

  ChangeStatusPackingTypelistSuccess,
  ChangeStatusPackingTypelistFail,

  ResetPackingTypelist,
  ResetPackingTypelistSuccess,
  ResetPackingTypelistFail
} from "./action";
import {
  GET_PACKING_TYPE_LIST,
  ADD_PACKING_TYPE_LIST,
  DELETE_PACKING_TYPE_LIST,
  RESET_PACKING_TYPE_LIST,
  CHANGE_STATUS_PACKING_TYPE_LIST
} from "./actionType";
import { PackingTypelistApi, AddPackingTypelistApi, DelPackingTypelistApi, StatusPackingTypelistApi} from "../../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(PackingTypelistApi, requstuser);
    yield put(getPackingTypelistSuccess(GET_PACKING_TYPE_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getPackingTypelistFail(error));
  }
}

function* onAddPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(AddPackingTypelistApi, requstuser);
    yield put(AddPackingTypelistSuccess(ADD_PACKING_TYPE_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddPackingTypelistFail(error));
  }
}

function* onDelPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(DelPackingTypelistApi, requstuser);
    yield put(DeletePackingTypelistSuccess(DELETE_PACKING_TYPE_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(PackingTypelistApi, requstuser);
      yield put(getPackingTypelistSuccess(GET_PACKING_TYPE_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeletePackingTypelistFail(error));
  }
}


function* onStatusPackingTypeList({ payload: requstuser }) {
  try {
    const response = yield call(StatusPackingTypelistApi, requstuser);
    yield put(ChangeStatusPackingTypelistSuccess(CHANGE_STATUS_PACKING_TYPE_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(PackingTypelistApi, requstuser);
      yield put(getPackingTypelistSuccess(GET_PACKING_TYPE_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangeStatusPackingTypelistFail(error));
  }
}


function* onResetPackingTypeList() {
  const reponse = yield call(ResetPackingTypelist);
  yield put(ResetPackingTypelistSuccess(RESET_PACKING_TYPE_LIST, reponse));
}

function* PackingTypeSaga() {
  yield takeEvery(GET_PACKING_TYPE_LIST, onGetPackingTypeList);
  yield takeEvery(ADD_PACKING_TYPE_LIST, onAddPackingTypeList);
  yield takeEvery(DELETE_PACKING_TYPE_LIST, onDelPackingTypeList);
  yield takeEvery(CHANGE_STATUS_PACKING_TYPE_LIST, onStatusPackingTypeList);
  yield takeEvery(RESET_PACKING_TYPE_LIST, onResetPackingTypeList);
}
export default PackingTypeSaga;
