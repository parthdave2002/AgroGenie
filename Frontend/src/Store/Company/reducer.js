import {
  GET_COMPANY_LIST,
  GET_COMPANY_LIST_SUCCESS,
  GET_COMPANY_LIST_ERROR,

  ADD_COMPANY_LIST,
  ADD_COMPANY_LIST_SUCCESS,
  ADD_COMPANY_LIST_ERROR,
  
  DELETE_COMPANY_LIST,
  DELETE_COMPANY_LIST_SUCCESS,
  DELETE_COMPANY_LIST_ERROR,

  REST_COMPANY_LIST,
  REST_COMPANY_LIST_SUCCESS,
  REST_COMPANY_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Companylist: [],
  CompanylistSize:0,
  TotalCompanyData:0,
  CurrentPage:1,
  AddCompanylist: [],
  DeleteCompanylist: [],
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
            CompanylistSize: action.payload.data.size,
            TotalCompanyData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
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
    
    case ADD_COMPANY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_COMPANY_LIST:
          return {
            ...state,
            AddCompanylist: action.payload.data,
          };
      }
    case ADD_COMPANY_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_COMPANY_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_COMPANY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_COMPANY_LIST:
          return {
            ...state,
            DeleteCompanylist: action.payload.data,
          };
      }
    case DELETE_COMPANY_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_COMPANY_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

      case REST_COMPANY_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_COMPANY_LIST:
            return {
              ...state,
              Companylist: [],
              CompanylistSize:0,
              TotalCompanyData:0,
              CurrentPage:1,
              AddCompanylist: [],
              DeleteCompanylist: [],
              error: {},
            };
        }
      case REST_COMPANY_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_COMPANY_LIST:
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
