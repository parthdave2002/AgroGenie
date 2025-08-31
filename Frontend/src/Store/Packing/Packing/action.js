import {
  GET_PACKING_LIST,
  GET_PACKING_LIST_SUCCESS,
  GET_PACKING_LIST_ERROR,

  ADD_PACKING_LIST,
  ADD_PACKING_LIST_SUCCESS,
  ADD_PACKING_LIST_ERROR,
  
  DELETE_PACKING_LIST,
  DELETE_PACKING_LIST_SUCCESS,
  DELETE_PACKING_LIST_ERROR,

  RESET_PACKING_LIST,
  RESET_PACKING_LIST_SUCCESS,
  RESET_PACKING_LIST_ERROR
} from "./actionType";

export const getPackinglist = (requserdata) => ({
  type: GET_PACKING_LIST,
  payload: requserdata,
});

export const getPackinglistSuccess = (actionType, data) => ({
  type: GET_PACKING_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getPackinglistFail = (actionType, error) => ({
  type: GET_PACKING_LIST_ERROR,
  payload: { actionType, error },
});

export const AddPackinglist = (requserdata) => ({
  type: ADD_PACKING_LIST,
  payload: requserdata,
});

export const AddPackinglistSuccess = (actionType, data) => ({
  type: ADD_PACKING_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddPackinglistFail = (actionType, error) => ({
  type: ADD_PACKING_LIST_ERROR,
  payload: { actionType, error },
});

export const DeletePackinglist = (requserdata) => ({
  type: DELETE_PACKING_LIST,
  payload: requserdata,
});

export const DeletePackinglistSuccess = (actionType, data) => ({
  type: DELETE_PACKING_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeletePackinglistFail = (actionType, error) => ({
  type: DELETE_PACKING_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetPackinglist = (requserdata) => ({
  type: RESET_PACKING_LIST,
  payload: requserdata,
});

export const ResetPackinglistSuccess = (actionType, data) => ({
  type: RESET_PACKING_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetPackinglistFail = (actionType, error) => ({
  type: RESET_PACKING_LIST_ERROR,
  payload: { actionType, error },
});
