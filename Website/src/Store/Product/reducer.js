import {

  GET_RELATED_PRODUCT_LIST,
  GET_RELATED_PRODUCT_LIST_SUCCESS,
  GET_RELATED_PRODUCT_LIST_ERROR,

  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,

  GET_PRODUCT_VIEW_LIST,
  GET_PRODUCT_VIEW_LIST_SUCCESS,
  GET_PRODUCT_VIEW_LIST_ERROR,

  RESET_PRODUCT_LIST,
  RESET_PRODUCT_LIST_SUCCESS,
  RESET_PRODUCT_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Productlist: [],
  ProductlistSize:0,
  TotalProductData:0,
  CurrentPage:1,
  singleProductlist:[],
  error: {},
};

const Product = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_RELATED_PRODUCT_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_RELATED_PRODUCT_LIST:
          return {
            ...state,
            Productlist: action.payload.data.data,
            ProductlistSize: action.payload.data.size,
            TotalProductData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_RELATED_PRODUCT_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_RELATED_PRODUCT_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case GET_PRODUCT_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_PRODUCT_LIST:
          return {
            ...state,
            Productlist: action.payload.data,
            ProductlistSize: action.payload.data.size,
            TotalProductData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_PRODUCT_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_PRODUCT_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      case GET_PRODUCT_VIEW_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case GET_PRODUCT_VIEW_LIST:
            return {
              ...state,
              singleProductlist: action.payload.data,
            };
        }
      case GET_PRODUCT_VIEW_LIST_ERROR:
        switch (action.payload.actionType) {
          case GET_PRODUCT_VIEW_LIST:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

      case RESET_PRODUCT_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_PRODUCT_LIST:
            return {
              ...state,
              Productlist: [],
              ProductlistSize:0,
              TotalProductData:0,
              CurrentPage:1,
              singleProductlist:[],
              error: {},
            };
        }
      case RESET_PRODUCT_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_PRODUCT_LIST:
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

export default Product;
