import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getReferralRulelistSuccess,
  getReferralRulelistFail,
  AddReferralRulelistSuccess,
  AddReferralRulelistFail,
  DeleteReferralRulelistSuccess,
  DeleteReferralRulelistFail,
  ChangeStatusReferralRulelistSuccess,
  ChangeStatusReferralRulelistFail,
  ResetReferralRulelist,
  ResetReferralRulelistSuccess
} from "./action";
import {
  GET_REFERRAL_RULES_LIST,
  ADD_REFERRAL_RULES_LIST,
  CHANGE_STATUS_REFERRAL_RULES_LIST,
  DELETE_REFERRAL_RULES_LIST,
  REST_REFERRAL_RULES_LIST
} from "./actionType";
import { ReferralRulesApi, AddReferralRulesApi, DelReferralRulesApi, StatusReferralRulesApi,   } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetReferralRulesList({ payload: requstuser }) {
  try {
    const response = yield call(ReferralRulesApi, requstuser);
    yield put(getReferralRulelistSuccess(GET_REFERRAL_RULES_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getReferralRulelistFail(error));
  }
}

function* onAddReferralRulesList({ payload: requstuser }) {
  try {
    const response = yield call(AddReferralRulesApi, requstuser);
    yield put(AddReferralRulelistSuccess(ADD_REFERRAL_RULES_LIST, response));
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(ReferralRulesApi);
      yield put(getReferralRulelistSuccess(GET_REFERRAL_RULES_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddReferralRulelistFail(error));
  }
}

function* onDelReferralRulesList({ payload: requstuser }) {
  try {
    const response = yield call(DelReferralRulesApi, requstuser);
    yield put(DeleteReferralRulelistSuccess(DELETE_REFERRAL_RULES_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
      const newresponse = yield call(ReferralRulesApi);
      yield put(getReferralRulelistSuccess(GET_REFERRAL_RULES_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteReferralRulelistFail(error));
  }
}

function* onStatusReferralRulesList({ payload: requstuser }) {
  try {
    const response = yield call(StatusReferralRulesApi, requstuser);
    yield put(ChangeStatusReferralRulelistSuccess(CHANGE_STATUS_REFERRAL_RULES_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(ReferralRulesApi);
      yield put(getReferralRulelistSuccess(GET_REFERRAL_RULES_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangeStatusReferralRulelistFail(error));
  }
}


function* onResetReferralRulesList() {
  const response = yield call(ResetReferralRulelist);
  yield put(ResetReferralRulelistSuccess(REST_REFERRAL_RULES_LIST, response)); 
}

function* ReferralSaga() {
  yield takeEvery(GET_REFERRAL_RULES_LIST, onGetReferralRulesList);
  yield takeEvery(ADD_REFERRAL_RULES_LIST, onAddReferralRulesList);
  yield takeEvery(DELETE_REFERRAL_RULES_LIST, onDelReferralRulesList);
  yield takeEvery(CHANGE_STATUS_REFERRAL_RULES_LIST, onStatusReferralRulesList);
  yield takeEvery(REST_REFERRAL_RULES_LIST, onResetReferralRulesList);
}
export default ReferralSaga;
