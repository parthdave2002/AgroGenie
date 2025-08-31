import {
  GET_COMPANY_LIST,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_ERROR,

  ADD_COMPANY_LIST,
  ADD_COMPANY_LIST_SUCCESS,
  ADD_COMPANY_LIST_ERROR,

  CHANGE_STATUS_COMPANY_LIST,
  CHANGE_STATUS_COMPANY_LIST_SUCCESS,
  CHANGE_STATUS_COMPANY_LIST_ERROR,
  
  DELETE_COMPANY_LIST,
  DELETE_COMPANY_LIST_SUCCESS,
  DELETE_COMPANY_LIST_ERROR,

  REST_COMPANY_LIST,
  REST_COMPANY_LIST_SUCCESS,
  REST_COMPANY_LIST_ERROR
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

export const AddCompanylist = (requserdata) => ({
  type: ADD_COMPANY_LIST,
  payload: requserdata,
});

export const AddCompanylistSuccess = (actionType, data) => ({
  type: ADD_COMPANY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddCompanylistFail = (actionType, error) => ({
  type: ADD_COMPANY_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteCompanylist = (requserdata) => ({
  type: DELETE_COMPANY_LIST,
  payload: requserdata,
});

export const DeleteCompanylistSuccess = (actionType, data) => ({
  type: DELETE_COMPANY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteCompanylistFail = (actionType, error) => ({
  type: DELETE_COMPANY_LIST_ERROR,
  payload: { actionType, error },
});


export const ChangeStatusCompanylist = (requserdata) => ({
  type: CHANGE_STATUS_COMPANY_LIST,
  payload: requserdata,
});

export const ChangeStatusCompanylistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_COMPANY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangeStatusCompanylistFail = (actionType, error) => ({
  type: CHANGE_STATUS_COMPANY_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetCompanylist = (requserdata) => ({
  type: REST_COMPANY_LIST,
  payload: requserdata,
});

export const ResetCompanylistSuccess = (actionType, data) => ({
  type: REST_COMPANY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetCompanylistFail = (actionType, error) => ({
  type: REST_COMPANY_LIST_ERROR,
  payload: { actionType, error },
});
