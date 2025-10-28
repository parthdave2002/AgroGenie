import {
  GET_COUPON_LIST,
  GET_COUPON_LIST_SUCCESS,
  GET_COUPON_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Coupondatalist: [],
  error: {},
};

const Coupon = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COUPON_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_COUPON_LIST:
          return {
            ...state,
            Coupondatalist: action.payload.data.data,
          };
      }
    case GET_COUPON_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_COUPON_LIST:
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

export default Coupon;