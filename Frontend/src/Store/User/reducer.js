import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_ERROR,

  GET_USER_VIEW,
  GET_USER_VIEW_ERROR,
  GET_USER_VIEW_SUCCESS,

  ADD_USER_LIST,
  ADD_USER_LIST_ERROR,
  ADD_USER_LIST_SUCCESS,

  DELETE_USER_LIST,
  DELETE_USER_LIST_ERROR,
  DELETE_USER_LIST_SUCCESS,

 UPDATE_USER_DATA_LIST,
 UPDATE_USER_DATA_LIST_ERROR,
 UPDATE_USER_DATA_LIST_SUCCESS,

 RESET_USER_DATA_LIST,
 RESET_USER_DATA_LIST_SUCCESS,
 RESET_USER_DATA_LIST_ERROR,

 CHECK_USER_LIST,
 CHECK_USER_LIST_ERROR,
 CHECK_USER_LIST_SUCCESS,

 GET_PROFILE_DATA_LIST,
 GET_PROFILE_DATA_LIST_SUCCESS,
 GET_PROFILE_DATA_LIST_ERROR,

 UPDATE_PROFILE_DATA_LIST,
 UPDATE_PROFILE_DATA_LIST_SUCCESS,
 UPDATE_PROFILE_DATA_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  UserList: [],
  UserListSize:0,
  TotalUserListData:0,
  CurrentPage:1,
  AddUserlistdata:[],
  UserView: [],
  UpdateUserList: [],
  CheckUserList:[],
  Profileuserdata:[],
  UpdateProfileuserdata:[],
  error: {},
};

const User = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_LIST_SUCCESS:

      switch (action.payload.actionType) {
        case GET_USER_LIST:
          return {
            ...state,
            UserList: action.payload.data,
            UserListSize: action.payload.data.size,
            TotalUserListData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_USER_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_USER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    // get Single Array
    case GET_USER_VIEW_SUCCESS:
      switch (action.payload.actionType) {
        case GET_USER_VIEW:
          return {
            ...state,
            UserView: action.payload.data,
          };
      }
    case GET_USER_VIEW_ERROR:
      switch (action.payload.actionType) {
        case GET_USER_VIEW:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    // Add User
    case ADD_USER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_USER_LIST:
          // console.log("UserList =====>", action.payload.data);
          return {
            ...state,
            AddUserlistdata: action.payload.data,
          };
      }
    case ADD_USER_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_USER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    // Delete User
    case DELETE_USER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_USER_LIST:
          return {
            ...state,
            UserList: action.payload.data,
          };
      }
    case DELETE_USER_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_USER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    // UPdate User
    case UPDATE_USER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case UPDATE_USER_DATA_LIST:
         
          return {
            ...state,
            UpdateUserList: action.payload.data,
          };
      }
    case UPDATE_USER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case UPDATE_USER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    // reset User
    case RESET_USER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case RESET_USER_DATA_LIST:
          return {
            ...state,
            UserList: [],
            UserListSize:0,
            TotalUserListData:0,
            CurrentPage:1,
            UserView: [],
            AddUserlistdata:[],
            UpdateUserList: [],
            UpdateProfileuserdata:[],
            CheckUserList:[],
            error: {},
          };
      }
    case RESET_USER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case RESET_USER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    // Check User
    case CHECK_USER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case CHECK_USER_LIST:
          return {
            ...state,
            CheckUserList: action.payload.data,
          };
      }
    case CHECK_USER_LIST_ERROR:
      switch (action.payload.actionType) {
        case CHECK_USER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case GET_PROFILE_DATA_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case GET_PROFILE_DATA_LIST:
            return {
              ...state,
              Profileuserdata: action.payload.data,
            };
        }
      case GET_PROFILE_DATA_LIST_ERROR:
        switch (action.payload.actionType) {
          case GET_PROFILE_DATA_LIST:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
        }

    case UPDATE_PROFILE_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case UPDATE_PROFILE_DATA_LIST:
          return {
            ...state,
            UpdateProfileuserdata: action.payload.data,
          };
      }
    case UPDATE_PROFILE_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case UPDATE_PROFILE_DATA_LIST:
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

export default User;
