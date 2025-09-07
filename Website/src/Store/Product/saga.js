import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getRelatedProductlistSuccess,
  getRelatedProductlistFail,
  getProductlistSuccess,
  getProductlistFail,
  ResetProductlist,
  ResetProductlistSuccess,
  GetProductViewlistSuccess,
  GetProductViewlistFail
} from "./action";
import {
  GET_RELATED_PRODUCT_LIST,
  GET_PRODUCT_LIST,
  GET_PRODUCT_VIEW_LIST,
  RESET_PRODUCT_LIST
} from "./actionType";
import { RelatedProductlistApi,ProductlistApi, DetailProductlistApi} from "../../helper/Demo_helper";

function* onGetRelatedProductList({ payload: requstuser }) {
  try {
    const response = yield call(RelatedProductlistApi, requstuser);
    yield put(getRelatedProductlistSuccess(GET_RELATED_PRODUCT_LIST, response));
  } catch (error) {
    yield put(getRelatedProductlistFail(error));
  }
}

function* onGetProductList({ payload: requstuser }) {
  try {
    const response = yield call(ProductlistApi, requstuser);
    yield put(getProductlistSuccess(GET_PRODUCT_LIST, response));
  } catch (error) {
    yield put(getProductlistFail(error));
  }
}

function* onResetProductList() {
  const response = yield call(ResetProductlist);
  yield put(ResetProductlistSuccess(RESET_PRODUCT_LIST, response));
}

function* onGetProductViewList({ payload: requstuser }) {
  try {
    const response = yield call(DetailProductlistApi, requstuser);
    yield put(GetProductViewlistSuccess(GET_PRODUCT_VIEW_LIST, response));
  } catch (error) {
    yield put(GetProductViewlistFail(error));
  }
}

function* ProductSaga() {
  yield takeEvery(GET_RELATED_PRODUCT_LIST, onGetRelatedProductList);
  yield takeEvery(GET_PRODUCT_LIST, onGetProductList);
  yield takeEvery(RESET_PRODUCT_LIST, onResetProductList);
  yield takeEvery(GET_PRODUCT_VIEW_LIST, onGetProductViewList);
}
export default ProductSaga;
