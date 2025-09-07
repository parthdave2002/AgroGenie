import {
  GET_COMPANY_LIST,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Companylist: [],
  error: {},
};

const Company = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_COMPANY_LIST:
          return {
            ...state,
            Companylist: action.payload.data.data,
          };
      }
    case GET_COMPANY_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_COMPANY_LIST:
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

export default Company;
