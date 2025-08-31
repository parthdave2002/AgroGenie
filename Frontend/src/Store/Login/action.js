import  {
  INSERT_LOGIN,
  INSERT_LOGIN_SUCCESS,
  INSERT_LOGIN_ERROR,

  RESET_INSERT_LOGIN,
  RESET_INSERT_LOGIN_ERROR,
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
  RESET_INSERT_LOGOUT_SUCCESS

} from "./actionType"
  
    export const insertlogin = (requserdata) => ({
      type: INSERT_LOGIN,
      payload: requserdata
    });
    
    export const insertloginSuccess = (actionType,data) => ({
      type: INSERT_LOGIN_SUCCESS,
      payload: {actionType,data},
    });
    
    export const insertloginFail = (actionType,error) => ({
      type: INSERT_LOGIN_ERROR,
      payload: {actionType,error},
    });

    // Reset Login
    export const resetinsertlogin = (requserdata) => ({
      type: RESET_INSERT_LOGIN,
      payload: requserdata
    });
    
    export const resetinsertloginSuccess = (actionType,data) => ({
      type: RESET_INSERT_LOGIN_SUCCESS,
      payload: {actionType,data},
    });

// Logout
    export const logout = (requserdata) => ({
      type: LOGOUT,
      payload: requserdata
    });
    
    export const logoutSuccess = (actionType,data) => ({
      type: LOGOUT_SUCCESS,
      payload: {actionType,data},
    });
    
    export const logoutFail = (actionType,error) => ({
      type: LOGOUT_ERROR,
      payload: {actionType,error},
    });

    // Reset LogOut
    export const resetinsertlogout = (requserdata) => ({
      type: RESET_INSERT_LOGOUT,
      payload: requserdata
    });
    
    export const resetinsertLogoutSuccess = (actionType,data) => ({
      type: RESET_INSERT_LOGOUT_SUCCESS,
      payload: {actionType,data},
    });

    export const VerifyTokenData = (requserdata) => ({
      type: VERIFY_TOKEN_DATA,
      payload: requserdata
    });
    
    export const VerifyTokenDataSuccess = (actionType,data) => ({
      type: VERIFY_TOKEN_DATA_SUCCESS,
      payload: {actionType,data},
    });
    
    export const VerifyTokenDataFail = (actionType,error) => ({
      type: VERIFY_TOKEN_DATA_ERROR,
      payload: {actionType,error},
    });


    // Reset password
    export const resetpasswordData = (requserdata) => ({
      type: RESET_PASSWORD_DATA,
      payload: requserdata
    });
    
    export const resetpasswordDataSuccess = (actionType,data) => ({
      type: RESET_PASSWORD_DATA_SUCCESS,
      payload: {actionType,data},
    });
    
    export const resetpasswordDataFail = (actionType,error) => ({
      type: RESET_PASSWORD_DATA_ERROR,
      payload: {actionType,error},
    });

    // forgot password
    export const forgotpasswordData = (requserdata) => ({
        type: FORGOT_PASSWORD_DATA,
        payload: requserdata
    });
      
      export const forgotpasswordDataSuccess = (actionType,data) => ({
        type: FORGOT_PASSWORD_DATA_SUCCESS,
        payload: {actionType,data},
      });
      
      export const forgotpasswordDataFail = (actionType,error) => ({
        type: FORGOT_PASSWORD_DATA_ERROR,
        payload: {actionType,error},
      });