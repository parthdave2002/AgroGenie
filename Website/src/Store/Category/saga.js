import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getCategorylistSuccess, getCategorylistFail } from "./action";
import { GET_CATEGORY_LIST } from "./actionType";
import { CategorylistApi } from "../../helper/Demo_helper";
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

function* CategorySaga() {
  yield takeEvery(GET_CATEGORY_LIST, onGetCategoryList);
}
export default CategorySaga;
