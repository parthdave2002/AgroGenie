import {
  GET_BANNER_LIST,
  GET_BANNER_LIST_SUCCESS,
  GET_BANNER_LIST_ERROR,
} from "./actionType";

export const getBannerlist = (requserdata) => ({
  type: GET_BANNER_LIST,
  payload: requserdata,
});

export const getBannerlistSuccess = (actionType, data) => ({
  type: GET_BANNER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getBannerlistFail = (actionType, error) => ({
  type: GET_BANNER_LIST_ERROR,
  payload: { actionType, error },
});
