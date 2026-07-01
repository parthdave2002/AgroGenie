import {
  GET_HR_DASHBOARD_LIST,
  GET_HR_DASHBOARD_LIST_SUCCESS,
  GET_HR_DASHBOARD_LIST_ERROR,

  REST_HR_DASHBOARD_LIST,
  REST_HR_DASHBOARD_LIST_SUCCESS,
  REST_HR_DASHBOARD_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  HrDatalist: [],
  error: {},
};

const HrDashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_HR_DASHBOARD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_HR_DASHBOARD_LIST:
          return {
            ...state,
            HrDatalist: action.payload.data.data,
          };
      }
    case GET_HR_DASHBOARD_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_HR_DASHBOARD_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case REST_HR_DASHBOARD_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_HR_DASHBOARD_LIST:
            return {
              ...state,
              HrDatalist: [],
              error: {},
            };
        }
      case REST_HR_DASHBOARD_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_HR_DASHBOARD_LIST:
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

export default HrDashboard;
