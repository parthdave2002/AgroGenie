import {
  GET_SALES_DASHBOARD_DATA,
  GET_SALES_DASHBOARD_DATA_SUCCESS,
  GET_SALES_DASHBOARD_DATA_ERROR,

  GET_CALLBACK_DATA,
  GET_CALLBACK_DATA_SUCCESS,
  GET_CALLBACK_DATA_ERROR,

  GET_MARK_AS_DONE_DATA,
  GET_MARK_AS_DONE_DATA_SUCCESS,
  GET_MARK_AS_DONE_DATA_ERROR,

  GET_SALES_DASHBOARD_RESET_DATA,
  GET_SALES_DASHBOARD_RESET_DATA_SUCCESS,
  GET_SALES_DASHBOARD_RESET_DATA_ERROR,
} from "./actionType";

export const getsalesDashboard = (requserdata) => ({
  type: GET_SALES_DASHBOARD_DATA,
  payload: requserdata,
});

export const getsalesDashboardSuccess = (actionType, data) => ({
  type: GET_SALES_DASHBOARD_DATA_SUCCESS,
  payload: { actionType, data },
});

export const getsalesDashboardFail = (actionType, error) => ({
  type: GET_SALES_DASHBOARD_DATA_ERROR,
  payload: { actionType, error },
});


export const getCallbackdata = (requserdata) => ({
  type: GET_CALLBACK_DATA,
  payload: requserdata,
});

export const getCallbackdataSuccess = (actionType, data) => ({
  type: GET_CALLBACK_DATA_SUCCESS,
  payload: { actionType, data },
});

export const getCallbackdataFail = (actionType, error) => ({
  type: GET_CALLBACK_DATA_ERROR,
  payload: { actionType, error },
});

export const getMarkasdone = (requserdata) => ({
  type: GET_MARK_AS_DONE_DATA,
  payload: requserdata,
});

export const getMarkasdoneSuccess = (actionType, data) => ({
  type: GET_MARK_AS_DONE_DATA_SUCCESS,
  payload: { actionType, data },
});

export const getMarkasdoneFail = (actionType, error) => ({
  type: GET_MARK_AS_DONE_DATA_ERROR,
  payload: { actionType, error },
});

export const getResetsalesDashboard = (requserdata) => ({
  type: GET_SALES_DASHBOARD_RESET_DATA,
  payload: requserdata,
});

export const getResetsalesDashboardSuccess = (actionType, data) => ({
  type: GET_SALES_DASHBOARD_RESET_DATA_SUCCESS,
  payload: { actionType, data },
});

export const getResetsalesDashboardFail = (actionType, error) => ({
  type: GET_SALES_DASHBOARD_RESET_DATA_ERROR,
  payload: { actionType, error },
});