import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getNoticeBoardlistSuccess,
  getNoticeBoardlistFail,
  AddNoticeBoardlistSuccess,
  AddNoticeBoardlistFail,
  DeleteNoticeBoardlistSuccess,
  DeleteNoticeBoardlistFail,
  ResetNoticeBoardlist,
  ResetNoticeBoardlistSuccess,
} from "./action";
import {
  GET_NOTICE_BOARD_LIST,
  ADD_NOTICE_BOARD_LIST,
  DELETE_NOTICE_BOARD_LIST,
  RESET_NOTICE_BOARD_LIST
} from "./actionType";
import { NoticeBoardlistApi, AddNoticeBoardlistApi, DelNoticeBoardlistApi} from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetNoticeBoardList({ payload: requstuser }) {
  try {
    const response = yield call(NoticeBoardlistApi, requstuser);
    yield put(getNoticeBoardlistSuccess(GET_NOTICE_BOARD_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getNoticeBoardlistFail(error));
  }
}

function* onAddNoticeBoardList({ payload: requstuser }) {
  try {
    const response = yield call(AddNoticeBoardlistApi, requstuser);
    yield put(AddNoticeBoardlistSuccess(ADD_NOTICE_BOARD_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const response = yield call(NoticeBoardlistApi, requstuser);
      yield put(getNoticeBoardlistSuccess(GET_NOTICE_BOARD_LIST, response));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddNoticeBoardlistFail(error));
  }
}

function* onDelNoticeBoardList({ payload: requstuser }) {
  try {
    const response = yield call(DelNoticeBoardlistApi, requstuser);
    yield put(DeleteNoticeBoardlistSuccess(DELETE_NOTICE_BOARD_LIST, response));
     
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
        const response = yield call(NoticeBoardlistApi, requstuser);
        yield put(getNoticeBoardlistSuccess(GET_NOTICE_BOARD_LIST, response));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteNoticeBoardlistFail(error));
  }
}

function* onResetNoticeBoardList({ payload: requstuser }) {
    const response = yield call(ResetNoticeBoardlist);
    yield put(ResetNoticeBoardlistSuccess(RESET_NOTICE_BOARD_LIST, response));
}

function* NoficeBoardSaga() {
  yield takeEvery(GET_NOTICE_BOARD_LIST, onGetNoticeBoardList);
  yield takeEvery(ADD_NOTICE_BOARD_LIST, onAddNoticeBoardList);
  yield takeEvery(DELETE_NOTICE_BOARD_LIST, onDelNoticeBoardList);
  yield takeEvery(RESET_NOTICE_BOARD_LIST, onResetNoticeBoardList);
}
export default NoficeBoardSaga;
