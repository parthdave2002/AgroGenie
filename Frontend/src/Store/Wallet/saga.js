import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getWalletHistorylistSuccess,
  getWalletHistorylistFail,
  AddWalletPointSuccess,
  AddWalletPointFail,
  getWalletRulelistSuccess,
  getWalletRulelistFail,
  AddWalletRulelistSuccess,
  AddWalletRulelistFail,
  DeleteWalletRulelistSuccess,
  DeleteWalletRulelistFail,
  ChangeStatusWalletRulelistSuccess,
  ChangeStatusWalletRulelistFail,
  ResetWalletRulelist,
  ResetWalletRulelistSuccess
} from "./action";
import {
  GET_WALLET_HISTORY_LIST,
  ADD_WALLET_POINTS_LIST,
  GET_WALLET_RULES_LIST,
  ADD_WALLET_RULES_LIST,
  CHANGE_STATUS_WALLET_RULES_LIST,
  DELETE_WALLET_RULES_LIST,
  REST_WALLET_RULES_LIST
} from "./actionType";
import { WalletHistoryApi,WalletPointAddApi, WalletRulesApi, AddWalletRulesApi, DelWalletRulesApi, StatusWalletRulesApi,   } from "../../helper/Demo_helper";
import { toast } from "react-toastify";

function* onGetWalletHistoryList({ payload: requstuser }) {
  try {
    const response = yield call(WalletHistoryApi, requstuser);
    yield put(getWalletHistorylistSuccess(GET_WALLET_HISTORY_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getWalletHistorylistFail(error));
  }
}

function* onAddWalletPoint({ payload: requstuser }) {
  try {
    const response = yield call(WalletPointAddApi, requstuser);
    yield put(AddWalletPointSuccess(ADD_WALLET_POINTS_LIST, response));

    console.log("eeee", response.success,  typeof response.success)
    if(response.success){
    console.log("innnnn",response?.msg)

      toast.success(response?.msg);
      const response = yield call(WalletHistoryApi, requstuser);
      yield put(getWalletHistorylistSuccess(GET_WALLET_HISTORY_LIST, response));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddWalletPointFail(error));
  }
}

function* onGetWalletRulesList({ payload: requstuser }) {
  try {
    const response = yield call(WalletRulesApi, requstuser);
    yield put(getWalletRulelistSuccess(GET_WALLET_RULES_LIST, response));
  } catch (error) {
    toast.error(error?.msg);
    yield put(getWalletRulelistFail(error));
  }
}

function* onAddWalletRulesList({ payload: requstuser }) {
  try {
    const response = yield call(AddWalletRulesApi, requstuser);
    yield put(AddWalletRulelistSuccess(ADD_WALLET_RULES_LIST, response));
    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(WalletRulesApi);
      yield put(getWalletRulelistSuccess(GET_WALLET_RULES_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(AddWalletRulelistFail(error));
  }
}

function* onDelWalletRulesList({ payload: requstuser }) {
  try {
    const response = yield call(DelWalletRulesApi, requstuser);
    yield put(DeleteWalletRulelistSuccess(DELETE_WALLET_RULES_LIST, response));

    if(response.success === true || response.success === "true"){
       toast.success(response?.msg);
      const newresponse = yield call(WalletRulesApi);
      yield put(getWalletRulelistSuccess(GET_WALLET_RULES_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(DeleteWalletRulelistFail(error));
  }
}

function* onStatusWalletRulesList({ payload: requstuser }) {
  try {
    const response = yield call(StatusWalletRulesApi, requstuser);
    yield put(ChangeStatusWalletRulelistSuccess(CHANGE_STATUS_WALLET_RULES_LIST, response));

    if(response.success === true || response.success === "true"){
      toast.success(response?.msg);
      const newresponse = yield call(WalletRulesApi);
      yield put(getWalletRulelistSuccess(GET_WALLET_RULES_LIST, newresponse));
    }
  } catch (error) {
    toast.error(error?.msg);
    yield put(ChangeStatusWalletRulelistFail(error));
  }
}


function* onResetWalletRulesList() {
  const response = yield call(ResetWalletRulelist);
  yield put(ResetWalletRulelistSuccess(REST_WALLET_RULES_LIST, response)); 
}

function* WalletSaga() {
  yield takeEvery(GET_WALLET_RULES_LIST, onGetWalletRulesList);
  yield takeEvery(ADD_WALLET_RULES_LIST, onAddWalletRulesList);
  yield takeEvery(DELETE_WALLET_RULES_LIST, onDelWalletRulesList);
  yield takeEvery(CHANGE_STATUS_WALLET_RULES_LIST, onStatusWalletRulesList);
  yield takeEvery(REST_WALLET_RULES_LIST, onResetWalletRulesList);
  yield takeEvery(GET_WALLET_HISTORY_LIST, onGetWalletHistoryList);
  yield takeEvery(ADD_WALLET_POINTS_LIST, onAddWalletPoint);
}
export default WalletSaga;
