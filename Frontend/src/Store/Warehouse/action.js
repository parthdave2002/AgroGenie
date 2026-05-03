import {
  GET_WAREHOUSE_LIST,
  GET_WAREHOUSE_LIST_SUCCESS,
  GET_WAREHOUSE_LIST_ERROR,

  ADD_WAREHOUSE_LIST,
  ADD_WAREHOUSE_LIST_SUCCESS,
  ADD_WAREHOUSE_LIST_ERROR,
  
  DELETE_WAREHOUSE_LIST,
  DELETE_WAREHOUSE_LIST_SUCCESS,
  DELETE_WAREHOUSE_LIST_ERROR,

  RESET_WAREHOUSE_LIST,
  RESET_WAREHOUSE_LIST_SUCCESS,
  RESET_WAREHOUSE_LIST_ERROR
} from "./actionType";

export const getWarehouselist = (requserdata) => ({
  type: GET_WAREHOUSE_LIST,
  payload: requserdata,
});

export const getWarehouselistSuccess = (actionType, data) => ({
  type: GET_WAREHOUSE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getWarehouselistFail = (actionType, error) => ({
  type: GET_WAREHOUSE_LIST_ERROR,
  payload: { actionType, error },
});

export const AddWarehouselist = (requserdata) => ({
  type: ADD_WAREHOUSE_LIST,
  payload: requserdata,
});

export const AddWarehouselistSuccess = (actionType, data) => ({
  type: ADD_WAREHOUSE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddWarehouselistFail = (actionType, error) => ({
  type: ADD_WAREHOUSE_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteWarehouselist = (requserdata) => ({
  type: DELETE_WAREHOUSE_LIST,
  payload: requserdata,
});

export const DeleteWarehouselistSuccess = (actionType, data) => ({
  type: DELETE_WAREHOUSE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteWarehouselistFail = (actionType, error) => ({
  type: DELETE_WAREHOUSE_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetWarehouselist = (requserdata) => ({
  type: RESET_WAREHOUSE_LIST,
  payload: requserdata,
});

export const ResetWarehouselistSuccess = (actionType, data) => ({
  type: RESET_WAREHOUSE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetWarehouselistFail = (actionType, error) => ({
  type: RESET_WAREHOUSE_LIST_ERROR,
  payload: { actionType, error },
});
