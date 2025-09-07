import {
  GET_COMPANY_LIST,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_ERROR,
} from "./actionType";

export const getCompanylist = (requserdata) => ({
  type: GET_COMPANY_LIST,
  payload: requserdata,
});

export const getCompanylistSuccess = (actionType, data) => ({
  type: GET_COMPANY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCompanylistFail = (actionType, error) => ({
  type: GET_COMPANY_LIST_ERROR,
  payload: { actionType, error },
});