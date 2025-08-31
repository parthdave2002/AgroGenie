import {
  GET_TAGLOG_LIST,
  GET_TAGLOG_LIST_SUCCESS,
  GET_TAGLOG_LIST_ERROR,

  ADD_TAGLOG_LIST,
  ADD_TAGLOG_LIST_SUCCESS,
  ADD_TAGLOG_LIST_ERROR,
  
  DELETE_TAGLOG_LIST,
  DELETE_TAGLOG_LIST_SUCCESS,
  DELETE_TAGLOG_LIST_ERROR,

  GET_SUB_TAGLOG_LIST,
  GET_SUB_TAGLOG_LIST_SUCCESS,
  GET_SUB_TAGLOG_LIST_ERROR,

  ADD_SUB_TAGLOG_LIST,
  ADD_SUB_TAGLOG_LIST_SUCCESS,
  ADD_SUB_TAGLOG_LIST_ERROR,

  CHANGE_STATUS_SUB_TAGLOG_LIST,
  CHANGE_STATUS_SUB_TAGLOG_LIST_SUCCESS,
  CHANGE_STATUS_SUB_TAGLOG_LIST_ERROR,
  
  DELETE_SUB_TAGLOG_LIST,
  DELETE_SUB_TAGLOG_LIST_SUCCESS,
  DELETE_SUB_TAGLOG_LIST_ERROR,

  GET_CUSTOMER_TAGLOG_LIST,
  GET_CUSTOMER_TAGLOG_LIST_SUCCESS,
  GET_CUSTOMER_TAGLOG_LIST_ERROR,

  ADD_CUSTOMER_TAGLOG_LIST,
  ADD_CUSTOMER_TAGLOG_LIST_SUCCESS,
  ADD_CUSTOMER_TAGLOG_LIST_ERROR,

  REST_TAGLOG_LIST,
  REST_TAGLOG_LIST_SUCCESS,
  REST_TAGLOG_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Tagloglist: [],
  TagloglistSize:0,
  TotalTaglogData:0,
  CurrentPcage:1,
  AddTagloglist: [],
  DeleteTagloglist: [],
  SubTagloglist: [],
  SubTagloglistSize:0,
  SubTotalTaglogData:0,
  SubCurrentPage:1,
  AddSubTagloglist: [],
  DeleteSubTagloglist: [],
  AddCustomerTagloglist:[],
  CustomerTagloglist:[],
  CustomerTagloglistSize:0,
  CustomerTotalTaglogData:0,
  CustomerCurrentPage:1,
  error: {},
};

const Taglog = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TAGLOG_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TAGLOG_LIST:
          return {
            ...state,
            Tagloglist: action.payload.data.data,
            TagloglistSize: action.payload.data.size,
            TotalTaglogData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_TAGLOG_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_TAGLOG_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_TAGLOG_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_TAGLOG_LIST:
          return {
            ...state,
            AddTagloglist: action.payload.data,
          };
      }
    case ADD_TAGLOG_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_TAGLOG_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_TAGLOG_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_TAGLOG_LIST:
          return {
            ...state,
            DeleteTagloglist: action.payload.data,
          };
      }
    case DELETE_TAGLOG_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_TAGLOG_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

      case GET_SUB_TAGLOG_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case GET_SUB_TAGLOG_LIST:
            return {
              ...state,
              SubTagloglist: action.payload.data.data,
              SubTagloglistSize: action.payload.data.size,
              SubTotalTaglogData: action.payload.data.totalData,
              SubCurrentPage: action.payload.data.page,
            };
        }
      case GET_SUB_TAGLOG_LIST_ERROR:
        switch (action.payload.actionType) {
          case GET_SUB_TAGLOG_LIST:
            return {
              ...state,
              error: action.payload,
            };
  
          default:
            return { ...state };
        }
      
      case ADD_SUB_TAGLOG_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case ADD_SUB_TAGLOG_LIST:
            return {
              ...state,
              AddSubTagloglist: action.payload.data,
            };
        }
      case ADD_SUB_TAGLOG_LIST_ERROR:
        switch (action.payload.actionType) {
          case ADD_SUB_TAGLOG_LIST:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
        }
  
      case DELETE_SUB_TAGLOG_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case DELETE_SUB_TAGLOG_LIST:
            return {
              ...state,
              DeleteSubTagloglist: action.payload.data,
            };
        }
      case DELETE_SUB_TAGLOG_LIST_ERROR:
        switch (action.payload.actionType) {
          case DELETE_SUB_TAGLOG_LIST:
            return {
              ...state,
              error: action.payload,
            };
          default:
            return { ...state };
        }
        
        case GET_CUSTOMER_TAGLOG_LIST_SUCCESS:
          switch (action.payload.actionType) {
            case GET_CUSTOMER_TAGLOG_LIST:
              return {
                ...state,
                CustomerTagloglist: action.payload.data,
                CustomerTagloglistSize: action.payload.data.size,
                CustomerTotalTaglogData: action.payload.data.totalData,
                CustomerCurrentPage: action.payload.data.page,
              };
          }
        case GET_CUSTOMER_TAGLOG_LIST_ERROR:
          switch (action.payload.actionType) {
            case GET_CUSTOMER_TAGLOG_LIST:
              return {
                ...state,
                error: action.payload,
              };
    
            default:
              return { ...state };
          }
        
        case ADD_CUSTOMER_TAGLOG_LIST_SUCCESS:
          switch (action.payload.actionType) {
            case ADD_CUSTOMER_TAGLOG_LIST:
              return {
                ...state,
                AddCustomerTagloglist: action.payload.data,
              };
          }
        case ADD_CUSTOMER_TAGLOG_LIST_ERROR:
          switch (action.payload.actionType) {
            case ADD_CUSTOMER_TAGLOG_LIST:
              return {
                ...state,
                error: action.payload,
              };
            default:
              return { ...state };
          }

      case REST_TAGLOG_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_TAGLOG_LIST:
            return {
              ...state,
              Tagloglist: [],
              TagloglistSize:0,
              TotalTaglogData:0,
              CurrentPage:1,
              AddTagloglist: [],
              DeleteTagloglist: [],
              SubTagloglist: [],
              SubTagloglistSize:0,
              SubTotalTaglogData:0,
              SubCurrentPage:1,
              AddSubTagloglist: [],
              DeleteSubTagloglist: [],
              AddCustomerTagloglist:[],
              error: {},
            };
        }
      case REST_TAGLOG_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_TAGLOG_LIST:
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

export default Taglog;
