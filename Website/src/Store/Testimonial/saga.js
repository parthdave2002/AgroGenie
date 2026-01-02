import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getTestimoniallistSuccess, getTestimoniallistFail } from "./action";
import {GET_TESTIMONIAL_LIST} from "./actionType";
import { TestimoniallistApi} from "../../helper/Demo_helper";

function* ongetTestimoniallist({ payload: requstuser }) {
  try {
    const response = yield call(TestimoniallistApi, requstuser);
    yield put(getTestimoniallistSuccess(GET_TESTIMONIAL_LIST, response));
  } catch (error) {
    yield put(getTestimoniallistFail(error));
  }
}

function* TestimonialSaga() {
  yield takeEvery(GET_TESTIMONIAL_LIST, ongetTestimoniallist);
}
export default TestimonialSaga;