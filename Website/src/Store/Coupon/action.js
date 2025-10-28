import {
  GET_COUPON_LIST,
  GET_COUPON_LIST_SUCCESS,
  GET_COUPON_LIST_ERROR,
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