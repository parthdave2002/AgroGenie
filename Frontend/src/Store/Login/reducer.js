import {
  INSERT_LOGIN,
  INSERT_LOGIN_SUCCESS,
  INSERT_LOGIN_ERROR,

  RESET_INSERT_LOGIN,
  RESET_INSERT_LOGIN_SUCCESS,

  FORGOT_PASSWORD_DATA,
  FORGOT_PASSWORD_DATA_ERROR,
  FORGOT_PASSWORD_DATA_SUCCESS,

  VERIFY_TOKEN_DATA,
  VERIFY_TOKEN_DATA_ERROR,
  VERIFY_TOKEN_DATA_SUCCESS,

  RESET_PASSWORD_DATA,
  RESET_PASSWORD_DATA_ERROR,
  RESET_PASSWORD_DATA_SUCCESS,

  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,

  RESET_INSERT_LOGOUT,
  RESET_INSERT_LOGOUT_SUCCESS,
  } from "./actionType";
  
  const INIT_STATE = {
    Logincode: [],
    LoginRoles:[],
    Logoutcode:[],
    Verifytoken:[],
    resetpassword:[],
    permissionsdata:[],
    forgotpasscode:[],
    error: {},
  };
  
  const Login = (state = INIT_STATE, action) => {
    switch (action.type) {
      case INSERT_LOGIN_SUCCESS:
        switch (action.payload.actionType) {
          case INSERT_LOGIN:
            return {
              ...state,
              Logincode: action.payload.data,
              LoginRoles: action.payload.data.roles,
              permissionsdata: action.payload.data?.data?.rolePermissions,
            };
        }
      case INSERT_LOGIN_ERROR:
        switch (action.payload.actionType) {
          case INSERT_LOGIN:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

      case RESET_INSERT_LOGIN_SUCCESS:
          switch (action.payload.actionType) {
            case RESET_INSERT_LOGIN:
             
              return {
                ...state,
                Logincode: [],
                forgotpasscode:[],
                Verifytoken:[],
                resetpassword:[],
              };
        }

      case VERIFY_TOKEN_DATA_SUCCESS:
          switch (action.payload.actionType) {
            case VERIFY_TOKEN_DATA:
              return {
                ...state,
                Verifytoken: action.payload.data,
              };
        }
      case VERIFY_TOKEN_DATA_ERROR:
          switch (action.payload.actionType) {
            case VERIFY_TOKEN_DATA:
              // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
              return {
                ...state,
                error: action.payload,
              };
    
            default:
              return { ...state };
        }

        case RESET_PASSWORD_DATA_SUCCESS:
          switch (action.payload.actionType) {
            case RESET_PASSWORD_DATA:
              return {
                ...state,
                resetpassword: action.payload.data,
              };
        }
      case RESET_PASSWORD_DATA_ERROR:
          switch (action.payload.actionType) {
            case RESET_PASSWORD_DATA:
              // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
              return {
                ...state,
                error: action.payload,
              };
    
            default:
              return { ...state };
        }
       
      case LOGOUT_SUCCESS:
        switch (action.payload.actionType) {
          case LOGOUT:
            return {
              ...state,
              Logoutcode: action.payload.data,
            };
        }
      case LOGOUT_ERROR:
        switch (action.payload.actionType) {
          case LOGOUT:
            // console.log("CREATE_GROUP_SUCCESS =====>", action.payload);
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

      case RESET_INSERT_LOGOUT_SUCCESS:
          switch (action.payload.actionType) {
            case RESET_INSERT_LOGOUT:
             
              return {
                ...state,
                Logoutcode: [],
                forgotpasscode:[],
              };
        }

        case FORGOT_PASSWORD_DATA_SUCCESS:
          switch (action.payload.actionType) {
            case FORGOT_PASSWORD_DATA:
              return {
                ...state,
                forgotpasscode: action.payload.data,
              };
          }
        case FORGOT_PASSWORD_DATA_ERROR:
          switch (action.payload.actionType) {
            case FORGOT_PASSWORD_DATA:
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
  
  export default Login;