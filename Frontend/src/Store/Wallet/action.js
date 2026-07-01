import {
  GET_WALLET_HISTORY_LIST,
  GET_WALLET_HISTORY_LIST_SUCCESS,
  GET_WALLET_HISTORY_LIST_ERROR,

  GET_WALLET_RULES_LIST,
  GET_WALLET_RULES_LIST_SUCCESS,
  GET_WALLET_RULES_LIST_ERROR,

  ADD_WALLET_RULES_LIST,
  ADD_WALLET_RULES_LIST_SUCCESS,
  ADD_WALLET_RULES_LIST_ERROR,

  CHANGE_STATUS_WALLET_RULES_LIST,
  CHANGE_STATUS_WALLET_RULES_LIST_SUCCESS,
  CHANGE_STATUS_WALLET_RULES_LIST_ERROR,
  
  DELETE_WALLET_RULES_LIST,
  DELETE_WALLET_RULES_LIST_SUCCESS,
  DELETE_WALLET_RULES_LIST_ERROR,

  REST_WALLET_RULES_LIST,
  REST_WALLET_RULES_LIST_SUCCESS,
  REST_WALLET_RULES_LIST_ERROR
} from "./actionType";

export const getWalletHistorylist = (requserdata) => ({
  type: GET_WALLET_HISTORY_LIST,
  payload: requserdata,
});

export const getWalletHistorylistSuccess = (actionType, data) => ({
  type: GET_WALLET_HISTORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getWalletHistorylistFail = (actionType, error) => ({
  type: GET_WALLET_HISTORY_LIST_ERROR,
  payload: { actionType, error },
});


export const getWalletRulelist = (requserdata) => ({
  type: GET_WALLET_RULES_LIST,
  payload: requserdata,
});

export const getWalletRulelistSuccess = (actionType, data) => ({
  type: GET_WALLET_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getWalletRulelistFail = (actionType, error) => ({
  type: GET_WALLET_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const AddWalletRulelist = (requserdata) => ({
  type: ADD_WALLET_RULES_LIST,
  payload: requserdata,
});

export const AddWalletRulelistSuccess = (actionType, data) => ({
  type: ADD_WALLET_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddWalletRulelistFail = (actionType, error) => ({
  type: ADD_WALLET_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteWalletRulelist = (requserdata) => ({
  type: DELETE_WALLET_RULES_LIST,
  payload: requserdata,
});

export const DeleteWalletRulelistSuccess = (actionType, data) => ({
  type: DELETE_WALLET_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteWalletRulelistFail = (actionType, error) => ({
  type: DELETE_WALLET_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const ChangeStatusWalletRulelist = (requserdata) => ({
  type: CHANGE_STATUS_WALLET_RULES_LIST,
  payload: requserdata,
});

export const ChangeStatusWalletRulelistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_WALLET_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangeStatusWalletRulelistFail = (actionType, error) => ({
  type: CHANGE_STATUS_WALLET_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetWalletRulelist = (requserdata) => ({
  type: REST_WALLET_RULES_LIST,
  payload: requserdata,
});

export const ResetWalletRulelistSuccess = (actionType, data) => ({
  type: REST_WALLET_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetWalletRulelistFail = (actionType, error) => ({
  type: REST_WALLET_RULES_LIST_ERROR,
  payload: { actionType, error },
});
