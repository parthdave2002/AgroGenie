import { call, put, takeEvery } from "redux-saga/effects";
import { ToastContainer, toast } from "react-toastify";
import {
  getUserlist,
  getUserlistSuccess,
  getUserlistFail,

  getUserView,
  getUserViewSuccess,
  getUserViewFail,

  AddUserlist,
  AddUserlistSuccess,
  AddUserlistFail,

  DeleteUserlist,
  DeleteUserlistSuccess,
  DeleteUserlistFail,

  UpdateUserdatalist,
  UpdateUserdatalistSuccess,
  UpdateUserdatalistFail,

  ResetUserdatalist,
  ResetUserdatalistSuccess,

  CheckUserdatalist,
  CheckUserdatalistSuccess,
  CheckUserdatalistFail,

  ProfileUserdatalist,
  ProfileUserdatalistSuccess,
  ProfileUserdatalistFail,

  UpdateProfileUserdatalist,
  UpdateProfileUserdatalistSuccess,
  UpdateProfileUserdatalistFail
} from "./action";
import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,

  GET_USER_VIEW,
  GET_USER_VIEW_ERROR,
  GET_USER_VIEW_SUCCESS,

  ADD_USER_LIST,
  ADD_USER_LIST_ERROR,
  ADD_USER_LIST_SUCCESS,

  DELETE_USER_LIST,
  DELETE_USER_LIST_ERROR,
  DELETE_USER_LIST_SUCCESS,

  UPDATE_USER_DATA_LIST,
  UPDATE_USER_DATA_LIST_ERROR,
  UPDATE_USER_DATA_LIST_SUCCESS,

  RESET_USER_DATA_LIST,
  RESET_USER_DATA_LIST_SUCCESS,
  RESET_USER_DATA_LIST_ERROR,

  CHECK_USER_LIST,
  CHECK_USER_LIST_ERROR,
  CHECK_USER_LIST_SUCCESS,

  GET_PROFILE_DATA_LIST,
  GET_PROFILE_DATA_LIST_SUCCESS,
  GET_PROFILE_DATA_LIST_ERROR,

  UPDATE_PROFILE_DATA_LIST,
  UPDATE_PROFILE_DATA_LIST_SUCCESS,
  UPDATE_PROFILE_DATA_LIST_ERROR
} from "./actionType";
import {
  UserlistApi,
  RolelistApi,
  UserlistViewApi,
  AddUserlistApi,
  DelUserlistApi,
  UpdateUserdatalistApi,
  CheckUserdatalistApi,
  profileUserdatalistApi,
  updateprofileUserdatalistApi
} from "../../helper/Demo_helper";

function* onGetuserList({ payload: requstuserlist }) {
  try {
    const reponse = yield call(UserlistApi, requstuserlist);
    yield put(getUserlistSuccess(GET_USER_LIST, reponse));
  } catch (error) {
    yield put(getUserlistFail(error));
  }
}

function* onGetuserView({ payload: requstuser }) {
  try {
    const reponse = yield call(UserlistViewApi, requstuser);
    yield put(getUserViewSuccess(GET_USER_VIEW, reponse));
  } catch (error) {
    yield put(getUserViewFail(error));
  }
}

function* onGetAdduserList({ payload: requstuser }) {
  try {
    const reponse = yield call(AddUserlistApi, requstuser);
    yield put(AddUserlistSuccess(ADD_USER_LIST, reponse));

    if (reponse.success == false) {
      toast.error(reponse?.msg)
    } 
  } catch (error) {
    toast.error(error)
    yield put(AddUserlistFail(error));
  }
}

function* onGetDeleteuserList({ payload: requstuser }) {
  try {
    const reponse = yield call(DelUserlistApi, requstuser);
    yield put(DeleteUserlistSuccess(DELETE_USER_LIST, reponse));
    if (reponse?.success === true || reponse?.success === "true") {
      toast.success(reponse?.msg);
      let requserdata = {  page: 1,  size: 10 };
      const newreponse = yield call(UserlistApi);
      yield put(getUserlistSuccess(GET_USER_LIST, newreponse));
    }
  } catch (error) {
    yield put(DeleteUserlistFail(error));
  }
}

function* onGetUpdateUserdatalist({ payload: requstuser }) {
  try {
    const reponse = yield call(UpdateUserdatalistApi, requstuser);
    yield put(UpdateUserdatalistSuccess(UPDATE_USER_DATA_LIST, reponse));
    if (reponse.success == true) {
      let requserdata = { page: 1, size: 5 };
      const reponse = yield call(UserlistApi, requserdata);
      yield put(getUserlistSuccess(GET_USER_LIST, reponse));
    } 
  } catch (error) {
    yield put(UpdateUserdatalistFail(error));
  }
}

function* onGetResetUserdatalist({ payload: requstuser }) {
  const reponse = yield call(ResetUserdatalist);
  yield put(ResetUserdatalistSuccess(RESET_USER_DATA_LIST, reponse));
}

function* onGetCheckUserdatalist({ payload: requstuser }) {
  try {
    const reponse = yield call(CheckUserdatalistApi, requstuser);
    yield put(CheckUserdatalistSuccess(CHECK_USER_LIST, reponse));
  } catch (error) {
    yield put(CheckUserdatalistFail(error));
  }
}

function* onGetProfileData({ payload: requstuser }) {
  try {
    const reponse = yield call(profileUserdatalistApi, requstuser);
    yield put(ProfileUserdatalistSuccess(GET_PROFILE_DATA_LIST, reponse));
  } catch (error) {
    yield put(ProfileUserdatalistFail(error));
  }
}

function* onGetUpdateProfileData({ payload: requstuser }) {
  try {
    const reponse = yield call(updateprofileUserdatalistApi, requstuser);
    yield put(UpdateProfileUserdatalistSuccess(UPDATE_PROFILE_DATA_LIST, reponse));
    if (reponse.success == true) {
      const reponse = yield call(profileUserdatalistApi, requstuser);
      yield put(ProfileUserdatalistSuccess(GET_PROFILE_DATA_LIST, reponse));
    } 
  } catch (error) {
    yield put(UpdateProfileUserdatalistFail(error));
  }
}

function* UserSaga() {
  yield takeEvery(GET_USER_LIST, onGetuserList);
  yield takeEvery(GET_USER_VIEW, onGetuserView);
  yield takeEvery(ADD_USER_LIST, onGetAdduserList);
  yield takeEvery(DELETE_USER_LIST, onGetDeleteuserList);
  yield takeEvery(UPDATE_USER_DATA_LIST, onGetUpdateUserdatalist);
  yield takeEvery(RESET_USER_DATA_LIST, onGetResetUserdatalist);
  yield takeEvery(CHECK_USER_LIST, onGetCheckUserdatalist);
  yield takeEvery(GET_PROFILE_DATA_LIST, onGetProfileData);
  yield takeEvery(UPDATE_PROFILE_DATA_LIST, onGetUpdateProfileData);
}

export default UserSaga;
