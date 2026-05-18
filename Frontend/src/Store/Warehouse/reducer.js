import {
  GET_WAREHOUSE_LIST,
  GET_WAREHOUSE_LIST_SUCCESS,
  GET_WAREHOUSE_LIST_ERROR,

  ADD_WAREHOUSE_LIST,
  ADD_WAREHOUSE_LIST_SUCCESS,
  ADD_WAREHOUSE_LIST_ERROR,
  
  DELETE_WAREHOUSE_LIST,
  DELETE_WAREHOUSE_LIST_SUCCESS,
  DELETE_WAREHOUSE_LIST_ERROR,

  RESET_WAREHOUSE_LIST,
  RESET_WAREHOUSE_LIST_SUCCESS,
  RESET_WAREHOUSE_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Warehouselist: [],
  WarehouselistSize:0,
  TotalWarehouses:0,
  CurrentPage:1,
  AddWarehouselistdata: [],
  error: {},
};

const Warehouse = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_WAREHOUSE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_WAREHOUSE_LIST:
          return {
            ...state,
            Warehouselist: action.payload.data.data,
            WarehouselistSize: action.payload.data.size,
            TotalWarehouses: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_WAREHOUSE_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_WAREHOUSE_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_WAREHOUSE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_WAREHOUSE_LIST:
          return {
            ...state,
            AddWarehouselistdata: action.payload.data,
          };
      }
    case ADD_WAREHOUSE_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_WAREHOUSE_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_WAREHOUSE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_WAREHOUSE_LIST:
          return {
            ...state,
            Warehouselist: action.payload.data,
          };
      }
    case DELETE_WAREHOUSE_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_WAREHOUSE_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case RESET_WAREHOUSE_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_WAREHOUSE_LIST:
            return {
              ...state,
              Warehouselist: [],
              WarehouselistSize:0,
              TotalWarehouses:0,
              CurrentPage:1,
              AddWarehouselist: [],
              error: {},
            };
        }
      case RESET_WAREHOUSE_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_WAREHOUSE_LIST:
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

export default Warehouse;
