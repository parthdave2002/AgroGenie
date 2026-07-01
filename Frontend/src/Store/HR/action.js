import {
  GET_HR_DASHBOARD_LIST,
  GET_HR_DASHBOARD_LIST_SUCCESS,
  GET_HR_DASHBOARD_LIST_ERROR,

  REST_HR_DASHBOARD_LIST,
  REST_HR_DASHBOARD_LIST_SUCCESS,
  REST_HR_DASHBOARD_LIST_ERROR
} from "./actionType";

export const getHRDashbaordlist = (requserdata) => ({
  type: GET_HR_DASHBOARD_LIST,
  payload: requserdata,
});

export const getHRDashbaordlistSuccess = (actionType, data) => ({
  type: GET_HR_DASHBOARD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getHRDashbaordlistFail = (actionType, error) => ({
  type: GET_HR_DASHBOARD_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetHRDashbaordlist = (requserdata) => ({
  type: REST_HR_DASHBOARD_LIST,
  payload: requserdata,
});

export const ResetHRDashbaordlistSuccess = (actionType, data) => ({
  type: REST_HR_DASHBOARD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetHRDashbaordlistFail = (actionType, error) => ({
  type: REST_HR_DASHBOARD_LIST_ERROR,
  payload: { actionType, error },
});
