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
  UPDATE_PROFILE_DATA_LIST_ERROR,
  UPDATE_PROFILE_DATA_LIST_SUCCESS,

  UPDATE_PROFILE_PASSWORD,
  UPDATE_PROFILE_PASSWORD_ERROR,
  UPDATE_PROFILE_PASSWORD_SUCCESS,

  GET_USER_CATEGORY_VIEW,
  GET_USER_CATEGORY_VIEW_ERROR,
  GET_USER_CATEGORY_VIEW_SUCCESS,

  ADD_USER_CATEGORY_LIST,
  ADD_USER_CATEGORY_LIST_ERROR,
  ADD_USER_CATEGORY_LIST_SUCCESS,

  UPDATE_USER_CATEGORY_LIST,
  UPDATE_USER_CATEGORY_LIST_ERROR,
  UPDATE_USER_CATEGORY_LIST_SUCCESS,

  DELETE_USER_CATEGORY_LIST,
  DELETE_USER_CATEGORY_LIST_ERROR,
  DELETE_USER_CATEGORY_LIST_SUCCESS,
} from "./actionType";

export const getUserlist = (requserdata) => ({
  type: GET_USER_LIST,
  payload: requserdata,
});

export const getUserlistSuccess = (actionType, data) => ({
  type: GET_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getUserlistFail = (actionType, error) => ({
  type: GET_USER_LIST_ERROR,
  payload: { actionType, error },
});

//  get Single Array
export const getUserView = (requserdata) => ({
  type: GET_USER_VIEW,
  payload: requserdata,
});

export const getUserViewSuccess = (actionType, data) => ({
  type: GET_USER_VIEW_SUCCESS,
  payload: { actionType, data },
});

export const getUserViewFail = (actionType, error) => ({
  type: GET_USER_VIEW_ERROR,
  payload: { actionType, error },
});

// Adad User 
export const AddUserlist = (requserdata) => ({
  type: ADD_USER_LIST,
  payload: requserdata,
});

export const AddUserlistSuccess = (actionType, data) => ({
  type: ADD_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddUserlistFail = (actionType, error) => ({
  type: ADD_USER_LIST_ERROR,
  payload: { actionType, error },
});

// Delete user
export const DeleteUserlist = (requserdata) => ({
  type: DELETE_USER_LIST,
  payload: requserdata,
});

export const DeleteUserlistSuccess = (actionType, data) => ({
  type: DELETE_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteUserlistFail = (actionType, error) => ({
  type: DELETE_USER_LIST_ERROR,
  payload: { actionType, error },
});

// Update user
export const UpdateUserdatalist = (requserdata) => ({
  type: UPDATE_USER_DATA_LIST,
  payload: requserdata,
});

export const UpdateUserdatalistSuccess = (actionType, data) => ({
  type: UPDATE_USER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateUserdatalistFail = (actionType, error) => ({
  type: UPDATE_USER_DATA_LIST_ERROR,
  payload: { actionType, error },
});

// Reset user
export const ResetUserdatalist = (requserdata) => ({
  type: RESET_USER_DATA_LIST,
  payload: requserdata,
});

export const ResetUserdatalistSuccess = (actionType, data) => ({
  type: RESET_USER_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetUserdatalistFail = (actionType, error) => ({
  type: RESET_USER_DATA_LIST_ERROR,
  payload: { actionType, error },
});

// Check user
export const CheckUserdatalist = (requserdata) => ({
  type: CHECK_USER_LIST,
  payload: requserdata,
});

export const CheckUserdatalistSuccess = (actionType, data) => ({
  type: CHECK_USER_LIST_SUCCESS,
  payload: { actionType, data },
});

export const CheckUserdatalistFail = (actionType, error) => ({
  type: CHECK_USER_LIST_ERROR,
  payload: { actionType, error },
});

// Profile user
export const ProfileUserdatalist = (requserdata) => ({
  type: GET_PROFILE_DATA_LIST,
  payload: requserdata,
});

export const ProfileUserdatalistSuccess = (actionType, data) => ({
  type: GET_PROFILE_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ProfileUserdatalistFail = (actionType, error) => ({
  type: GET_PROFILE_DATA_LIST_ERROR,
  payload: { actionType, error },
});


// Update Profile Image user
export const UpdateProfileUserdatalist = (requserdata) => ({
  type: UPDATE_PROFILE_DATA_LIST,
  payload: requserdata,
});

export const UpdateProfileUserdatalistSuccess = (actionType, data) => ({
  type: UPDATE_PROFILE_DATA_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateProfileUserdatalistFail = (actionType, error) => ({
  type: UPDATE_PROFILE_DATA_LIST_ERROR,
  payload: { actionType, error },
});

// Update Profile user password
export const UpdateProfilePassword = (requserdata) => ({
  type: UPDATE_PROFILE_PASSWORD,
  payload: requserdata,
});

export const UpdateProfilePasswordSuccess = (actionType, data) => ({
  type: UPDATE_PROFILE_PASSWORD_SUCCESS,
  payload: { actionType, data },
});

export const UpdateProfilePasswordFail = (actionType, error) => ({
  type: UPDATE_PROFILE_PASSWORD_ERROR,
  payload: { actionType, error },
});

export const getUserCategoryView = (requserdata) => ({
  type: GET_USER_CATEGORY_VIEW,
  payload: requserdata,
});

export const getUserCategoryViewSuccess = (actionType, data) => ({
  type: GET_USER_CATEGORY_VIEW_SUCCESS,
  payload: { actionType, data },
});

export const getUserCategoryViewFail = (actionType, error) => ({
  type: GET_USER_CATEGORY_VIEW_ERROR,
  payload: { actionType, error },
});

export const AddUserCategorylist = (requserdata) => ({
  type: ADD_USER_CATEGORY_LIST,
  payload: requserdata,
});

export const AddUserCategorylistSuccess = (actionType, data) => ({
  type: ADD_USER_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddUserCategorylistFail = (actionType, error) => ({
  type: ADD_USER_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});

export const UpdateUserCategorylist = (requserdata) => ({
  type: UPDATE_USER_CATEGORY_LIST,
  payload: requserdata,
}); 

export const UpdateUserCategorylistSuccess = (actionType, data) => ({
  type: UPDATE_USER_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const UpdateUserCategorylistFail = (actionType, error) => ({
  type: UPDATE_USER_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteUserCategorylist = (requserdata) => ({
  type: DELETE_USER_CATEGORY_LIST,
  payload: requserdata,
});

export const DeleteUserCategorylistSuccess = (actionType, data) => ({
  type: DELETE_USER_CATEGORY_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteUserCategorylistFail = (actionType, error) => ({
  type: DELETE_USER_CATEGORY_LIST_ERROR,
  payload: { actionType, error },
});