import {
  GET_DASHBOARD_DATA_LIST,
  GET_DASHBOARD_DATA_LIST_SUCCESS,
  GET_DASHBOARD_DATA_LIST_ERROR,

  GET_REPORT_DATA_LIST,
  GET_REPORT_DATA_LIST_SUCCESS,
  GET_REPORT_DATA_LIST_ERROR,

  REST_REPORT_DATA_LIST,
  REST_REPORT_DATA_LIST_SUCCESS,
  REST_REPORT_DATA_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Dashboardlist: [],
  GetReportDatalist: [],
  error: {},
};

const AdminDashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_DASHBOARD_DATA_LIST:
          return {
            ...state,
            Dashboardlist: action.payload.data,
          };
      }
    case GET_DASHBOARD_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_DASHBOARD_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }
    
    case GET_REPORT_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_REPORT_DATA_LIST:
          return {
            ...state,
            GetReportDatalist: action.payload.data,
          };
      }
    case GET_REPORT_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_REPORT_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case REST_REPORT_DATA_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_REPORT_DATA_LIST:
            return {
              ...state,
              Dashboardlist: [],
              GetReportDatalist: [],
              error: {},
            };
      }
    case REST_REPORT_DATA_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_REPORT_DATA_LIST:
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

export default AdminDashboard;
