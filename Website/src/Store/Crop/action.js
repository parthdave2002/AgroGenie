import {
  GET_CROP_LIST,
  GET_CROP_LIST_SUCCESS,
  GET_CROP_LIST_ERROR,
} from "./actionType";

export const getCroplist = (requserdata) => ({
  type: GET_CROP_LIST,
  payload: requserdata,
});

export const getCroplistSuccess = (actionType, data) => ({
  type: GET_CROP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCroplistFail = (actionType, error) => ({
  type: GET_CROP_LIST_ERROR,
  payload: { actionType, error },
});