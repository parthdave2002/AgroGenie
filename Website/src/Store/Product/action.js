import {
  GET_RELATED_PRODUCT_LIST,
  GET_RELATED_PRODUCT_LIST_SUCCESS,
  GET_RELATED_PRODUCT_LIST_ERROR,

  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,

  GET_PRODUCT_VIEW_LIST,
  GET_PRODUCT_VIEW_LIST_SUCCESS,
  GET_PRODUCT_VIEW_LIST_ERROR,

  RESET_PRODUCT_LIST,
  RESET_PRODUCT_LIST_ERROR,
  RESET_PRODUCT_LIST_SUCCESS
} from "./actionType";

export const getRelatedProductlist = (requserdata) => ({
  type: GET_RELATED_PRODUCT_LIST,
  payload: requserdata,
});

export const getRelatedProductlistSuccess = (actionType, data) => ({
  type: GET_RELATED_PRODUCT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getRelatedProductlistFail = (actionType, error) => ({
  type: GET_RELATED_PRODUCT_LIST_ERROR,
  payload: { actionType, error },
});

export const getProductlist = (requserdata) => ({
  type: GET_PRODUCT_LIST,
  payload: requserdata,
});

export const getProductlistSuccess = (actionType, data) => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getProductlistFail = (actionType, error) => ({
  type: GET_PRODUCT_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetProductlist = (requserdata) => ({
  type: RESET_PRODUCT_LIST,
  payload: requserdata,
});

export const ResetProductlistSuccess = (actionType, data) => ({
  type: RESET_PRODUCT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetProductlistFail = (actionType, error) => ({
  type: RESET_PRODUCT_LIST_ERROR,
  payload: { actionType, error },
});

export const GetProductViewlist = (requserdata) => ({
  type: GET_PRODUCT_VIEW_LIST,
  payload: requserdata,
});

export const GetProductViewlistSuccess = (actionType, data) => ({
  type: GET_PRODUCT_VIEW_LIST_SUCCESS,
  payload: { actionType, data },
});

export const GetProductViewlistFail = (actionType, error) => ({
  type: GET_PRODUCT_VIEW_LIST_ERROR,
  payload: { actionType, error },
});