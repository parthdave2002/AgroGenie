import { call, put, takeEvery } from "redux-saga/effects";
import { getCompanylistSuccess,  getCompanylistFail } from "./action";
import {  GET_COMPANY_LIST} from "./actionType";
import { CompanylistApi  } from "../../helper/Demo_helper";
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

function* CompanySaga() {
  yield takeEvery(GET_COMPANY_LIST, onGetCompanyList);
}
export default CompanySaga;
