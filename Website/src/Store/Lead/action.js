import {
  GET_LEAD_LIST,
  GET_LEAD_LIST_SUCCESS,
  GET_LEAD_LIST_ERROR,

  ADD_LEAD_LIST,
  ADD_LEAD_LIST_SUCCESS,
  ADD_LEAD_LIST_ERROR,

  MARK_AS_READ_LEAD_LIST,
  MARK_AS_READ_LEAD_LIST_SUCCESS,
  MARK_AS_READ_LEAD_LIST_ERROR,
  
  DELETE_LEAD_LIST,
  DELETE_LEAD_LIST_SUCCESS,
  DELETE_LEAD_LIST_ERROR,

  RESET_LEAD_LIST,
  RESET_LEAD_LIST_SUCCESS,
  RESET_LEAD_LIST_ERROR
} from "./actionType";

export const getleadlist = (requserdata) => ({
  type: GET_LEAD_LIST,
  payload: requserdata,
});

export const getleadlistSuccess = (actionType, data) => ({
  type: GET_LEAD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getleadlistFail = (actionType, error) => ({
  type: GET_LEAD_LIST_ERROR,
  payload: { actionType, error },
});

export const AddLeadlist = (requserdata) => ({
  type: ADD_LEAD_LIST,
  payload: requserdata,
});

export const AddLeadlistSuccess = (actionType, data) => ({
  type: ADD_LEAD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddLeadlistFail = (actionType, error) => ({
  type: ADD_LEAD_LIST_ERROR,
  payload: { actionType, error },
});


export const MarkasReadLeadlist = (requserdata) => ({
  type: MARK_AS_READ_LEAD_LIST,
  payload: requserdata,
});

export const MarkasReadLeadlistSuccess = (actionType, data) => ({
  type: MARK_AS_READ_LEAD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const MarkasReadLeadlistFail = (actionType, error) => ({
  type: MARK_AS_READ_LEAD_LIST_ERROR,
  payload: { actionType, error },
});

export const Deleteleadlist = (requserdata) => ({
  type: DELETE_LEAD_LIST,
  payload: requserdata,
});

export const DeleteleadlistSuccess = (actionType, data) => ({
  type: DELETE_LEAD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteleadlistFail = (actionType, error) => ({
  type: DELETE_LEAD_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetLeadlist = (requserdata) => ({
  type: RESET_LEAD_LIST,
  payload: requserdata,
});

export const ResetLeadlistSuccess = (actionType, data) => ({
  type: RESET_LEAD_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetLeadlistFail = (actionType, error) => ({
  type: RESET_LEAD_LIST_ERROR,
  payload: { actionType, error },
});