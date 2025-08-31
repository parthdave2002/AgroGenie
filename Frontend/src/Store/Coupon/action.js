import {
  GET_COUPON_LIST,
  GET_COUPON_LIST_SUCCESS,
  GET_COUPON_LIST_ERROR,

  ADD_COUPON_LIST,
  ADD_COUPON_LIST_SUCCESS,
  ADD_COUPON_LIST_ERROR,

  CHANGE_STATUS_COUPON_LIST,
  CHANGE_STATUS_COUPON_LIST_ERROR,
  CHANGE_STATUS_COUPON_LIST_SUCCESS,
  
  DELETE_COUPON_LIST,
  DELETE_COUPON_LIST_SUCCESS,
  DELETE_COUPON_LIST_ERROR,

  RESET_COUPON_LIST,
  RESET_COUPON_LIST_SUCCESS,
  RESET_COUPON_LIST_ERROR
} from "./actionType";

export const getCouponlist = (requserdata) => ({
  type: GET_COUPON_LIST,
  payload: requserdata,
});

export const getCouponlistSuccess = (actionType, data) => ({
  type: GET_COUPON_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getCouponlistFail = (actionType, error) => ({
  type: GET_COUPON_LIST_ERROR,
  payload: { actionType, error },
});

export const AddCouponlist = (requserdata) => ({
  type: ADD_COUPON_LIST,
  payload: requserdata,
});

export const AddCouponlistSuccess = (actionType, data) => ({
  type: ADD_COUPON_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddCouponlistFail = (actionType, error) => ({
  type: ADD_COUPON_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteCouponlist = (requserdata) => ({
  type: DELETE_COUPON_LIST,
  payload: requserdata,
});

export const DeleteCouponlistSuccess = (actionType, data) => ({
  type: DELETE_COUPON_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteCouponlistFail = (actionType, error) => ({
  type: DELETE_COUPON_LIST_ERROR,
  payload: { actionType, error },
});


export const ChangestatusCouponlist = (requserdata) => ({
  type: CHANGE_STATUS_COUPON_LIST,
  payload: requserdata,
});

export const ChangestatusCouponlistSuccess = (actionType, data) => ({
  type: CHANGE_STATUS_COUPON_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ChangestatusCouponlistFail = (actionType, error) => ({
  type: CHANGE_STATUS_COUPON_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetCouponlist = (requserdata) => ({
  type: RESET_COUPON_LIST,
  payload: requserdata,
});

export const ResetCouponlistSuccess = (actionType, data) => ({
  type: RESET_COUPON_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetCouponlistFail = (actionType, error) => ({
  type: RESET_COUPON_LIST_ERROR,
  payload: { actionType, error },
});
