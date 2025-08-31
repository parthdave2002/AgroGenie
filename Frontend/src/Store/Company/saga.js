import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getCompanylistSuccess,
  getCompanylistFail,
  AddCompanylistSuccess,
  AddCompanylistFail,
  ChangeStatusCompanylistSuccess,
  ChangeStatusCompanylistFail,
  DeleteCompanylistSuccess,
  DeleteCompanylistFail,
  ResetCompanylist,
  ResetCompanylistSuccess,
  ResetCompanylistFail
} from "./action";
import {
  GET_COMPANY_LIST,
  ADD_COMPANY_LIST,
  DELETE_COMPANY_LIST,
  REST_COMPANY_LIST,
  CHANGE_STATUS_COMPANY_LIST
} from "./actionType";
import { CompanylistApi, AddCompanylistApi, DelCompanylistApi, StatusCompanylistApi } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(CompanylistApi, requstuser);
    yield put(getCompanylistSuccess(GET_COMPANY_LIST, response));
  } catch (error) {
    toast.error(error.msg);
    yield put(getCompanylistFail(error));
  }
}

function* onAddCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(AddCompanylistApi, requstuser);
    yield put(AddCompanylistSuccess(ADD_COMPANY_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddCompanylistFail(error));
  }
}

function* onDelCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(DelCompanylistApi, requstuser);
    yield put(DeleteCompanylistSuccess(DELETE_COMPANY_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(CompanylistApi);
      yield put(getCompanylistSuccess(GET_COMPANY_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error.msg);
    yield put(DeleteCompanylistFail(error));
  }
}

function* onChangeCompanyList({ payload: requstuser }) {
  try {
    const response = yield call(StatusCompanylistApi, requstuser);
    yield put(ChangeStatusCompanylistSuccess(CHANGE_STATUS_COMPANY_LIST, response));
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg)
      const newresponse = yield call(CompanylistApi);
      yield put(getCompanylistSuccess(GET_COMPANY_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error.msg);
    yield put(ChangeStatusCompanylistFail(error));
  }
}

function* onRestetCompanyList() {
    const response = yield call(ResetCompanylist);
    yield put(ResetCompanylistSuccess(REST_COMPANY_LIST, response)); 
}

function* CompanySaga() {
  yield takeEvery(GET_COMPANY_LIST, onGetCompanyList);
  yield takeEvery(ADD_COMPANY_LIST, onAddCompanyList);
  yield takeEvery(CHANGE_STATUS_COMPANY_LIST, onChangeCompanyList);
  yield takeEvery(DELETE_COMPANY_LIST, onDelCompanyList);
  yield takeEvery(REST_COMPANY_LIST, onRestetCompanyList);
}
export default CompanySaga;
