import {
  GET_COUPON_LIST,
  GET_COUPON_LIST_SUCCESS,
  GET_COUPON_LIST_ERROR,

  ADD_COUPON_LIST,
  ADD_COUPON_LIST_SUCCESS,
  ADD_COUPON_LIST_ERROR,
  
  DELETE_COUPON_LIST,
  DELETE_COUPON_LIST_SUCCESS,
  DELETE_COUPON_LIST_ERROR,

  RESET_COUPON_LIST,
  RESET_COUPON_LIST_SUCCESS,
  RESET_COUPON_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Coupondatalist: [],
  CouponlistSize:0,
  TotalCouponData:0,
  CurrentPage:1,
  AddCoupondatalist: [],
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
            CouponlistSize: action.payload.data.size,
            TotalCouponData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
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
    
    case ADD_COUPON_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_COUPON_LIST:
          return {
            ...state,
            AddCoupondatalist: action.payload.data,
          };
      }
    case ADD_COUPON_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_COUPON_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_COUPON_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_COUPON_LIST:
          return {
            ...state,
            Croplist: action.payload.data,
          };
      }
    case DELETE_COUPON_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_COUPON_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case RESET_COUPON_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_COUPON_LIST:
            return {
              ...state,
              Coupondatalist: [],
              CouponlistSize:0,
              TotalCouponData:0,
              CurrentPage:1,
              AddCoupondatalist: [],
              error: {},
            };
        }
      case RESET_COUPON_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_COUPON_LIST:
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
