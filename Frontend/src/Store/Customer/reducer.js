import {
  GET_CUSTOMER_DATA_LIST,
  GET_CUSTOMER_DATA_LIST_SUCCESS,
  GET_CUSTOMER_DATA_LIST_ERROR,

  ADD_CUSTOMER_DATA_LIST,
  ADD_CUSTOMER_DATA_LIST_SUCCESS,
  ADD_CUSTOMER_DATA_LIST_ERROR,

  UPDATE_CUSTOMER_DATA_LIST,
  UPDATE_CUSTOMER_DATA_LIST_SUCCESS,
  UPDATE_CUSTOMER_DATA_LIST_ERROR,
  
  DELETE_CUSTOMER_DATA_LIST,
  DELETE_CUSTOMER_DATA_LIST_SUCCESS,
  DELETE_CUSTOMER_DATA_LIST_ERROR,

  BLOCK_CUSTOMER_DATA_LIST,
  BLOCK_CUSTOMER_DATA_LIST_SUCCESS,
  BLOCK_CUSTOMER_DATA_LIST_ERROR,

  CHECK_CUSTOMER_EXIST_LIST,
  CHECK_CUSTOMER_EXIST_LIST_ERROR,
  CHECK_CUSTOMER_EXIST_LIST_SUCCESS,

  REST_CUSTOMER_DATA_LIST,
  REST_CUSTOMER_DATA_LIST_SUCCESS,
  REST_CUSTOMER_DATA_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Customerlist: [],
  CustomerlistSize:0,
  TotalCustomerData:0,
  CurrentPage:1,
  AddCustomerlist: [],
  UpdateCustomerlist:[],
  DeleteCustomerlist: [],
  BlockCustomerlist:[],
  CheckCustomerExistlist:[],
  error: {},
};

const Customer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CUSTOMER_DATA_LIST:
          return {
            ...state,
            Customerlist: action.payload.data.data,
            CustomerlistSize: action.payload.data.size,
            TotalCustomerData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_CUSTOMER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_CUSTOMER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case ADD_CUSTOMER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_CUSTOMER_DATA_LIST:
          return {
            ...state,
            AddCustomerlist: action.payload.data,
          };
      }
    case ADD_CUSTOMER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_CUSTOMER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case UPDATE_CUSTOMER_DATA_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case UPDATE_CUSTOMER_DATA_LIST:
            return {
              ...state,
              UpdateCustomerlist: action.payload.data,
            };
        }
      case UPDATE_CUSTOMER_DATA_LIST_ERROR:
        switch (action.payload.actionType) {
          case UPDATE_CUSTOMER_DATA_LIST:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
        }


    case DELETE_CUSTOMER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_CUSTOMER_DATA_LIST:
          return {
            ...state,
            DeleteCustomerlist: action.payload.data,
          };
      }
    case DELETE_CUSTOMER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_CUSTOMER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case REST_CUSTOMER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case REST_CUSTOMER_DATA_LIST:
          return {
            ...state,
            Customerlist: [],
            CustomerlistSize: 0,
            TotalCustomerData: 0,
            CurrentPage: 1,
            AddCustomerlist: [],
            UpdateCustomerlist:[],
            DeleteCustomerlist: [],
            CheckCustomerExistlist:[],
            error: {},
          };
      }
    case REST_CUSTOMER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case REST_CUSTOMER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case BLOCK_CUSTOMER_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case BLOCK_CUSTOMER_DATA_LIST:
          return {
            ...state,
            BlockCustomerlist: action.payload.data,
          };
      }
    case BLOCK_CUSTOMER_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case BLOCK_CUSTOMER_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }
    
    case CHECK_CUSTOMER_EXIST_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case CHECK_CUSTOMER_EXIST_LIST:
          return {
            ...state,
            CheckCustomerExistlist: action.payload.data,
          };
      }
    case CHECK_CUSTOMER_EXIST_LIST_ERROR:
      switch (action.payload.actionType) {
        case CHECK_CUSTOMER_EXIST_LIST:
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

export default Customer;
