import {
  GET_SALES_DASHBOARD_DATA,
  GET_SALES_DASHBOARD_DATA_SUCCESS,
  GET_SALES_DASHBOARD_DATA_ERROR,

  GET_CALLBACK_DATA,
  GET_CALLBACK_DATA_SUCCESS,
  GET_CALLBACK_DATA_ERROR,

  GET_MARK_AS_DONE_DATA,
  GET_MARK_AS_DONE_DATA_SUCCESS,
  GET_MARK_AS_DONE_DATA_ERROR,

  GET_SALES_DASHBOARD_RESET_DATA,
  GET_SALES_DASHBOARD_RESET_DATA_SUCCESS,
  GET_SALES_DASHBOARD_RESET_DATA_ERROR,
 
} from "./actionType";

const INIT_STATE = {
  DashboardDataList: [],
  CallBackUserList:[],
  CallBackDoneUserList:[],
  error: {},
};

const SalesDashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SALES_DASHBOARD_DATA_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SALES_DASHBOARD_DATA:
          return {
            ...state,
            DashboardDataList: action.payload.data,
          };
      }
    case GET_SALES_DASHBOARD_DATA_ERROR:
      switch (action.payload.actionType) {
        case GET_SALES_DASHBOARD_DATA:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case GET_CALLBACK_DATA_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CALLBACK_DATA:
          return {
            ...state,
            CallBackUserList: action.payload.data,
          };
      }
    case GET_CALLBACK_DATA_ERROR:
      switch (action.payload.actionType) {
        case GET_CALLBACK_DATA:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

      case GET_MARK_AS_DONE_DATA_SUCCESS:
        switch (action.payload.actionType) {
          case GET_MARK_AS_DONE_DATA:
            return {
              ...state,
              CallBackDoneUserList: action.payload.data,
            };
        }
      case GET_MARK_AS_DONE_DATA_ERROR:
        switch (action.payload.actionType) {
          case GET_MARK_AS_DONE_DATA:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
        }

    case GET_SALES_DASHBOARD_RESET_DATA_SUCCESS:
      switch (action.payload.actionType) {
        case GET_SALES_DASHBOARD_RESET_DATA:
          return {
            ...state,
            DashboardDataList: [],
            CallBackUserList:[],
            error: {},
          };
      }
    case GET_SALES_DASHBOARD_RESET_DATA_ERROR:
      switch (action.payload.actionType) {
        case GET_SALES_DASHBOARD_RESET_DATA:
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

export default SalesDashboard;
