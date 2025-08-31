import {

  GET_UPDATE_ORDER_LIST,
  GET_UPDATE_ORDER_LIST_SUCCESS,
  GET_UPDATE_ORDER_LIST_ERROR,

  GET_ORDER_LIST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_ERROR,

  GET_ORDER_DETAILS_LIST,
  GET_ORDER_DETAILS_LIST_SUCCESS,
  GET_ORDER_DETAILS_LIST_ERROR,

  RESET_ORDER_LIST,
  RESET_ORDER_LIST_SUCCESS,
  RESET_ORDER_LIST_ERROR,

  ADD_ORDER_LIST,
  ADD_ORDER_LIST_SUCCESS,
  ADD_ORDER_LIST_ERROR,
  
  DELETE_ORDER_LIST,
  DELETE_ORDER_LIST_SUCCESS,
  DELETE_ORDER_LIST_ERROR,

  GET_FARMER_ORDER_LIST,
  GET_FARMER_ORDER_LIST_SUCCESS,
  GET_FARMER_ORDER_LIST_ERROR,

  GET_SALES_EXECUTIVE_ORDER_LIST,
  GET_SALES_EXECUTIVE_ORDER_LIST_ERROR,
  GET_SALES_EXECUTIVE_ORDER_LIST_SUCCESS,

  RETURN_ORDER_LIST,
  RETURN_ORDER_LIST_ERROR,
  RETURN_ORDER_LIST_SUCCESS
} from "./actionType";

const INIT_STATE = {
  Orderlist: [],
  SingleOrderlist:[],
  OrderlistSize:0,
  TotalOrderData:0,
  CurrentPage:1,
  DeleteOrderlist:[],
  AddOrderdatalist:[],
  SingleFarmerOrderlist:[],
  SalesExeOrderlist:[],
  UpdateOrderlist:[],
  ReturnOrderdatalist:[],
  error: {},
};

const Order = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_UPDATE_ORDER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_UPDATE_ORDER_LIST:
          return {
            ...state,
            UpdateOrderlist: action.payload.data,
          };
      }
    case GET_UPDATE_ORDER_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_UPDATE_ORDER_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case GET_ORDER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ORDER_LIST:
          return {
            ...state,
            Orderlist: action.payload.data.data,
            OrderlistSize: action.payload.data.size,
            TotalOrderData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_ORDER_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_ORDER_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_ORDER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_ORDER_LIST:
          return {
            ...state,
            AddOrderdatalist: action.payload.data,
          };
      }
    case ADD_ORDER_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_ORDER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_ORDER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_ORDER_LIST:
          return {
            ...state,
            DeleteOrderlist: action.payload.data,
          };
      }
    case DELETE_ORDER_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_ORDER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case GET_ORDER_DETAILS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ORDER_DETAILS_LIST:
          return {
            ...state,
            SingleOrderlist: action.payload.data,
          };
      }
    case GET_ORDER_DETAILS_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_ORDER_DETAILS_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      case GET_FARMER_ORDER_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case GET_FARMER_ORDER_LIST:
            return {
              ...state,
              SingleFarmerOrderlist: action.payload.data,
            };
        }
      case GET_FARMER_ORDER_LIST_ERROR:
        switch (action.payload.actionType) {
          case GET_FARMER_ORDER_LIST:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

        case GET_SALES_EXECUTIVE_ORDER_LIST_SUCCESS:
          switch (action.payload.actionType) {
            case GET_SALES_EXECUTIVE_ORDER_LIST:
              return {
                ...state,
                SalesExeOrderlist: action.payload.data,
              };
          }
        case GET_SALES_EXECUTIVE_ORDER_LIST_ERROR:
          switch (action.payload.actionType) {
            case GET_SALES_EXECUTIVE_ORDER_LIST:
              return {
                ...state,
                error: action.payload,
              };
            default:
              return { ...state };
          }

          case RETURN_ORDER_LIST_SUCCESS:
          switch (action.payload.actionType) {
            case RETURN_ORDER_LIST:
              return {
                ...state,
                ReturnOrderdatalist: action.payload.data,
              };
          }
        case RETURN_ORDER_LIST_ERROR:
          switch (action.payload.actionType) {
            case RETURN_ORDER_LIST:
              return {
                ...state,
                error: action.payload,
              };
            default:
              return { ...state };
          }

    case RESET_ORDER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case RESET_ORDER_LIST:
          return {
            ...state,
            Orderlist: [],
            SingleOrderlist:[],
            OrderlistSize:0,
            TotalOrderData:0,
            CurrentPage:1,
            DeleteOrderlist:[],
            AddOrderdatalist:[],
            SingleFarmerOrderlist:[],
            UpdateOrderlist:[],
            ReturnOrderdatalist:[]
          };
      }
 
    default:
      return state;
  }
};

export default Order;
