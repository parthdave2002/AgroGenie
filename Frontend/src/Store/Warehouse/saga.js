import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getWarehouselistSuccess,
  getWarehouselistFail,
  AddWarehouselistSuccess,
  AddWarehouselistFail,
  DeleteWarehouselistSuccess,
  DeleteWarehouselistFail,
  ResetWarehouselist,
  ResetWarehouselistSuccess,
} from "./action";
import {
  GET_WAREHOUSE_LIST,
  ADD_WAREHOUSE_LIST,
  DELETE_WAREHOUSE_LIST,
  RESET_WAREHOUSE_LIST
} from "./actionType";
import { WarehouselistApi, AddWarehouselistApi, DelWarehouselistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetWarehouselist({ payload: requstuser }) {
  try {
    const response = yield call(WarehouselistApi, requstuser);
    yield put(getWarehouselistSuccess(GET_WAREHOUSE_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getWarehouselistFail(error));
  }
}

function* onAddWarehouselist({ payload: requstuser }) {
  try {
    const response = yield call(AddWarehouselistApi, requstuser);
    yield put(AddWarehouselistSuccess(ADD_WAREHOUSE_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddWarehouselistFail(error));
  }
}

function* onDelWarehouselist({ payload: requstuser }) {
  try {
    const response = yield call(DelWarehouselistApi, requstuser);
    yield put(DeleteWarehouselistSuccess(DELETE_WAREHOUSE_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      let requ ={
        page :1,
        size: 5
      }
      const newresponse = yield call(WarehouselistApi, requ);
      yield put(getWarehouselistSuccess(GET_WAREHOUSE_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteWarehouselistFail(error));
  }
}

function* onResetWarehouselist({ payload: requstuser }) {
    const response = yield call(ResetTestimoniallist);
    yield put(ResetWarehouselistSuccess(RESET_WAREHOUSE_LIST, response));
}

function* WarehouseSaga() {
  yield takeEvery(GET_WAREHOUSE_LIST, onGetWarehouselist);
  yield takeEvery(ADD_WAREHOUSE_LIST, onAddWarehouselist);
  yield takeEvery(DELETE_WAREHOUSE_LIST, onDelWarehouselist);
  yield takeEvery(RESET_WAREHOUSE_LIST, onResetWarehouselist);
}
export default WarehouseSaga;
