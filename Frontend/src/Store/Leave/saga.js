import { call, put, takeEvery } from "redux-saga/effects";
import {
  getleavelistSuccess,
  getleavelistFail,
  changeleavestatuslistSuccess,
  changeleavestatuslistFail,
  addleavelistSuccess,
  addleavelistFail,
  getleavemanagemenetlistSuccess,
  getleavemanagemenetlistFail,
  addleavemanagementlistSuccess,
  addleavemanagementlistFail,
  changeleavestatusmanagementlistSuccess,
  changeleavestatusmanagementlistFail,
  resetleavelistmanagement,
  resetleavelistmanagementSuccess
} from "./action";
import {
  GET_LEAVE_LIST,
  ADD_LEAVE_LIST,
  GET_CHANGE_LEAVE_STATUS,
  RESET_LEAVE_MANAGEMENT_LIST,
  GET_CHANGE_LEAVE_MANAGEMENT_STATUS,
  ADD_LEAVE_MANAGEMENT_LIST,
  GET_LEAVE_MANAGEMENT_LIST,
} from "./actionType";
import {
  LeavelistApi,
  ChangeLeavelistApi,
  AdddLeavelistApi,
  LeaveManagementlistApi,
  AdddLeaveManagementlistApi,
  ChangeLeaveManagementlistApi,
} from "../../helper/Demo_helper";

function* ongetleavelist({ payload: requstuser }) {
  try {
    const response = yield call(LeavelistApi, requstuser);
    yield put(getleavelistSuccess(GET_LEAVE_LIST, response));
  } catch (error) {
    yield put(getleavelistFail(error));
  }
}

function* ongetAddleavelist({ payload: requstuser }) {
  try {
    const response = yield call(AdddLeavelistApi, requstuser);

    if (response?.success === true || response?.success === "true") {
      const response = yield call(LeavelistApi);
      yield put(getleavelistSuccess(GET_LEAVE_LIST, response));
    }

    yield put(addleavelistSuccess(ADD_LEAVE_LIST, response));
  } catch (error) {
    yield put(addleavelistFail(error));
  }
}

function* ongetChangeleavelist({ payload: requstuser }) {
  try {
    const response = yield call(ChangeLeavelistApi, requstuser);

    if (response?.success === true || response?.success === "true") {
      const response = yield call(LeavelistApi);
      yield put(getleavelistSuccess(GET_LEAVE_LIST, response));
    }
    yield put(changeleavestatuslistSuccess(GET_CHANGE_LEAVE_STATUS, response));
  } catch (error) {
    yield put(changeleavestatuslistFail(error));
  }
}

function* ongetleavemanagementlist({ payload: requstuser }) {
  try {
    const response = yield call(LeaveManagementlistApi, requstuser);
    yield put(getleavemanagemenetlistSuccess(GET_LEAVE_MANAGEMENT_LIST, response),);
  } catch (error) {
    yield put(getleavemanagemenetlistFail(error));
  }
}

function* ongetAddleavemanagementlist({ payload: requstuser }) {
  try {
    const response = yield call(AdddLeaveManagementlistApi, requstuser);
    if (response?.success === true || response?.success === "true") {
      const response = yield call(LeaveManagementlistApi);
      yield put(getleavemanagemenetlistSuccess(GET_LEAVE_MANAGEMENT_LIST, response), );
    }
    yield put(addleavemanagementlistSuccess(ADD_LEAVE_MANAGEMENT_LIST, response),);
  } catch (error) {
    yield put(addleavemanagementlistFail(error));
  }
}

function* ongetChangeleavemanagementlist({ payload: requstuser }) {
  try {
    const response = yield call(ChangeLeaveManagementlistApi, requstuser);
    if (response?.success === true || response?.success === "true") {
      const response = yield call(LeaveManagementlistApi);
      yield put(getleavemanagemenetlistSuccess(GET_LEAVE_MANAGEMENT_LIST, response),);
    }
    yield put(changeleavestatusmanagementlistSuccess( GET_CHANGE_LEAVE_MANAGEMENT_STATUS,response,),);
  } catch (error) {
    yield put(changeleavestatusmanagementlistFail(error));
  }
}

function* ongetresetleavemanagementlist({ payload: requstuser }) {
  const response = yield call(resetleavelistmanagement);
  yield put(resetleavelistmanagementSuccess(RESET_LEAVE_MANAGEMENT_LIST, response));
}

function* LeaveSaga() {
  yield takeEvery(GET_LEAVE_LIST, ongetleavelist);
  yield takeEvery(ADD_LEAVE_LIST, ongetAddleavelist);
  yield takeEvery(GET_CHANGE_LEAVE_STATUS, ongetChangeleavelist);

  yield takeEvery(GET_LEAVE_MANAGEMENT_LIST, ongetleavemanagementlist);
  yield takeEvery(ADD_LEAVE_MANAGEMENT_LIST, ongetAddleavemanagementlist);
  yield takeEvery(GET_CHANGE_LEAVE_MANAGEMENT_STATUS, ongetChangeleavemanagementlist,);
  yield takeEvery(RESET_LEAVE_MANAGEMENT_LIST, ongetresetleavemanagementlist);
}
export default LeaveSaga;
