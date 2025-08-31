import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getTagloglistSuccess,
  getTagloglistFail,
  AddTagloglistSuccess,
  AddTagloglistFail,
  DeleteTagloglistSuccess,
  DeleteTagloglistFail,
  ResetTagloglist,
  ResetTagloglistSuccess,
  ChangeStatusTagloglistSuccess,
  ChangeStatusTagloglistFail,
  getSubTagloglistSuccess,
  getSubTagloglistFail,
  AddSubTagloglistSuccess,
  AddSubTagloglistFail,
  DeleteSubTagloglistSuccess,
  DeleteSubTagloglistFail,
  ChangeStatusSubTagloglistSuccess,
  ChangeStatusSubTagloglistFail,
  getCustomerTagloglistSuccess,
  getCustomerTagloglistFail,
  AddCustomerTagloglistSuccess,
  AddCustomerTagloglistFail
} from "./action";
import {
  GET_TAGLOG_LIST,
  ADD_TAGLOG_LIST,
  CHANGE_STATUS_TAGLOG_LIST,
  DELETE_TAGLOG_LIST,
  GET_SUB_TAGLOG_LIST,
  ADD_SUB_TAGLOG_LIST,
  CHANGE_STATUS_SUB_TAGLOG_LIST,
  DELETE_SUB_TAGLOG_LIST,
  GET_CUSTOMER_TAGLOG_LIST,
  ADD_CUSTOMER_TAGLOG_LIST,
  REST_TAGLOG_LIST
} from "./actionType";
import { TagloglistApi, AddTagloglistApi, DelTagloglistApi, StatusTagloglistApi,  SubTagloglistApi,  AddSubTagloglistApi,  DelSubTagloglistApi,  StatusSubTagloglistApi, CustomerTagloglistApi, AddCustomerTagloglistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(TagloglistApi, requstuser);
    yield put(getTagloglistSuccess(GET_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getTagloglistFail(error));
  }
}

function* onAddTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(AddTagloglistApi, requstuser);
    yield put(AddTagloglistSuccess(ADD_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddTagloglistFail(error));
  }
}

function* onDelTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(DelTagloglistApi, requstuser);
    yield put(DeleteTagloglistSuccess(DELETE_TAGLOG_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
      const newresponse = yield call(TagloglistApi);
      yield put(getTagloglistSuccess(GET_TAGLOG_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteTagloglistFail(error));
  }
}

function* onStatusTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(StatusTagloglistApi, requstuser);
    yield put(ChangeStatusTagloglistSuccess(CHANGE_STATUS_TAGLOG_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
      const newresponse = yield call(TagloglistApi);
      yield put(getTagloglistSuccess(GET_TAGLOG_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangeStatusTagloglistFail(error));
  }
}

function* onGetSubTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(SubTagloglistApi, requstuser);
    yield put(getSubTagloglistSuccess(GET_SUB_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getSubTagloglistFail(error));
  }
}

function* onAddSubTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(AddSubTagloglistApi, requstuser);
    yield put(AddSubTagloglistSuccess(ADD_SUB_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddSubTagloglistFail(error));
  }
}

function* onDelSubTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(DelSubTagloglistApi, requstuser);
    yield put(DeleteSubTagloglistSuccess(DELETE_SUB_TAGLOG_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
       let data= {
        id :  requstuser?.taglog_id,
        page: 1,
        size: 10
      }
       const responsedata = yield call(SubTagloglistApi, data);
       yield put(getSubTagloglistSuccess(GET_SUB_TAGLOG_LIST, responsedata));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteSubTagloglistFail(error));
  }
}

function* onStatusSubTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(StatusSubTagloglistApi, requstuser);
    yield put(ChangeStatusSubTagloglistSuccess(CHANGE_STATUS_TAGLOG_LIST, response));
    if(response?.success === true || response?.success === "true"){
      toast.success(response?.msg);
      let data= {
        id :  requstuser?.taglog_id,
        page: 1,
        size: 10
      }
       const responsedata = yield call(SubTagloglistApi, data);
       yield put(getSubTagloglistSuccess(GET_SUB_TAGLOG_LIST, responsedata));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangeStatusSubTagloglistFail(error));
  }
}

function* onGetCustomerTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(CustomerTagloglistApi, requstuser);
    yield put(getCustomerTagloglistSuccess(GET_CUSTOMER_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getCustomerTagloglistFail(error));
  }
}

function* onAddCustomerTaglogList({ payload: requstuser }) {
  try {
    const response = yield call(AddCustomerTagloglistApi, requstuser);
    yield put(AddCustomerTagloglistSuccess(ADD_CUSTOMER_TAGLOG_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddCustomerTagloglistFail(error));
  }
}

function* onResetTaglogList() {
    const response = yield call(ResetTagloglist);
    yield put(ResetTagloglistSuccess(REST_TAGLOG_LIST, response)); 
}

function* TaglogSaga() {
  yield takeEvery(GET_TAGLOG_LIST, onGetTaglogList);
  yield takeEvery(ADD_TAGLOG_LIST, onAddTaglogList);
  yield takeEvery(CHANGE_STATUS_TAGLOG_LIST, onStatusTaglogList);
  yield takeEvery(DELETE_TAGLOG_LIST, onDelTaglogList);

  yield takeEvery(GET_SUB_TAGLOG_LIST, onGetSubTaglogList);
  yield takeEvery(ADD_SUB_TAGLOG_LIST, onAddSubTaglogList);
  yield takeEvery(CHANGE_STATUS_SUB_TAGLOG_LIST, onStatusSubTaglogList);
  yield takeEvery(DELETE_SUB_TAGLOG_LIST, onDelSubTaglogList);

  yield takeEvery(GET_CUSTOMER_TAGLOG_LIST, onGetCustomerTaglogList);
  yield takeEvery(ADD_CUSTOMER_TAGLOG_LIST, onAddCustomerTaglogList);

  yield takeEvery(REST_TAGLOG_LIST, onResetTaglogList);
}
export default TaglogSaga;
