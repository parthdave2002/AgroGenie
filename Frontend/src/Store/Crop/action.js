import {
  GET_CROP_LIST,
  GET_CROP_LIST_SUCCESS,
  GET_CROP_LIST_ERROR,

  ADD_CROP_LIST,
  ADD_CROP_LIST_SUCCESS,
  ADD_CROP_LIST_ERROR,

  CHANGE_STATUS_CROP_LIST,
  CHANGE_STATUS_CROP_LIST_ERROR,
  CHANGE_STATUS_CROP_LIST_SUCCESS,
  
  DELETE_CROP_LIST,
  DELETE_CROP_LIST_SUCCESS,
  DELETE_CROP_LIST_ERROR,

  RESET_CROP_LIST,
  RESET_CROP_LIST_SUCCESS,
  RESET_CROP_LIST_ERROR
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

export const AddCroplist = (requserdata) => ({
  type: ADD_CROP_LIST,
  payload: requserdata,
});

export const AddCroplistSuccess = (actionType, data) => ({
  type: ADD_CROP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddCroplistFail = (actionType, error) => ({
  type: ADD_CROP_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteCroplist = (requserdata) => ({
  type: DELETE_CROP_LIST,
  payload: requserdata,
});

export const DeleteCroplistSuccess = (actionType, data) => ({
  type: DELETE_CROP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteCroplistFail = (actionType, error) => ({
  type: DELETE_CROP_LIST_ERROR,
  payload: { actionType, error },
});


export const ChangestatusCroplist = (requserdata) => ({
  type: CHANGE_STATUS_CROP_LIST,
  payload: requserdata,
});

export const ChangestatusCroplistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_CROP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangestatusCroplistFail = (actionType, error) => ({
  type: CHANGE_STATUS_CROP_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetCroplist = (requserdata) => ({
  type: RESET_CROP_LIST,
  payload: requserdata,
});

export const ResetCroplistSuccess = (actionType, data) => ({
  type: RESET_CROP_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetCroplistFail = (actionType, error) => ({
  type: RESET_CROP_LIST_ERROR,
  payload: { actionType, error },
});
