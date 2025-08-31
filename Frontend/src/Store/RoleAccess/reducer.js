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

const INIT_STATE = {
  GetRolesAccesslist: [],
  SaveRolesAccesslist: [],
  error: {},
};

const RoleAccess = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES_ACCESS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ROLES_ACCESS_LIST:
          return {
            ...state,
            GetRolesAccesslist: action.payload.data,
          };
      }
    case GET_ROLES_ACCESS_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_ROLES_ACCESS_LIST:
         
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case SAVE_ROLES_ACCESS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case SAVE_ROLES_ACCESS_LIST:
          return {
            ...state,
            SaveRolesAccesslist: action.payload.data,
          };
      }
    case SAVE_ROLES_ACCESS_LIST_ERROR:
      switch (action.payload.actionType) {
        case SAVE_ROLES_ACCESS_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case RESET_ROLES_ACCESS_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_ROLES_ACCESS_LIST:
            return {
              ...state,
              RolesAccesslist: [],
              SaveRolesAccesslist: [],
            };
      }
    case RESET_ROLES_ACCESS_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_ROLES_ACCESS_LIST:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
      }

    default:
      return state;
  }
};

export default RoleAccess;
