import {
  GET_CUSTOMER_DATA_LIST,
  GET_CUSTOMER_DATA_LIST_SUCCESS,
  GET_CUSTOMER_DATA_LIST_ERROR,

  ADD_CUSTOMER_DATA_LIST,
  ADD_CUSTOMER_DATA_LIST_SUCCESS,
  ADD_CUSTOMER_DATA_LIST_ERROR,

  UPDATE_CUSTOMER_DATA_LIST,
  UPDATE_CUSTOMER_DATA_LIST_SUCCESS,
  UPDATE_CUSTOMER_DATA_LIST_ERROR,
  
  DELETE_CUSTOMER_DATA_LIST,
  DELETE_CUSTOMER_DATA_LIST_SUCCESS,
  DELETE_CUSTOMER_DATA_LIST_ERROR,

  BLOCK_CUSTOMER_DATA_LIST,
  BLOCK_CUSTOMER_DATA_LIST_SUCCESS,
  BLOCK_CUSTOMER_DATA_LIST_ERROR,

  CHECK_CUSTOMER_EXIST_LIST,
  CHECK_CUSTOMER_EXIST_LIST_ERROR,
  CHECK_CUSTOMER_EXIST_LIST_SUCCESS,

  REST_CUSTOMER_DATA_LIST,
  REST_CUSTOMER_DATA_LIST_SUCCESS,
  REST_CUSTOMER_DATA_LIST_ERROR
} from "./actionType";

export const getCustomerDatalist = (requserdata) => ({
  type: GET_CUSTOMER_DATA_LIST,
  payload: requserdata,
});

export const getCustomerDatalistSuccess = (actionType, data) => ({
  type: GET_CUSTOMER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCustomerDatalistFail = (actionType, error) => ({
  type: GET_CUSTOMER_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const AddCustomerDatalist = (requserdata) => ({
  type: ADD_CUSTOMER_DATA_LIST,
  payload: requserdata,
});

export const AddCustomerDatalistSuccess = (actionType, data) => ({
  type: ADD_CUSTOMER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddCustomerDatalistFail = (actionType, error) => ({
  type: ADD_CUSTOMER_DATA_LIST_ERROR,
  payload: { actionType, error },
});



export const UpdateCustomerDatalist = (requserdata) => ({
  type: UPDATE_CUSTOMER_DATA_LIST,
  payload: requserdata,
});

export const UpdateCustomerDatalistSuccess = (actionType, data) => ({
  type: UPDATE_CUSTOMER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateCustomerDatalistFail = (actionType, error) => ({
  type: UPDATE_CUSTOMER_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteCustomerDatalist = (requserdata) => ({
  type: DELETE_CUSTOMER_DATA_LIST,
  payload: requserdata,
});

export const DeleteCustomerDatalistSuccess = (actionType, data) => ({
  type: DELETE_CUSTOMER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteCustomerDatalistFail = (actionType, error) => ({
  type: DELETE_CUSTOMER_DATA_LIST_ERROR,
  payload: { actionType, error },
});


export const ResetCustomerDatalist = (requserdata) => ({
  type: REST_CUSTOMER_DATA_LIST,
  payload: requserdata,
});

export const ResetCustomerDatalistSuccess = (actionType, data) => ({
  type: REST_CUSTOMER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetCustomerDatalistFail = (actionType, error) => ({
  type: REST_CUSTOMER_DATA_LIST_ERROR,
  payload: { actionType, error },
});

export const BlockCustomer = (requserdata) => ({
  type: BLOCK_CUSTOMER_DATA_LIST,
  payload: requserdata,
});

export const BlockCustomerSuccess = (actionType, data) => ({
  type: BLOCK_CUSTOMER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const BlockCustomerFail = (actionType, error) => ({
  type: BLOCK_CUSTOMER_DATA_LIST_ERROR,
  payload: { actionType, error },
});


export const CheckCustomerExist = (requserdata) => ({
  type: CHECK_CUSTOMER_EXIST_LIST,
  payload: requserdata,
});

export const CheckCustomerExistSuccess = (actionType, data) => ({
  type: CHECK_CUSTOMER_EXIST_LIST_SUCCESS,
  payload: { actionType, data },
});

export const CheckCustomerExistFail = (actionType, error) => ({
  type: CHECK_CUSTOMER_EXIST_LIST_ERROR,
  payload: { actionType, error },
});