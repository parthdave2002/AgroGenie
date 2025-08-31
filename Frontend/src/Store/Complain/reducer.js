import {
  GET_COMPLAIN_LIST,
  GET_COMPLAIN_LIST_SUCCESS,
  GET_COMPLAIN_LIST_ERROR,

  GET_FARMER_COMPLAIN_LIST,
  GET_FARMER_COMPLAIN_LIST_SUCCESS,
  GET_FARMER_COMPLAIN_LIST_ERROR,

  GET_SALES_COMPLAIN_LIST,
  GET_SALES_COMPLAIN_LIST_ERROR,
  GET_SALES_COMPLAIN_LIST_SUCCESS,

  GET_COMPLAIN_DETAILS_LIST,
  GET_COMPLAIN_DETAILS_LIST_ERROR,
  GET_COMPLAIN_DETAILS_LIST_SUCCESS,

  ADD_COMPLAIN_LIST,
  ADD_COMPLAIN_LIST_SUCCESS,
  ADD_COMPLAIN_LIST_ERROR,

  UPDATE_COMPLAIN_LIST,
  UPDATE_COMPLAIN_LIST_SUCCESS,
  UPDATE_COMPLAIN_LIST_ERROR,
  
  DELETE_COMPLAIN_LIST,
  DELETE_COMPLAIN_LIST_SUCCESS,
  DELETE_COMPLAIN_LIST_ERROR,

  REST_COMPLAIN_LIST,
  REST_COMPLAIN_LIST_SUCCESS,
  REST_COMPLAIN_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Complainlist: [],
  ComplainlistSize:0,
  TotalComplainData:0,
  CurrentPage:1,
  AddComplainlist: [],
  updateComplainlist: [],
  DeleteComplainlist: [],
  SingleComplainlist: [],
  SinglefarmerComplainlist:[],
  SalesComplainlist:[],
  SalesComplainlistSize : 0,
  TotalSalesComplainData: 0,
  SalesCurrentPage:1,
  error: {},
};

const Complain = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPLAIN_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_COMPLAIN_LIST:
          return {
            ...state,
            Complainlist: action.payload.data.data,
            ComplainlistSize: action.payload.data.size,
            TotalComplainData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_COMPLAIN_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_COMPLAIN_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      case GET_SALES_COMPLAIN_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case GET_SALES_COMPLAIN_LIST:
            return {
              ...state,
              SalesComplainlist: action.payload.data.data,
              SalesComplainlistSize: action.payload.data.size,
              TotalSalesComplainData: action.payload.data.totalData,
              SalesCurrentPage: action.payload.data.page,
            };
        }
      case GET_SALES_COMPLAIN_LIST_ERROR:
        switch (action.payload.actionType) {
          case GET_SALES_COMPLAIN_LIST:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }
  

    case GET_COMPLAIN_DETAILS_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_COMPLAIN_DETAILS_LIST:
          return {
            ...state,
            SingleComplainlist: action.payload.data,
          };
      }
    case GET_COMPLAIN_DETAILS_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_COMPLAIN_DETAILS_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      case GET_FARMER_COMPLAIN_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case GET_FARMER_COMPLAIN_LIST:
            return {
              ...state,
              SinglefarmerComplainlist: action.payload.data,
            };
        }
      case GET_FARMER_COMPLAIN_LIST_ERROR:
        switch (action.payload.actionType) {
          case GET_FARMER_COMPLAIN_LIST:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }

    case ADD_COMPLAIN_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_COMPLAIN_LIST:
          return {
            ...state,
            AddComplainlist: action.payload.data,
          };
      }
    case ADD_COMPLAIN_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_COMPLAIN_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case UPDATE_COMPLAIN_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case UPDATE_COMPLAIN_LIST:
          return {
            ...state,
            updateComplainlist: action.payload.data,
          };
      }
    case UPDATE_COMPLAIN_LIST_ERROR:
      switch (action.payload.actionType) {
        case UPDATE_COMPLAIN_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_COMPLAIN_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_COMPLAIN_LIST:
          return {
            ...state,
            DeleteComplainlist: action.payload.data,
          };
      }
    case DELETE_COMPLAIN_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_COMPLAIN_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case REST_COMPLAIN_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case REST_COMPLAIN_LIST:
          return {
            ...state,
            Complainlist: [],
            ComplainlistSize: 0,
            TotalComplainData: 0,
            CurrentPage: 1,
            AddComplainlist: [],
            DeleteComplainlist: [],
            updateComplainlist :[],
            SalesComplainlist:[],
            SalesComplainlistSize : 0,
            TotalSalesComplainData: 0,
            SalesCurrentPage:1,
            error: {},
          };
      }
    case REST_COMPLAIN_LIST_ERROR:
      switch (action.payload.actionType) {
        case REST_COMPLAIN_LIST:
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

export default Complain;
