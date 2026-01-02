 import {
  GET_NOTICE_BOARD_LIST,
  GET_NOTICE_BOARD_LIST_SUCCESS,
  GET_NOTICE_BOARD_LIST_ERROR,

  ADD_NOTICE_BOARD_LIST,
  ADD_NOTICE_BOARD_LIST_SUCCESS,
  ADD_NOTICE_BOARD_LIST_ERROR,
  
  DELETE_NOTICE_BOARD_LIST,
  DELETE_NOTICE_BOARD_LIST_SUCCESS,
  DELETE_NOTICE_BOARD_LIST_ERROR,

  RESET_NOTICE_BOARD_LIST,
  RESET_NOTICE_BOARD_LIST_SUCCESS,
  RESET_NOTICE_BOARD_LIST_ERROR
} from "./actionType";

export const getNoticeBoardlist = (requserdata) => ({
  type: GET_NOTICE_BOARD_LIST,
  payload: requserdata,
});

export const getNoticeBoardlistSuccess = (actionType, data) => ({
  type: GET_NOTICE_BOARD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getNoticeBoardlistFail = (actionType, error) => ({
  type: GET_NOTICE_BOARD_LIST_ERROR,
  payload: { actionType, error },
});

export const AddNoticeBoardlist = (requserdata) => ({
  type: ADD_NOTICE_BOARD_LIST,
  payload: requserdata,
});

export const AddNoticeBoardlistSuccess = (actionType, data) => ({
  type: ADD_NOTICE_BOARD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddNoticeBoardlistFail = (actionType, error) => ({
  type: ADD_NOTICE_BOARD_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteNoticeBoardlist = (requserdata) => ({
  type: DELETE_NOTICE_BOARD_LIST,
  payload: requserdata,
});

export const DeleteNoticeBoardlistSuccess = (actionType, data) => ({
  type: DELETE_NOTICE_BOARD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteNoticeBoardlistFail = (actionType, error) => ({
  type: DELETE_NOTICE_BOARD_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetNoticeBoardlist = (requserdata) => ({
  type: RESET_NOTICE_BOARD_LIST,
  payload: requserdata,
});

export const ResetNoticeBoardlistSuccess = (actionType, data) => ({
  type: RESET_NOTICE_BOARD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetNoticeBoardlistFail = (actionType, error) => ({
  type: RESET_NOTICE_BOARD_LIST_ERROR,
  payload: { actionType, error },
});
