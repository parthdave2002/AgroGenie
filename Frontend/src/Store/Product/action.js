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

  ADD_PRODUCT_LIST,
  ADD_PRODUCT_LIST_SUCCESS,
  ADD_PRODUCT_LIST_ERROR,
  
  UPDATE_PRODUCT_LIST,
  UPDATE_PRODUCT_LIST_SUCCESS,
  UPDATE_PRODUCT_LIST_ERROR,

  DELETE_PRODUCT_LIST,
  DELETE_PRODUCT_LIST_SUCCESS,
  DELETE_PRODUCT_LIST_ERROR,

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

export const AddProductlist = (requserdata) => ({
  type: ADD_PRODUCT_LIST,
  payload: requserdata,
});

export const AddProductlistSuccess = (actionType, data) => ({
  type: ADD_PRODUCT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddProductlistFail = (actionType, error) => ({
  type: ADD_PRODUCT_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteProductlist = (requserdata) => ({
  type: DELETE_PRODUCT_LIST,
  payload: requserdata,
});

export const DeleteProductlistSuccess = (actionType, data) => ({
  type: DELETE_PRODUCT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteProductlistFail = (actionType, error) => ({
  type: DELETE_PRODUCT_LIST_ERROR,
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

export const UpdateProductlist = (requserdata) => ({
  type: UPDATE_PRODUCT_LIST,
  payload: requserdata,
});

export const UpdateProductlistSuccess = (actionType, data) => ({
  type: UPDATE_PRODUCT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateProductlistFail = (actionType, error) => ({
  type: UPDATE_PRODUCT_LIST_ERROR,
  payload: { actionType, error },
});