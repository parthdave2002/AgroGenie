import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getUpdateOrderlistSuccess,
  getUpdateOrderlistFail,
  getOrderlistSuccess,
  getOrderlistFail,
  AddOrderlistSuccess,
  AddOrderlistFail,
  DeleteOrderlistSuccess,
  DeleteOrderlistFail,
  getOrderlistDetailsSuccess,
  getOrderlistDetailsFail,
  ResetOrderlist,
  ResetOrderlistSuccess,
  getFarmerOrderlistSuccess,
  getFarmerOrderlistFail,
  getSalesExecutiveOrderlistSuccess,
  getSalesExecutiveOrderlistFail,
  ReturnOrderlistSuccess,
  ReturnOrderlistFail
} from "./action";
import {
  GET_UPDATE_ORDER_LIST,
  GET_ORDER_LIST,
  GET_FARMER_ORDER_LIST,
  GET_SALES_EXECUTIVE_ORDER_LIST,
  ADD_ORDER_LIST,
  DELETE_ORDER_LIST,
  RESET_ORDER_LIST,
  GET_ORDER_DETAILS_LIST,
  RETURN_ORDER_LIST
} from "./actionType";
import { UpdateOrderlistApi,OrderlistApi, AddOrderlistApi, DelOrderlistApi, ReturnOrderlistApi, OrderDetaillistApi, FermerOrderlistApi, SalesOrderlistApi} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetUpdateOrderList({ payload: requstuser }) {
  try {
    const response = yield call(UpdateOrderlistApi, requstuser);
    yield put(getUpdateOrderlistSuccess(GET_UPDATE_ORDER_LIST, response));
  } catch (error) {
    toast.error(error?.msg)
    yield put(getUpdateOrderlistFail(error));
  }
}

function* onGetOrderList({ payload: requstuser }) {
  try {
    const response = yield call(OrderlistApi, requstuser);
    yield put(getOrderlistSuccess(GET_ORDER_LIST, response));
  } catch (error) {
    yield put(getOrderlistFail(error));
  }
}

function* onGetSalesOrderList({ payload: requstuser }) {
  try {
    const response = yield call(SalesOrderlistApi, requstuser);
    yield put(getSalesExecutiveOrderlistSuccess(GET_SALES_EXECUTIVE_ORDER_LIST, response));
  } catch (error) {
    yield put(getSalesExecutiveOrderlistFail(error));
  }
}

function* onGetFarmerOrderList({ payload: requstuser }) {
  try {
    const response = yield call(FermerOrderlistApi, requstuser);
    yield put(getFarmerOrderlistSuccess(GET_FARMER_ORDER_LIST, response));
  } catch (error) {
    yield put(getFarmerOrderlistFail(error));
  }
}

function* onGetDetailsOrderList({ payload: requstuser }) {
  try {
    const response = yield call(OrderDetaillistApi, requstuser);
    yield put(getOrderlistDetailsSuccess(GET_ORDER_DETAILS_LIST, response));
  } catch (error) {
    yield put(getOrderlistDetailsFail(error));
  }
}

function* onAddOrderlist({ payload: requstuser }) {
  try {
    const response = yield call(AddOrderlistApi, requstuser);
    yield put(AddOrderlistSuccess(ADD_ORDER_LIST, response));
  } catch (error) {
    toast.error(error?.msg)
    yield put(AddOrderlistFail(error));
  }
}

function* onDelOrderList({ payload: requstuser }) {
  try {
    const response = yield call(DelOrderlistApi, requstuser);
    yield put(DeleteOrderlistSuccess(DELETE_ORDER_LIST, response));

    if(response.success === true || response.success === "true"){
      const response = yield call(OrderlistApi);
      yield put(getOrderlistSuccess(GET_ORDER_LIST, response));
    }
  } catch (error) {
    yield put(DeleteOrderlistFail(error));
  }
}

function* onResetOrderList() {
    const response = yield call(ResetOrderlist);
    yield put(ResetOrderlistSuccess(RESET_ORDER_LIST, response)); 
}

function* onGetRetunOrderList({ payload: requstuser }) {
  try {
    const response = yield call(ReturnOrderlistApi, requstuser);
    yield put(ReturnOrderlistSuccess(RETURN_ORDER_LIST, response));
      if(response.success === true || response.success === "true"){
        let data ={ returnOrder : true }
        const response = yield call(OrderlistApi ,data);
        yield put(getOrderlistSuccess(GET_ORDER_LIST, response));
      }
  } catch (error) {
    yield put(ReturnOrderlistFail(error));
  }
}


function* OrderSaga() {
  yield takeEvery(GET_UPDATE_ORDER_LIST, onGetUpdateOrderList);
  yield takeEvery(GET_ORDER_LIST, onGetOrderList);
  yield takeEvery(ADD_ORDER_LIST, onAddOrderlist);
  yield takeEvery(DELETE_ORDER_LIST, onDelOrderList);
  yield takeEvery(GET_ORDER_DETAILS_LIST, onGetDetailsOrderList);
  yield takeEvery(RESET_ORDER_LIST, onResetOrderList);
  yield takeEvery(GET_FARMER_ORDER_LIST, onGetFarmerOrderList);
  yield takeEvery(GET_SALES_EXECUTIVE_ORDER_LIST, onGetSalesOrderList);
  yield takeEvery(RETURN_ORDER_LIST, onGetRetunOrderList);
}
export default OrderSaga;
