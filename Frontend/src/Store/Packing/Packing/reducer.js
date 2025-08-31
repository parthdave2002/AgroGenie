import {
  GET_PACKING_LIST,
  GET_PACKING_LIST_SUCCESS,
  GET_PACKING_LIST_ERROR,

  ADD_PACKING_LIST,
  ADD_PACKING_LIST_SUCCESS,
  ADD_PACKING_LIST_ERROR,
  
  DELETE_PACKING_LIST,
  DELETE_PACKING_LIST_SUCCESS,
  DELETE_PACKING_LIST_ERROR,

  RESET_PACKING_LIST,
  RESET_PACKING_LIST_SUCCESS,
  RESET_PACKING_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Packinglist: [],
  PackinglistSize:0,
  TotalPackingData:0,
  CurrentPage:1,
  AddPackinglist:[],
  DeletePackinglist:[],
  error: {},
};

const Packing = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PACKING_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_PACKING_LIST:
          return {
            ...state,
            Packinglist: action.payload.data.data,
            PackinglistSize: action.payload.data.size,
            TotalPackingData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_PACKING_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_PACKING_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_PACKING_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_PACKING_LIST:
          // console.log("UserList =====>", action.payload.data);
          return {
            ...state,
            AddPackinglist: action.payload.data,
          };
      }
    case ADD_PACKING_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_PACKING_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_PACKING_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_PACKING_LIST:
          return {
            ...state,
            DeletePackinglist: action.payload.data,
          };
      }
    case DELETE_PACKING_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_PACKING_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case RESET_PACKING_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_PACKING_LIST:
            return {
              ...state,
              Packinglist: [],
              PackinglistSize:0,
              TotalPackingData:0,
              CurrentPage:1,
              AddPackinglist:[],
              DeletePackinglist:[],
              error: {},
            };
      }
    case RESET_PACKING_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_PACKING_LIST:
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

export default Packing;
