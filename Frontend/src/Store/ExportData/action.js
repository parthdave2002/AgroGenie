import {
  GET_EXPORT_DATA_LIST,
  GET_EXPORT_DATA_LIST_SUCCESS,
  GET_EXPORT_DATA_LIST_ERROR,

  RESET_EXPORT_DATA_LIST,
  RESET_EXPORT_DATA_LIST_SUCCESS,
  RESET_EXPORT_DATA_LIST_ERROR
} from "./actionType";

export const getExportDatalist = (requserdata, name) => ({
  type: GET_EXPORT_DATA_LIST,
  payload: requserdata,
});

export const getExportDatalistSuccess = (actionType, data) => ({
  type: GET_EXPORT_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getExportDatalistFail = (actionType, error) => ({
  type: GET_EXPORT_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetExportDatalist = (requserdata) => ({
  type: RESET_EXPORT_DATA_LIST,
  payload: requserdata,
});

export const ResetExportDatalistSuccess = (actionType, data) => ({
  type: RESET_EXPORT_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetExportDatalistFail = (actionType, error) => ({
  type: RESET_EXPORT_DATA_LIST_ERROR,
  payload: { actionType, error },
});
