import {
  GET_STATE_DATA_LIST,
  GET_STATE_DATA_LIST_SUCCESS,
  GET_STATE_DATA_LIST_ERROR,

  GET_DISTRICT_DATA_LIST,
  GET_DISTRICT_DATA_LIST_SUCCESS,
  GET_DISTRICT_DATA_LIST_ERROR,

  GET_TALUKA_DATA_LIST,
  GET_TALUKA_DATA_LIST_SUCCESS,
  GET_TALUKA_DATA_LIST_ERROR,
  
  GET_VILLAGE_DATA_LIST,
  GET_VILLAGE_DATA_LIST_SUCCESS,
  GET_VILLAGE_DATA_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Statedatalist: [],
  Districtdatalist: [],
  Talukadatalist:[],
  Villagedatalist:[],
  error: {},
};

const LocationData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STATE_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_STATE_DATA_LIST:
          return {
            ...state,
            Statedatalist: action.payload.data,
          };
      }
    case GET_STATE_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_STATE_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case GET_DISTRICT_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_DISTRICT_DATA_LIST:
          return {
            ...state,
            Districtdatalist: action.payload.data,
          };
      }
    case GET_DISTRICT_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_DISTRICT_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case GET_TALUKA_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
          case GET_TALUKA_DATA_LIST:
            return {
              ...state,
              Talukadatalist: action.payload.data,
            };
      }
    case GET_TALUKA_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
          case GET_TALUKA_DATA_LIST:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
      }

    case GET_VILLAGE_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_VILLAGE_DATA_LIST:
          return {
            ...state,
            Villagedatalist: action.payload.data,
          };
      }
    case GET_VILLAGE_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_VILLAGE_DATA_LIST:
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

export default LocationData;