import {
  GET_BANNER_LIST,
  GET_BANNER_LIST_SUCCESS,
  GET_BANNER_LIST_ERROR,

  ADD_BANNER_LIST,
  ADD_BANNER_LIST_SUCCESS,
  ADD_BANNER_LIST_ERROR,
  
  DELETE_BANNER_LIST,
  DELETE_BANNER_LIST_SUCCESS,
  DELETE_BANNER_LIST_ERROR,

  REST_BANNER_LIST,
  REST_BANNER_LIST_SUCCESS,
  REST_BANNER_LIST_ERROR
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

export const AddBannerlist = (requserdata) => ({
  type: ADD_BANNER_LIST,
  payload: requserdata,
});

export const AddBannerlistSuccess = (actionType, data) => ({
  type: ADD_BANNER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddBannerlistFail = (actionType, error) => ({
  type: ADD_BANNER_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteBannerlist = (requserdata) => ({
  type: DELETE_BANNER_LIST,
  payload: requserdata,
});

export const DeleteBannerlistSuccess = (actionType, data) => ({
  type: DELETE_BANNER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteBannerlistFail = (actionType, error) => ({
  type: DELETE_BANNER_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetBannerlist = (requserdata) => ({
  type: REST_BANNER_LIST,
  payload: requserdata,
});

export const ResetBannerlistSuccess = (actionType, data) => ({
  type: REST_BANNER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetBannerlistFail = (actionType, error) => ({
  type: REST_BANNER_LIST_ERROR,
  payload: { actionType, error },
});
