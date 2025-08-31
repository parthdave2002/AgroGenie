import {
  GET_DASHBOARD_DATA_LIST,
  GET_DASHBOARD_DATA_LIST_SUCCESS,
  GET_DASHBOARD_DATA_LIST_ERROR,

  GET_REPORT_DATA_LIST,
  GET_REPORT_DATA_LIST_SUCCESS,
  GET_REPORT_DATA_LIST_ERROR,

  REST_REPORT_DATA_LIST,
  REST_REPORT_DATA_LIST_SUCCESS,
  REST_REPORT_DATA_LIST_ERROR
} from "./actionType";

export const getDashboarddatalist = (requserdata) => ({
  type: GET_DASHBOARD_DATA_LIST,
  payload: requserdata,
});

export const getDashboarddatalistSuccess = (actionType, data) => ({
  type: GET_DASHBOARD_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getDashboarddatalistFail = (actionType, error) => ({
  type: GET_DASHBOARD_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const getReportDatalist = (requserdata) => ({
  type: GET_REPORT_DATA_LIST,
  payload: requserdata,
});

export const getReportDatalistSuccess = (actionType, data) => ({
  type: GET_REPORT_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getReportDatalistFail = (actionType, error) => ({
  type: GET_REPORT_DATA_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetReportDatalist = (requserdata) => ({
  type: REST_REPORT_DATA_LIST,
  payload: requserdata,
});

export const ResetReportDatalistSuccess = (actionType, data) => ({
  type: REST_REPORT_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetReportDatalistFail = (actionType, error) => ({
  type: REST_REPORT_DATA_LIST_ERROR,
  payload: { actionType, error },
});