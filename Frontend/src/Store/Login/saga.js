import { call, put, takeEvery } from "redux-saga/effects";
import {
  insertlogin,
  insertloginSuccess,
  insertloginFail,
  resetinsertlogin,
  resetinsertloginSuccess,
  VerifyTokenData,
  VerifyTokenDataSuccess,
  VerifyTokenDataFail,
  resetpasswordData,
  resetpasswordDataSuccess,
  resetpasswordDataFail,
  logout,
  logoutSuccess,
  logoutFail,
  resetinsertlogout,
  resetinsertLogoutSuccess,
  forgotpasswordDataSuccess,
  forgotpasswordDataFail
} from "./action";
import {
  INSERT_LOGIN,
  LOGOUT,
  VERIFY_TOKEN_DATA,
  RESET_PASSWORD_DATA,
  RESET_INSERT_LOGIN,
  RESET_INSERT_LOGOUT,
  FORGOT_PASSWORD_DATA
} from "./actionType";
import { LoginApi,LogoutApi, VerifyTokenApi, ResetPasswordApi, ForgotPassApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function* onInsertLogin({ payload: requstuser }) {
  try {
    const reponse = yield call(LoginApi, requstuser);
    yield put(insertloginSuccess(INSERT_LOGIN, reponse));
    if(reponse.success === false){
      toast.error(reponse?.msg)
    }
    if (reponse.success === true) {      
      Cookies.set('token',reponse?.token, { expires: 7 });
      Cookies.set('username',reponse?.data?.name, { expires: 7 });
      Cookies.set('access',reponse?.data?.rolePermissions, { expires: 7 });
      Cookies.set('role',reponse?.data?.roles, { expires: 7 });
    }
  } catch (error) {
    toast.error(error?.msg)
    yield put(insertloginFail(error));
  }
}

function* onResetInsertLogin() {
    const reponse = yield call(resetinsertlogin);
    yield put(resetinsertloginSuccess(RESET_INSERT_LOGIN, reponse));
}

function* onInsertLogout({ payload: requstuser }) {
  try {
    const reponse = yield call(LogoutApi, requstuser);
    yield put(logoutSuccess(LOGOUT, reponse));
  } catch (error) {
    yield put(logoutFail(error));
  }
}

function* onVerifyTokenData({ payload: requstuser }) {
  try {
    const reponse = yield call(VerifyTokenApi, requstuser);
    yield put(VerifyTokenDataSuccess(VERIFY_TOKEN_DATA, reponse));
  } catch (error) {
    if (error  === "Invalid credentials") {
      Cookies.remove("token");
      Cookies.remove("username");
      setTimeout(() =>{
        window.location.replace("/login");
      },5000)
      toast.error("Token expired");
    }
    yield put(VerifyTokenDataFail(error));
  }
}

function* ongetResetPassword({ payload: requstuser }) {
  try {
    const reponse = yield call(ResetPasswordApi, requstuser);
    yield put(resetpasswordDataSuccess(RESET_PASSWORD_DATA, reponse));
  } catch (error) {
    yield put(resetpasswordDataFail(error));
  }
}

function* ongetForgetPassword({ payload: requstuser }) {
  try {
    const reponse = yield call(ForgotPassApi, requstuser);
    yield put(forgotpasswordDataSuccess(FORGOT_PASSWORD_DATA, reponse));
  } catch (error) {
    yield put(forgotpasswordDataFail(error));
  }
}

function* onResetInsertLogout() {
  const reponse = yield call(resetinsertlogout);
  yield put(resetinsertLogoutSuccess(RESET_INSERT_LOGOUT, reponse));
}


function* LoginSaga() {
  yield takeEvery(INSERT_LOGIN, onInsertLogin);
  yield takeEvery(RESET_INSERT_LOGIN, onResetInsertLogin);
  yield takeEvery(LOGOUT, onInsertLogout);
  yield takeEvery(RESET_INSERT_LOGOUT, onResetInsertLogout);
  yield takeEvery(VERIFY_TOKEN_DATA, onVerifyTokenData);
  yield takeEvery(RESET_PASSWORD_DATA, ongetResetPassword);
  yield takeEvery(FORGOT_PASSWORD_DATA, ongetForgetPassword);
}

export default LoginSaga;
