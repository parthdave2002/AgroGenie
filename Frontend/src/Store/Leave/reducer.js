import {
  GET_LEAVE_LIST,
  GET_LEAVE_LIST_SUCCESS,
  GET_LEAVE_LIST_ERROR,

  ADD_LEAVE_LIST,
  ADD_LEAVE_LIST_ERROR,
  ADD_LEAVE_LIST_SUCCESS,

  GET_CHANGE_LEAVE_STATUS,
  GET_CHANGE_LEAVE_STATUS_SUCCESS,
  GET_CHANGE_LEAVE_STATUS_ERROR,

  GET_LEAVE_MANAGEMENT_LIST,
  GET_LEAVE_MANAGEMENT_LIST_ERROR,
  GET_LEAVE_MANAGEMENT_LIST_SUCCESS,

  ADD_LEAVE_MANAGEMENT_LIST,
  ADD_LEAVE_MANAGEMENT_LIST_ERROR,
  ADD_LEAVE_MANAGEMENT_LIST_SUCCESS,

  GET_CHANGE_LEAVE_MANAGEMENT_STATUS,
  GET_CHANGE_LEAVE_MANAGEMENT_STATUS_SUCCESS,
  GET_CHANGE_LEAVE_MANAGEMENT_STATUS_ERROR,

  RESET_LEAVE_MANAGEMENT_LIST,
  RESET_LEAVE_MANAGEMENT_LIST_ERROR,
  RESET_LEAVE_MANAGEMENT_LIST_SUCCESS
} from "./actionType";

const INIT_STATE = {
  LeaveManagementdatalist: [],
  AddLeaveManagementdatalist:[],
  ChangeLeaveManagementdatalist:[],
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

    case GET_LEAVE_MANAGEMENT_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_LEAVE_MANAGEMENT_LIST:
          return {
            ...state,
            LeaveManagementdatalist: action.payload.data,
          };
      }
    case GET_LEAVE_MANAGEMENT_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_LEAVE_MANAGEMENT_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case ADD_LEAVE_MANAGEMENT_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_LEAVE_MANAGEMENT_LIST:
          return {
            ...state,
            AddLeaveManagementdatalist: action.payload.data,
          };
      }
    case ADD_LEAVE_MANAGEMENT_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_LEAVE_MANAGEMENT_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case GET_CHANGE_LEAVE_MANAGEMENT_STATUS_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CHANGE_LEAVE_MANAGEMENT_STATUS:
          return {
            ...state,
            ChangeLeaveManagementdatalist: action.payload.data,
          };
      }
    case GET_CHANGE_LEAVE_MANAGEMENT_STATUS_ERROR:
      switch (action.payload.actionType) {
        case GET_CHANGE_LEAVE_MANAGEMENT_STATUS:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case RESET_LEAVE_MANAGEMENT_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case RESET_LEAVE_MANAGEMENT_LIST:
          return {
            ...state,
            LeaveManagementdatalist: [],
            AddLeaveManagementdatalist:[],
            ChangeLeaveManagementdatalist:[],
            Leavedatalist: [],
            AddLeavedatalist:[],
            ChangeLeavedatalist:[],
            error: {},
          };
      }
    case RESET_LEAVE_MANAGEMENT_LIST_ERROR:
      switch (action.payload.actionType) {
        case RESET_LEAVE_MANAGEMENT_LIST:
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