import {
  GET_WALLET_HISTORY_LIST,
  GET_WALLET_HISTORY_LIST_SUCCESS,
  GET_WALLET_HISTORY_LIST_ERROR,

  GET_WALLET_RULES_LIST,
  GET_WALLET_RULES_LIST_SUCCESS,
  GET_WALLET_RULES_LIST_ERROR,

  ADD_WALLET_RULES_LIST,
  ADD_WALLET_RULES_LIST_SUCCESS,
  ADD_WALLET_RULES_LIST_ERROR,
  
  DELETE_WALLET_RULES_LIST,
  DELETE_WALLET_RULES_LIST_SUCCESS,
  DELETE_WALLET_RULES_LIST_ERROR,

  REST_WALLET_RULES_LIST,
  REST_WALLET_RULES_LIST_SUCCESS,
  REST_WALLET_RULES_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  WalletHistorylist:[],
  WalletHistorylistSize:[],
  TotalWalletHistoryData : 0,
  WalletRulelist: [],
  WalletRulelistSize:0,
  AddWalletRulelist: [],
  DeleteWalletRulelist: [],
  TotalWalletRuleData:0,
  CurrentPage:1,
  error: {},
};

const Wallet = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_WALLET_HISTORY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_WALLET_HISTORY_LIST:
          return {
            ...state,
            WalletHistorylist: action.payload.data.data,
            WalletHistorylistSize: action.payload.data.size,
            TotalWalletHistoryData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_WALLET_HISTORY_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_WALLET_HISTORY_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case GET_WALLET_RULES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_WALLET_RULES_LIST:
          return {
            ...state,
            WalletRulelist: action.payload.data.data,
            WalletRulelistSize: action.payload.data.size,
            TotalWalletRuleData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_WALLET_RULES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_WALLET_RULES_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_WALLET_RULES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_WALLET_RULES_LIST:
          return {
            ...state,
            AddWalletRulelist: action.payload.data,
          };
      }
    case ADD_WALLET_RULES_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_WALLET_RULES_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_WALLET_RULES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_WALLET_RULES_LIST:
          return {
            ...state,
            DeleteWalletRulelist: action.payload.data,
          };
      }
    case DELETE_WALLET_RULES_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_WALLET_RULES_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case REST_WALLET_RULES_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_WALLET_RULES_LIST:
            return {
              ...state,
              WalletHistorylist:[],
              WalletHistorylistSize:[],
              TotalWalletHistoryData : 0,
              WalletRulelist: [],
              WalletRulelistSize:0,
              AddWalletRulelist: [],
              DeleteWalletRulelist: [],
              TotalWalletRuleData:0,
              CurrentPage:1,
              error: {},
            };
      }
    case REST_WALLET_RULES_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_WALLET_RULES_LIST:
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

export default Wallet;