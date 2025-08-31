import {
  GET_STATE_DATA_LIST,
  GET_STATE_DATA_LIST_SUCCESS,
  GET_STATE_DATA_LIST_ERROR,

  GET_DISTRICT_DATA_LIST,
  GET_DISTRICT_DATA_LIST_SUCCESS,
  GET_DISTRICT_DATA_LIST_ERROR,

  GET_TALUKA_DATA_LIST,
  GET_TALUKA_DATA_LIST_SUCCESS,
  GET_TALUKA_DATA_LIST_ERROR,
  
  GET_VILLAGE_DATA_LIST,
  GET_VILLAGE_DATA_LIST_SUCCESS,
  GET_VILLAGE_DATA_LIST_ERROR,
} from "./actionType";

export const getstatedatalist = (requserdata) => ({
  type: GET_STATE_DATA_LIST,
  payload: requserdata,
});

export const getstatedatalistSuccess = (actionType, data) => ({
  type: GET_STATE_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getstatedatalistFail = (actionType, error) => ({
  type: GET_STATE_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const getdistrictdata = (requserdata) => ({
  type: GET_DISTRICT_DATA_LIST,
  payload: requserdata,
});

export const getdistrictdataSuccess = (actionType, data) => ({
  type: GET_DISTRICT_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getdistrictdataFail = (actionType, error) => ({
  type: GET_DISTRICT_DATA_LIST_ERROR,
  payload: { actionType, error },
});


export const gettalukadata = (requserdata) => ({
  type: GET_TALUKA_DATA_LIST,
  payload: requserdata,
});

export const gettalukadataSuccess = (actionType, data) => ({
  type: GET_TALUKA_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const gettalukadataFail = (actionType, error) => ({
  type: GET_TALUKA_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const getvillagedata = (requserdata) => ({
  type: GET_VILLAGE_DATA_LIST,
  payload: requserdata,
});

export const getvillagedataSuccess = (actionType, data) => ({
  type: GET_VILLAGE_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getvillagedataFail = (actionType, error) => ({
  type: GET_VILLAGE_DATA_LIST_ERROR,
  payload: { actionType, error },
});