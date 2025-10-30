import {
  GET_LEAVE_LIST,
  GET_LEAVE_LIST_SUCCESS,
  GET_LEAVE_LIST_ERROR,

  ADD_LEAVE_LIST,
  ADD_LEAVE_LIST_ERROR,
  ADD_LEAVE_LIST_SUCCESS,

  GET_CHANGE_LEAVE_STATUS,
  GET_CHANGE_LEAVE_STATUS_SUCCESS,
  GET_CHANGE_LEAVE_STATUS_ERROR
} from "./actionType";

export const getleavelist = (requserdata) => ({
  type: GET_LEAVE_LIST,
  payload: requserdata,
});

export const getleavelistSuccess = (actionType, data) => ({
  type: GET_LEAVE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getleavelistFail = (actionType, error) => ({
  type: GET_LEAVE_LIST_ERROR,
  payload: { actionType, error },
});


export const addleavelist = (requserdata) => ({
  type: ADD_LEAVE_LIST,
  payload: requserdata,
});

export const addleavelistSuccess = (actionType, data) => ({
  type: ADD_LEAVE_LIST_SUCCESS,
  payload: { actionType, data },
});

export const addleavelistFail = (actionType, error) => ({
  type: ADD_LEAVE_LIST_ERROR,
  payload: { actionType, error },
});

export const changeleavestatuslist = (requserdata) => ({
  type: GET_CHANGE_LEAVE_STATUS,
  payload: requserdata,
});

export const changeleavestatuslistSuccess = (actionType, data) => ({
  type: GET_CHANGE_LEAVE_STATUS_SUCCESS,
  payload: { actionType, data },
});

export const changeleavestatuslistFail = (actionType, error) => ({
  type: GET_CHANGE_LEAVE_STATUS_ERROR,
  payload: { actionType, error },
});