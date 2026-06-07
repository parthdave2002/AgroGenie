import {
  GET_REFERRAL_RULES_LIST,
  GET_REFERRAL_RULES_LIST_SUCCESS,
  GET_REFERRAL_RULES_LIST_ERROR,

  ADD_REFERRAL_RULES_LIST,
  ADD_REFERRAL_RULES_LIST_SUCCESS,
  ADD_REFERRAL_RULES_LIST_ERROR,

  CHANGE_STATUS_REFERRAL_RULES_LIST,
  CHANGE_STATUS_REFERRAL_RULES_LIST_SUCCESS,
  CHANGE_STATUS_REFERRAL_RULES_LIST_ERROR,
  
  DELETE_REFERRAL_RULES_LIST,
  DELETE_REFERRAL_RULES_LIST_SUCCESS,
  DELETE_REFERRAL_RULES_LIST_ERROR,

  REST_REFERRAL_RULES_LIST,
  REST_REFERRAL_RULES_LIST_SUCCESS,
  REST_REFERRAL_RULES_LIST_ERROR
} from "./actionType";

export const getReferralRulelist = (requserdata) => ({
  type: GET_REFERRAL_RULES_LIST,
  payload: requserdata,
});

export const getReferralRulelistSuccess = (actionType, data) => ({
  type: GET_REFERRAL_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getReferralRulelistFail = (actionType, error) => ({
  type: GET_REFERRAL_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const AddReferralRulelist = (requserdata) => ({
  type: ADD_REFERRAL_RULES_LIST,
  payload: requserdata,
});

export const AddReferralRulelistSuccess = (actionType, data) => ({
  type: ADD_REFERRAL_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddReferralRulelistFail = (actionType, error) => ({
  type: ADD_REFERRAL_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteReferralRulelist = (requserdata) => ({
  type: DELETE_REFERRAL_RULES_LIST,
  payload: requserdata,
});

export const DeleteReferralRulelistSuccess = (actionType, data) => ({
  type: DELETE_REFERRAL_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteReferralRulelistFail = (actionType, error) => ({
  type: DELETE_REFERRAL_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const ChangeStatusReferralRulelist = (requserdata) => ({
  type: CHANGE_STATUS_REFERRAL_RULES_LIST,
  payload: requserdata,
});

export const ChangeStatusReferralRulelistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_REFERRAL_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangeStatusReferralRulelistFail = (actionType, error) => ({
  type: CHANGE_STATUS_REFERRAL_RULES_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetReferralRulelist = (requserdata) => ({
  type: REST_REFERRAL_RULES_LIST,
  payload: requserdata,
});

export const ResetReferralRulelistSuccess = (actionType, data) => ({
  type: REST_REFERRAL_RULES_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetReferralRulelistFail = (actionType, error) => ({
  type: REST_REFERRAL_RULES_LIST_ERROR,
  payload: { actionType, error },
});
