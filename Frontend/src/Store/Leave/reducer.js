import {
  GET_LEAVE_LIST,
  GET_LEAVE_LIST_SUCCESS,
  GET_LEAVE_LIST_ERROR,

  ADD_LEAVE_LIST,
  ADD_LEAVE_LIST_ERROR,
  ADD_LEAVE_LIST_SUCCESS,

  GET_CHANGE_LEAVE_STATUS,
  GET_CHANGE_LEAVE_STATUS_SUCCESS,
  GET_CHANGE_LEAVE_STATUS_ERROR
} from "./actionType";

const INIT_STATE = {
  Leavedatalist: [],
  AddLeavedatalist:[],
  ChangeLeavedatalist:[],
  error: {},
};

const LeaveData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LEAVE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_LEAVE_LIST:
          return {
            ...state,
            Leavedatalist: action.payload.data,
          };
      }
    case GET_LEAVE_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_LEAVE_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case ADD_LEAVE_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_LEAVE_LIST:
          return {
            ...state,
            AddLeavedatalist: action.payload.data,
          };
      }
    case ADD_LEAVE_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_LEAVE_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }


    case GET_CHANGE_LEAVE_STATUS_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHANGE_LEAVE_STATUS:
          return {
            ...state,
            ChangeLeavedatalist: action.payload.data,
          };
      }
    case GET_CHANGE_LEAVE_STATUS_ERROR:
      switch (action.payload.actionType) {
        case GET_CHANGE_LEAVE_STATUS:
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

export default LeaveData;