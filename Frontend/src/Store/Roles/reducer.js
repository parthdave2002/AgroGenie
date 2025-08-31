import {
  GET_ROLES_LIST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_ERROR,
  ADD_ROLES_LIST,
  ADD_ROLES_LIST_ERROR,
  ADD_ROLES_LIST_SUCCESS,
  GET_RESET_ROLES_LIST,
  GET_RESET_ROLES_LIST_ERROR,
  GET_RESET_ROLES_LIST_SUCCESS,
} from "./actionType";

const INIT_STATE = {
  Roleslist: [],
  RoleListSize:0,
  TotalRoleListData:0,
  CurrentPage:1,
  AddRoleslist: [],
  error: {},
};

const Role = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ROLES_LIST:
  
          return {
            ...state,
            Roleslist: action.payload.data.data,
            RoleListSize: action.payload.data.size,
            TotalRoleListData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_ROLES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_ROLES_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Get Single Array Response
    case ADD_ROLES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_ROLES_LIST:
          return {
            ...state,
            AddRoleslist: action.payload.data,
          };
      }
    case ADD_ROLES_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_ROLES_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    // Search Role
    case GET_RESET_ROLES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_RESET_ROLES_LIST:
          return {
            ...state,
              Roleslist: [],
              RoleListSize:0,
              TotalRoleListData:0,
              CurrentPage:1,
              AddRoleslist: [],
              error: {},
          };
      }
    case GET_RESET_ROLES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_RESET_ROLES_LIST:
          // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
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

export default Role;
