import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCategorylistSuccess,
  getCategorylistFail,
  AddCategorylistSuccess,
  AddCategorylistFail,
  DeleteCategorylistSuccess,
  DeleteCategorylistFail,
  ResetCategorylist,
  ResetCategorylistSuccess,
  ResetCategorylistFail,
  ChangeStatusCategorylistFail,
  ChangeStatusCategorylistSuccess
} from "./action";
import {
  GET_CATEGORY_LIST,
  ADD_CATEGORY_LIST,
  CHANGE_STATUS_CATEGORY_LIST,
  DELETE_CATEGORY_LIST,
  RESET_CATEGORY_LIST
} from "./actionType";
import { CategorylistApi, AddCategorylistApi, DelCategorylistApi, StatusCategorylistApi,} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(CategorylistApi, requstuser);
    yield put(getCategorylistSuccess(GET_CATEGORY_LIST, response));
  } catch (error) {
    toast.error(error?.msg)
    yield put(getCategorylistFail(error));
  }
}

function* onAddCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(AddCategorylistApi, requstuser);
    yield put(AddCategorylistSuccess(ADD_CATEGORY_LIST, response));
  } catch (error) {
    toast.error(error?.msg)
    yield put(AddCategorylistFail(error));
  }
}

function* onDelCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(DelCategorylistApi, requstuser);
    yield put(DeleteCategorylistSuccess(DELETE_CATEGORY_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      let requstuserdata={
        page: 1,
        size: 5
      }
      const newresponse = yield call(CategorylistApi, requstuserdata);
      yield put(getCategorylistSuccess(GET_CATEGORY_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg)
    yield put(DeleteCategorylistFail(error));
  }
}

function* onStatusCategoryList({ payload: requstuser }) {
  try {
    const response = yield call(StatusCategorylistApi, requstuser);
    yield put(ChangeStatusCategorylistSuccess(CHANGE_STATUS_CATEGORY_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(CategorylistApi);
      yield put(getCategorylistSuccess(GET_CATEGORY_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg)
    yield put(ChangeStatusCategorylistFail(error));
  }
}

function* onResetCategoryList({ payload: requstuser }) {
    const response = yield call(ResetCategorylist);
    yield put(ResetCategorylistSuccess(RESET_CATEGORY_LIST, response));
}

function* CategorySaga() {
  yield takeEvery(GET_CATEGORY_LIST, onGetCategoryList);
  yield takeEvery(ADD_CATEGORY_LIST, onAddCategoryList);
  yield takeEvery(CHANGE_STATUS_CATEGORY_LIST, onStatusCategoryList);
  yield takeEvery(DELETE_CATEGORY_LIST, onDelCategoryList);
  yield takeEvery(RESET_CATEGORY_LIST, onResetCategoryList);
}
export default CategorySaga;
