import {
  GET_ROLES_ACCESS_LIST,
  GET_ROLES_ACCESS_LIST_SUCCESS,
  GET_ROLES_ACCESS_LIST_ERROR,

  SAVE_ROLES_ACCESS_LIST,
  SAVE_ROLES_ACCESS_LIST_ERROR,
  SAVE_ROLES_ACCESS_LIST_SUCCESS,

  RESET_ROLES_ACCESS_LIST,
  RESET_ROLES_ACCESS_LIST_SUCCESS,
  RESET_ROLES_ACCESS_LIST_ERROR
} from "./actionType";


// Get Role  
export const getRolesAccesslist = (requserdata) => ({
  type: GET_ROLES_ACCESS_LIST,
  payload: requserdata,
});

export const getRolesAccesslistSuccess = (actionType, data) => ({
  type: GET_ROLES_ACCESS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getRolesAccesslistFail = (actionType, error) => ({
  type: GET_ROLES_ACCESS_LIST_ERROR,
  payload: { actionType, error },
});

// Save Role Access 
export const SaveRolesAccesslist = (requserdata) => ({
  type: SAVE_ROLES_ACCESS_LIST,
  payload: requserdata,
});

export const SaveRolesAccesslistSuccess = (actionType, data) => ({
  type: SAVE_ROLES_ACCESS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const SaveRolesAccesslistFail = (actionType, error) => ({
  type: SAVE_ROLES_ACCESS_LIST_ERROR,
  payload: { actionType, error },
});


// Reset Role Access 
export const ResetRolesAccesslist = (requserdata) => ({
  type: RESET_ROLES_ACCESS_LIST,
  payload: requserdata,
});

export const ResetRolesAccesslistSuccess = (actionType, data) => ({
  type: RESET_ROLES_ACCESS_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetRolesAccesslistFail = (actionType, error) => ({
  type: RESET_ROLES_ACCESS_LIST_ERROR,
  payload: { actionType, error },
});