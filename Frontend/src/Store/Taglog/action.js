import {
  GET_TAGLOG_LIST,
  GET_TAGLOG_LIST_SUCCESS,
  GET_TAGLOG_LIST_ERROR,

  ADD_TAGLOG_LIST,
  ADD_TAGLOG_LIST_SUCCESS,
  ADD_TAGLOG_LIST_ERROR,

  CHANGE_STATUS_TAGLOG_LIST,
  CHANGE_STATUS_TAGLOG_LIST_SUCCESS,
  CHANGE_STATUS_TAGLOG_LIST_ERROR,
  
  DELETE_TAGLOG_LIST,
  DELETE_TAGLOG_LIST_SUCCESS,
  DELETE_TAGLOG_LIST_ERROR,

  GET_SUB_TAGLOG_LIST,
  GET_SUB_TAGLOG_LIST_SUCCESS,
  GET_SUB_TAGLOG_LIST_ERROR,

  ADD_SUB_TAGLOG_LIST,
  ADD_SUB_TAGLOG_LIST_SUCCESS,
  ADD_SUB_TAGLOG_LIST_ERROR,

  CHANGE_STATUS_SUB_TAGLOG_LIST,
  CHANGE_STATUS_SUB_TAGLOG_LIST_SUCCESS,
  CHANGE_STATUS_SUB_TAGLOG_LIST_ERROR,
  
  DELETE_SUB_TAGLOG_LIST,
  DELETE_SUB_TAGLOG_LIST_SUCCESS,
  DELETE_SUB_TAGLOG_LIST_ERROR,

  GET_CUSTOMER_TAGLOG_LIST,
  GET_CUSTOMER_TAGLOG_LIST_SUCCESS,
  GET_CUSTOMER_TAGLOG_LIST_ERROR,

  ADD_CUSTOMER_TAGLOG_LIST,
  ADD_CUSTOMER_TAGLOG_LIST_SUCCESS,
  ADD_CUSTOMER_TAGLOG_LIST_ERROR,

  REST_TAGLOG_LIST,
  REST_TAGLOG_LIST_SUCCESS,
  REST_TAGLOG_LIST_ERROR
} from "./actionType";

export const getTagloglist = (requserdata) => ({
  type: GET_TAGLOG_LIST,
  payload: requserdata,
});

export const getTagloglistSuccess = (actionType, data) => ({
  type: GET_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getTagloglistFail = (actionType, error) => ({
  type: GET_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const AddTagloglist = (requserdata) => ({
  type: ADD_TAGLOG_LIST,
  payload: requserdata,
});

export const AddTagloglistSuccess = (actionType, data) => ({
  type: ADD_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddTagloglistFail = (actionType, error) => ({
  type: ADD_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteTagloglist = (requserdata) => ({
  type: DELETE_TAGLOG_LIST,
  payload: requserdata,
});

export const DeleteTagloglistSuccess = (actionType, data) => ({
  type: DELETE_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteTagloglistFail = (actionType, error) => ({
  type: DELETE_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const ChangeStatusTagloglist = (requserdata) => ({
  type: CHANGE_STATUS_TAGLOG_LIST,
  payload: requserdata,
});

export const ChangeStatusTagloglistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangeStatusTagloglistFail = (actionType, error) => ({
  type: CHANGE_STATUS_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const getSubTagloglist = (requserdata) => ({
  type: GET_SUB_TAGLOG_LIST,
  payload: requserdata,
});

export const getSubTagloglistSuccess = (actionType, data) => ({
  type: GET_SUB_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getSubTagloglistFail = (actionType, error) => ({
  type: GET_SUB_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const AddSubTagloglist = (requserdata) => ({
  type: ADD_SUB_TAGLOG_LIST,
  payload: requserdata,
});

export const AddSubTagloglistSuccess = (actionType, data) => ({
  type: ADD_SUB_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddSubTagloglistFail = (actionType, error) => ({
  type: ADD_SUB_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteSubTagloglist = (requserdata) => ({
  type: DELETE_SUB_TAGLOG_LIST,
  payload: requserdata,
});

export const DeleteSubTagloglistSuccess = (actionType, data) => ({
  type: DELETE_SUB_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteSubTagloglistFail = (actionType, error) => ({
  type: DELETE_SUB_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const ChangeStatusSubTagloglist = (requserdata) => ({
  type: CHANGE_STATUS_SUB_TAGLOG_LIST,
  payload: requserdata,
});

export const ChangeStatusSubTagloglistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_SUB_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangeStatusSubTagloglistFail = (actionType, error) => ({
  type: CHANGE_STATUS_SUB_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});


export const getCustomerTagloglist = (requserdata) => ({
  type: GET_CUSTOMER_TAGLOG_LIST,
  payload: requserdata,
});

export const getCustomerTagloglistSuccess = (actionType, data) => ({
  type: GET_CUSTOMER_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCustomerTagloglistFail = (actionType, error) => ({
  type: GET_CUSTOMER_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const AddCustomerTagloglist = (requserdata) => ({
  type: ADD_CUSTOMER_TAGLOG_LIST,
  payload: requserdata,
});

export const AddCustomerTagloglistSuccess = (actionType, data) => ({
  type: ADD_CUSTOMER_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddCustomerTagloglistFail = (actionType, error) => ({
  type: ADD_CUSTOMER_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetTagloglist = (requserdata) => ({
  type: REST_TAGLOG_LIST,
  payload: requserdata,
});

export const ResetTagloglistSuccess = (actionType, data) => ({
  type: REST_TAGLOG_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetTagloglistFail = (actionType, error) => ({
  type: REST_TAGLOG_LIST_ERROR,
  payload: { actionType, error },
});
