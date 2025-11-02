import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getTestimoniallistSuccess,
  getTestimoniallistFail,
  AddTestimoniallistSuccess,
  AddTestimoniallistFail,
  DeleteTestimoniallistSuccess,
  DeleteTestimoniallistFail,
  ResetTestimoniallist,
  ResetTestimoniallistSuccess,
} from "./action";
import {
  GET_TESTIMONIAL_LIST,
  ADD_TESTIMONIAL_LIST,
  DELETE_TESTIMONIAL_LIST,
  RESET_TESTIMONIAL_LIST
} from "./actionType";
import { TestimoniallistApi, AddTestimoniallistApi, DelTestimoniallistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetTestimonialList({ payload: requstuser }) {
  try {
    const response = yield call(TestimoniallistApi, requstuser);
    yield put(getTestimoniallistSuccess(GET_TESTIMONIAL_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getTestimoniallistFail(error));
  }
}

function* onAddTestimonialList({ payload: requstuser }) {
  try {
    const response = yield call(AddTestimoniallistApi, requstuser);
    yield put(AddTestimoniallistSuccess(ADD_TESTIMONIAL_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddTestimoniallistFail(error));
  }
}

function* onDelTestimonialList({ payload: requstuser }) {
  try {
    const response = yield call(DelTestimoniallistApi, requstuser);
    yield put(DeleteTestimoniallistSuccess(DELETE_TESTIMONIAL_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      let requ ={
        page :1,
        size: 5
      }
      const newresponse = yield call(TestimoniallistApi, requ);
      yield put(getTestimoniallistSuccess(GET_TESTIMONIAL_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteTestimoniallistFail(error));
  }
}

function* onResetTestimonialList({ payload: requstuser }) {
    const response = yield call(ResetTestimoniallist);
    yield put(ResetTestimoniallistSuccess(RESET_TESTIMONIAL_LIST, response));
}

function* TestimonialSaga() {
  yield takeEvery(GET_TESTIMONIAL_LIST, onGetTestimonialList);
  yield takeEvery(ADD_TESTIMONIAL_LIST, onAddTestimonialList);
  yield takeEvery(DELETE_TESTIMONIAL_LIST, onDelTestimonialList);
  yield takeEvery(RESET_TESTIMONIAL_LIST, onResetTestimonialList);
}
export default TestimonialSaga;
