import {
  GET_LEAD_LIST,
  GET_LEAD_LIST_SUCCESS,
  GET_LEAD_LIST_ERROR,

  ADD_LEAD_LIST,
  ADD_LEAD_LIST_SUCCESS,
  ADD_LEAD_LIST_ERROR,

  MARK_AS_READ_LEAD_LIST,
  MARK_AS_READ_LEAD_LIST_SUCCESS,
  MARK_AS_READ_LEAD_LIST_ERROR,
  
  DELETE_LEAD_LIST,
  DELETE_LEAD_LIST_SUCCESS,
  DELETE_LEAD_LIST_ERROR,

  RESET_LEAD_LIST,
  RESET_LEAD_LIST_SUCCESS,
  RESET_LEAD_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Leaddatalist: [],
  LeadlistSize:0,
  TotalLeadData:0,
  CurrentPage:1,
  AddLeaddatalist: [],
  error: {},
};

const LeadData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEAD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_LEAD_LIST:
          return {
            ...state,
            Leaddatalist: action.payload.data,
          };
      }
    case GET_LEAD_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_LEAD_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_LEAD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_LEAD_LIST:
          return {
            ...state,
            AddLeaddatalist: action.payload.data,
          };
      }
    case ADD_LEAD_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_LEAD_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case MARK_AS_READ_LEAD_LIST_SUCCESS:
      switch (action.payload.actionType) {
          case MARK_AS_READ_LEAD_LIST:
            return {
              ...state,
              Leaddatalist: action.payload.data,
            };
      }
    case MARK_AS_READ_LEAD_LIST_ERROR:
      switch (action.payload.actionType) {
          case MARK_AS_READ_LEAD_LIST:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
      }

    case DELETE_LEAD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_LEAD_LIST:
          return {
            ...state,
            Leaddatalist: action.payload.data,
          };
      }
    case DELETE_LEAD_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_LEAD_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case RESET_LEAD_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_LEAD_LIST:
            return {
              ...state,
              Leaddatalist: [],
              LeadlistSize:0,
              TotalLeadData:0,
              CurrentPage:1,
              AddLeaddatalist: [],
              error: {},
            };
      }
    case RESET_LEAD_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_LEAD_LIST:
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

export default LeadData;