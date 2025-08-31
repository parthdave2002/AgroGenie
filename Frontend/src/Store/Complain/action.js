import {
  GET_COMPLAIN_LIST,
  GET_COMPLAIN_LIST_SUCCESS,
  GET_COMPLAIN_LIST_ERROR,

  GET_FARMER_COMPLAIN_LIST,
  GET_FARMER_COMPLAIN_LIST_SUCCESS,
  GET_FARMER_COMPLAIN_LIST_ERROR,

  GET_SALES_COMPLAIN_LIST,
  GET_SALES_COMPLAIN_LIST_ERROR,
  GET_SALES_COMPLAIN_LIST_SUCCESS,

  GET_COMPLAIN_DETAILS_LIST,
  GET_COMPLAIN_DETAILS_LIST_SUCCESS,
  GET_COMPLAIN_DETAILS_LIST_ERROR,

  ADD_COMPLAIN_LIST,
  ADD_COMPLAIN_LIST_SUCCESS,
  ADD_COMPLAIN_LIST_ERROR,

  UPDATE_COMPLAIN_LIST,
  UPDATE_COMPLAIN_LIST_SUCCESS,
  UPDATE_COMPLAIN_LIST_ERROR,
  
  DELETE_COMPLAIN_LIST,
  DELETE_COMPLAIN_LIST_SUCCESS,
  DELETE_COMPLAIN_LIST_ERROR,

  REST_COMPLAIN_LIST,
  REST_COMPLAIN_LIST_SUCCESS,
  REST_COMPLAIN_LIST_ERROR
} from "./actionType";

export const getComplainlist = (requserdata) => ({
  type: GET_COMPLAIN_LIST,
  payload: requserdata,
});

export const getComplainlistSuccess = (actionType, data) => ({
  type: GET_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getComplainlistFail = (actionType, error) => ({
  type: GET_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});

export const getSalesComplainlist = (requserdata) => ({
  type: GET_SALES_COMPLAIN_LIST,
  payload: requserdata,
});

export const getSalesComplainlistSuccess = (actionType, data) => ({
  type: GET_SALES_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSalesComplainlistFail = (actionType, error) => ({
  type: GET_SALES_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});

export const getComplainDetailslist = (requserdata) => ({
  type: GET_COMPLAIN_DETAILS_LIST,
  payload: requserdata,
});

export const getComplainDetailslistSuccess = (actionType, data) => ({
  type: GET_COMPLAIN_DETAILS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getComplainDetailslistFail = (actionType, error) => ({
  type: GET_COMPLAIN_DETAILS_LIST_ERROR,
  payload: { actionType, error },
});

export const AddComplainlist = (requserdata) => ({
  type: ADD_COMPLAIN_LIST,
  payload: requserdata,
});

export const AddComplainlistSuccess = (actionType, data) => ({
  type: ADD_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddComplainlistFail = (actionType, error) => ({
  type: ADD_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteComplainlist = (requserdata) => ({
  type: DELETE_COMPLAIN_LIST,
  payload: requserdata,
});

export const DeleteComplainlistSuccess = (actionType, data) => ({
  type: DELETE_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteComplainlistFail = (actionType, error) => ({
  type: DELETE_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});


export const UpdateComplainlist = (requserdata) => ({
  type: UPDATE_COMPLAIN_LIST,
  payload: requserdata,
});

export const UpdateComplainlistSuccess = (actionType, data) => ({
  type: UPDATE_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateComplainlistFail = (actionType, error) => ({
  type: UPDATE_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetComplainlist = (requserdata) => ({
  type: REST_COMPLAIN_LIST,
  payload: requserdata,
});

export const ResetComplainlistSuccess = (actionType, data) => ({
  type: REST_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetComplainlistFail = (actionType, error) => ({
  type: REST_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});


export const getFarmerComplainlist = (requserdata) => ({
  type: GET_FARMER_COMPLAIN_LIST,
  payload: requserdata,
});

export const getFarmerComplainlistSuccess = (actionType, data) => ({
  type: GET_FARMER_COMPLAIN_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getFarmerComplainlistFail = (actionType, error) => ({
  type: GET_FARMER_COMPLAIN_LIST_ERROR,
  payload: { actionType, error },
});
