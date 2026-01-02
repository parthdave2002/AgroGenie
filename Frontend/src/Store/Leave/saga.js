import { call, put, takeEvery } from "redux-saga/effects";
import { getleavelistSuccess, getleavelistFail, changeleavestatuslistSuccess, changeleavestatuslistFail, addleavelistSuccess, addleavelistFail } from "./action";
import { GET_LEAVE_LIST, ADD_LEAVE_LIST, GET_CHANGE_LEAVE_STATUS } from "./actionType";
import { LeavelistApi, ChangeLeavelistApi, AdddLeavelistApi } from "../../helper/Demo_helper";

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

    if(response?.success === true || response?.success === "true"){
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
    
    if(response?.success === true || response?.success === "true"){
      const response = yield call(LeavelistApi);
      yield put(getleavelistSuccess(GET_LEAVE_LIST, response));
    }
    yield put(changeleavestatuslistSuccess(GET_CHANGE_LEAVE_STATUS, response));
  } catch (error) {
    yield put(changeleavestatuslistFail(error));
  }
}

function* LeaveSaga() {
  yield takeEvery(GET_LEAVE_LIST, ongetleavelist);
  yield takeEvery(ADD_LEAVE_LIST, ongetAddleavelist);
  yield takeEvery(GET_CHANGE_LEAVE_STATUS, ongetChangeleavelist);

}
export default LeaveSaga;