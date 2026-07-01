import {
  GET_LEAVE_LIST,
  GET_LEAVE_LIST_SUCCESS,
  GET_LEAVE_LIST_ERROR,

  ADD_LEAVE_LIST,
  ADD_LEAVE_LIST_ERROR,
  ADD_LEAVE_LIST_SUCCESS,

  GET_CHANGE_LEAVE_STATUS,
  GET_CHANGE_LEAVE_STATUS_SUCCESS,
  GET_CHANGE_LEAVE_STATUS_ERROR,

  GET_LEAVE_MANAGEMENT_LIST,
  GET_LEAVE_MANAGEMENT_LIST_ERROR,
  GET_LEAVE_MANAGEMENT_LIST_SUCCESS,

  ADD_LEAVE_MANAGEMENT_LIST,
  ADD_LEAVE_MANAGEMENT_LIST_ERROR,
  ADD_LEAVE_MANAGEMENT_LIST_SUCCESS,

  GET_CHANGE_LEAVE_MANAGEMENT_STATUS,
  GET_CHANGE_LEAVE_MANAGEMENT_STATUS_SUCCESS,
  GET_CHANGE_LEAVE_MANAGEMENT_STATUS_ERROR,

  RESET_LEAVE_MANAGEMENT_LIST,
  RESET_LEAVE_MANAGEMENT_LIST_ERROR,
  RESET_LEAVE_MANAGEMENT_LIST_SUCCESS
} from "./actionType";

export const getleavemanagemenetlist = (requserdata) => ({
  type: GET_LEAVE_MANAGEMENT_LIST,
  payload: requserdata,
});

export const getleavemanagemenetlistSuccess = (actionType, data) => ({
  type: GET_LEAVE_MANAGEMENT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getleavemanagemenetlistFail = (actionType, error) => ({
  type: GET_LEAVE_MANAGEMENT_LIST_ERROR,
  payload: { actionType, error },
});


export const addleavemanagementlist = (requserdata) => ({
  type: ADD_LEAVE_MANAGEMENT_LIST,
  payload: requserdata,
});

export const addleavemanagementlistSuccess = (actionType, data) => ({
  type: ADD_LEAVE_MANAGEMENT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const addleavemanagementlistFail = (actionType, error) => ({
  type: ADD_LEAVE_MANAGEMENT_LIST_ERROR,
  payload: { actionType, error },
});

export const changeleavestatusmanagementlist = (requserdata) => ({
  type: GET_CHANGE_LEAVE_MANAGEMENT_STATUS,
  payload: requserdata,
});

export const changeleavestatusmanagementlistSuccess = (actionType, data) => ({
  type: GET_CHANGE_LEAVE_MANAGEMENT_STATUS_SUCCESS,
  payload: { actionType, data },
});

export const changeleavestatusmanagementlistFail = (actionType, error) => ({
  type: GET_CHANGE_LEAVE_MANAGEMENT_STATUS_ERROR,
  payload: { actionType, error },
});

export const resetleavelistmanagement = (requserdata) => ({
  type: RESET_LEAVE_MANAGEMENT_LIST,
  payload: requserdata,
});

export const resetleavelistmanagementSuccess = (actionType, data) => ({
  type: RESET_LEAVE_MANAGEMENT_LIST_SUCCESS,
  payload: { actionType, data },
});

export const resetleavelistmanagementFail = (actionType, error) => ({
  type: RESET_LEAVE_MANAGEMENT_LIST_ERROR,
  payload: { actionType, error },
});

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