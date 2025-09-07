import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_ERROR,
} from "./actionType";

export const getCategorylist = (requserdata) => ({
  type: GET_CATEGORY_LIST,
  payload: requserdata,
});

export const getCategorylistSuccess = (actionType, data) => ({
  type: GET_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCategorylistFail = (actionType, error) => ({
  type: GET_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});