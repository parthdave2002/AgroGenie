import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getleadlistSuccess,
  getleadlistFail,
  AddLeadlistSuccess,
  AddLeadlistFail,
  MarkasReadLeadlistSuccess,
  MarkasReadLeadlistFail,
  DeleteleadlistSuccess,
  DeleteleadlistFail,
  ResetLeadlist,
  ResetLeadlistSuccess,
} from "./action";
import {
  GET_LEAD_LIST,
  ADD_LEAD_LIST,
  MARK_AS_READ_LEAD_LIST,
  DELETE_LEAD_LIST,
  RESET_LEAD_LIST
} from "./actionType";
import { LeadlistApi, AddLeadlistApi,MarkAsReadLeadlistApi,  DelLeadlistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* ongetLeadlist({ payload: requstuser }) {
  try {
    const response = yield call(LeadlistApi, requstuser);
    yield put(getleadlistSuccess(GET_LEAD_LIST, response));
  } catch (error) {
    yield put(getleadlistFail(error));
  }
}

function* onAddLeadlist({ payload: requstuser }) {
  try {
    const response = yield call(AddLeadlistApi, requstuser);
    yield put(AddLeadlistSuccess(ADD_LEAD_LIST, response));
  } catch (error) {
    yield put(AddLeadlistFail(error));
  }
}

function* onMarkLeadlist({ payload: requstuser }) {
  try {
    const response = yield call(MarkAsReadLeadlistApi, requstuser);
    yield put(MarkasReadLeadlistSuccess(MARK_AS_READ_LEAD_LIST, response));
      toast.success(response?.msg);
      if(response.success === true || response.success === "true"){
        const newresponse = yield call(LeadlistApi({ type :"order", page:1, size : 5 }));
        yield put(getleadlistSuccess(GET_LEAD_LIST, newresponse));
      }
  } catch (error) {
    toast.error(error)
    yield put(MarkasReadLeadlistFail(error));
  }
}

function* onDelCropList({ payload: requstuser }) {
  try {
    const response = yield call(DelLeadlistApi, requstuser);
    yield put(DeleteleadlistSuccess(DELETE_LEAD_LIST, response));
     
    if(response.success === true || response.success === "true"){
      const newresponse = yield call(LeadlistApi);
      yield put(getleadlistSuccess(GET_LEAD_LIST, newresponse));
    }
  } catch (error) {
    yield put(DeleteleadlistFail(error));
  }
}

function* onResetLeadlist() {
    const response = yield call(ResetLeadlist);
    yield put(ResetLeadlistSuccess(RESET_LEAD_LIST, response));
}

function* LeadSaga() {
  yield takeEvery(GET_LEAD_LIST, ongetLeadlist);
  yield takeEvery(ADD_LEAD_LIST, onAddLeadlist);
  yield takeEvery(MARK_AS_READ_LEAD_LIST, onMarkLeadlist);
  yield takeEvery(DELETE_LEAD_LIST, onDelCropList);
  yield takeEvery(RESET_LEAD_LIST, onResetLeadlist);
}
export default LeadSaga;