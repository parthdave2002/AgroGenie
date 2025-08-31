import {
  GET_UPDATE_ORDER_LIST,
  GET_UPDATE_ORDER_LIST_SUCCESS,
  GET_UPDATE_ORDER_LIST_ERROR,

  GET_FARMER_ORDER_LIST,
  GET_FARMER_ORDER_LIST_SUCCESS,
  GET_FARMER_ORDER_LIST_ERROR,

  GET_SALES_EXECUTIVE_ORDER_LIST,
  GET_SALES_EXECUTIVE_ORDER_LIST_ERROR,
  GET_SALES_EXECUTIVE_ORDER_LIST_SUCCESS,

  GET_ORDER_LIST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_ERROR,

  GET_ORDER_DETAILS_LIST,
  GET_ORDER_DETAILS_LIST_SUCCESS,
  GET_ORDER_DETAILS_LIST_ERROR,

  RESET_ORDER_LIST,
  RESET_ORDER_LIST_SUCCESS,
  RESET_ORDER_LIST_ERROR,

  ADD_ORDER_LIST,
  ADD_ORDER_LIST_SUCCESS,
  ADD_ORDER_LIST_ERROR,
  
  DELETE_ORDER_LIST,
  DELETE_ORDER_LIST_SUCCESS,
  DELETE_ORDER_LIST_ERROR,

  RETURN_ORDER_LIST,
  RETURN_ORDER_LIST_ERROR,
  RETURN_ORDER_LIST_SUCCESS
} from "./actionType";

export const getUpdateOrderlist = (requserdata) => ({
  type: GET_UPDATE_ORDER_LIST,
  payload: requserdata,
});

export const getUpdateOrderlistSuccess = (actionType, data) => ({
  type: GET_UPDATE_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getUpdateOrderlistFail = (actionType, error) => ({
  type: GET_UPDATE_ORDER_LIST_ERROR,
  payload: { actionType, error },
});

export const getOrderlist = (requserdata) => ({
  type: GET_ORDER_LIST,
  payload: requserdata,
});

export const getOrderlistSuccess = (actionType, data) => ({
  type: GET_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getOrderlistFail = (actionType, error) => ({
  type: GET_ORDER_LIST_ERROR,
  payload: { actionType, error },
});


export const getFarmerOrderlist = (requserdata) => ({
  type: GET_FARMER_ORDER_LIST,
  payload: requserdata,
});

export const getFarmerOrderlistSuccess = (actionType, data) => ({
  type: GET_FARMER_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getFarmerOrderlistFail = (actionType, error) => ({
  type: GET_FARMER_ORDER_LIST_ERROR,
  payload: { actionType, error },
});

export const getSalesExecutiveOrderlist = (requserdata) => ({
  type: GET_SALES_EXECUTIVE_ORDER_LIST,
  payload: requserdata,
});

export const getSalesExecutiveOrderlistSuccess = (actionType, data) => ({
  type: GET_SALES_EXECUTIVE_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSalesExecutiveOrderlistFail = (actionType, error) => ({
  type: GET_SALES_EXECUTIVE_ORDER_LIST_ERROR,
  payload: { actionType, error },
});

export const getOrderlistDetails = (requserdata) => ({
  type: GET_ORDER_DETAILS_LIST,
  payload: requserdata,
});

export const getOrderlistDetailsSuccess = (actionType, data) => ({
  type: GET_ORDER_DETAILS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getOrderlistDetailsFail = (actionType, error) => ({
  type: GET_ORDER_DETAILS_LIST_ERROR,
  payload: { actionType, error },
});



export const ResetOrderlist = (requserdata) => ({
  type: RESET_ORDER_LIST,
  payload: requserdata,
});

export const ResetOrderlistSuccess = (actionType, data) => ({
  type: RESET_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetOrderlistFail = (actionType, error) => ({
  type: RESET_ORDER_LIST_ERROR,
  payload: { actionType, error },
});

export const AddOrderlist = (requserdata) => ({
  type: ADD_ORDER_LIST,
  payload: requserdata,
});

export const AddOrderlistSuccess = (actionType, data) => ({
  type: ADD_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddOrderlistFail = (actionType, error) => ({
  type: ADD_ORDER_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteOrderlist = (requserdata) => ({
  type: DELETE_ORDER_LIST,
  payload: requserdata,
});

export const DeleteOrderlistSuccess = (actionType, data) => ({
  type: DELETE_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteOrderlistFail = (actionType, error) => ({
  type: DELETE_ORDER_LIST_ERROR,
  payload: { actionType, error },
});

export const ReturnOrderlist = (requserdata) => ({
  type: RETURN_ORDER_LIST,
  payload: requserdata,
});

export const ReturnOrderlistSuccess = (actionType, data) => ({
  type: RETURN_ORDER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ReturnOrderlistFail = (actionType, error) => ({
  type: RETURN_ORDER_LIST_ERROR,
  payload: { actionType, error },
});
