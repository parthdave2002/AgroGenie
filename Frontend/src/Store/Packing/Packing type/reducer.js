import {
  GET_PACKING_TYPE_LIST,
  GET_PACKING_TYPE_LIST_SUCCESS,
  GET_PACKING_TYPE_LIST_ERROR,
  
  ADD_PACKING_TYPE_LIST,
  ADD_PACKING_TYPE_LIST_SUCCESS,
  ADD_PACKING_TYPE_LIST_ERROR,
  
  DELETE_PACKING_TYPE_LIST,
  DELETE_PACKING_TYPE_LIST_SUCCESS,
  DELETE_PACKING_TYPE_LIST_ERROR,

  RESET_PACKING_TYPE_LIST,
  RESET_PACKING_TYPE_LIST_SUCCESS,
  RESET_PACKING_TYPE_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Packingtypelist: [],
  PackingtypelistSize:0,
  TotalPackingtypeData:0,
  CurrentPage:1,
  AddPackingtypelist:[],
  deletedPackingtypelist: [],
  error: {},
};

const PackingType = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PACKING_TYPE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_PACKING_TYPE_LIST:
  
          return {
            ...state,
            Packingtypelist: action.payload.data.data,
            PackingtypelistSize: action.payload.data.size,
            TotalPackingtypeData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_PACKING_TYPE_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_PACKING_TYPE_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_PACKING_TYPE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_PACKING_TYPE_LIST:
          return {
              ...state,
              AddPackingtypelist: action.payload.data,
          };
      }

    case ADD_PACKING_TYPE_LIST_ERROR:
          switch (action.payload.actionType) {
            case ADD_PACKING_TYPE_LIST:
              return {
                ...state,
                error: action.payload,
              };
            default:
              return { ...state };
      }
    
    case DELETE_PACKING_TYPE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_PACKING_TYPE_LIST:
          return {
              ...state,
              deletedPackingtypelist: action.payload.data,
          };
      }
    case DELETE_PACKING_TYPE_LIST_ERROR:
          switch (action.payload.actionType) {
            case DELETE_PACKING_TYPE_LIST:
              return {
                ...state,
                error: action.payload,
              };
            default:
              return { ...state };
      }

      case RESET_PACKING_TYPE_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_PACKING_TYPE_LIST:
            return {
                ...state,
                  Packingtypelist: [],
                  PackingtypelistSize:0,
                  TotalPackingtypeData:0,
                  CurrentPage:1,
                  AddPackingtypelist:[],
                  deletedPackingtypelist: [],
                  error: {},
            };
        }
      case RESET_PACKING_TYPE_LIST_ERROR:
            switch (action.payload.actionType) {
              case RESET_PACKING_TYPE_LIST:
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

export default PackingType;
