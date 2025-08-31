import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getRelatedProductlistSuccess,
  getRelatedProductlistFail,
  getProductlistSuccess,
  getProductlistFail,
  AddProductlistSuccess,
  AddProductlistFail,
  UpdateProductlistSuccess,
  UpdateProductlistFail,
  DeleteProductlistSuccess,
  DeleteProductlistFail,
  ResetProductlist,
  ResetProductlistSuccess,
  ResetProductlistFail,
  GetProductViewlist,
  GetProductViewlistSuccess,
  GetProductViewlistFail
} from "./action";
import {
  GET_RELATED_PRODUCT_LIST,
  GET_PRODUCT_LIST,
  ADD_PRODUCT_LIST,
  UPDATE_PRODUCT_LIST,
  DELETE_PRODUCT_LIST,
  GET_PRODUCT_VIEW_LIST,
  RESET_PRODUCT_LIST
} from "./actionType";
import { RelatedProductlistApi,ProductlistApi,  AddProductlistApi, DelProductlistApi, UpdateProductApi,  DetailProductlistApi} from "../../helper/Demo_helper";
import { toast } from "react-toastify";


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

function* onAddProductlist({ payload: requstuser }) {
  try {
    const response = yield call(AddProductlistApi, requstuser);
    yield put(AddProductlistSuccess(ADD_PRODUCT_LIST, response));
  } catch (error) {
    toast.error(error?.msg)
    yield put(AddProductlistFail(error));
  }
}

function* onUpdateProductlist({ payload: requstuser }) {
  try {
    const response = yield call(UpdateProductApi, requstuser);
    yield put(UpdateProductlistSuccess(UPDATE_PRODUCT_LIST, response));
    if(response.success === true || response.success === "true"){
      const newresponse = yield call(ProductlistApi);
      yield put(getProductlistSuccess(GET_PRODUCT_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg)
    yield put(UpdateProductlistFail(error));
  }
}

function* onDelProductList({ payload: requstuser }) {
  try {
    const response = yield call(DelProductlistApi, requstuser);
    yield put(DeleteProductlistSuccess(DELETE_PRODUCT_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(ProductlistApi);
      yield put(getProductlistSuccess(GET_PRODUCT_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteProductlistFail(error));
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
  yield takeEvery(ADD_PRODUCT_LIST, onAddProductlist);
  yield takeEvery(UPDATE_PRODUCT_LIST, onUpdateProductlist);
  yield takeEvery(DELETE_PRODUCT_LIST, onDelProductList);
  yield takeEvery(RESET_PRODUCT_LIST, onResetProductList);
  yield takeEvery(GET_PRODUCT_VIEW_LIST, onGetProductViewList);
}
export default ProductSaga;
