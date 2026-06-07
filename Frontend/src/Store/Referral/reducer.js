import {
  GET_REFERRAL_RULES_LIST,
  GET_REFERRAL_RULES_LIST_SUCCESS,
  GET_REFERRAL_RULES_LIST_ERROR,

  ADD_REFERRAL_RULES_LIST,
  ADD_REFERRAL_RULES_LIST_SUCCESS,
  ADD_REFERRAL_RULES_LIST_ERROR,
  
  DELETE_REFERRAL_RULES_LIST,
  DELETE_REFERRAL_RULES_LIST_SUCCESS,
  DELETE_REFERRAL_RULES_LIST_ERROR,

  REST_REFERRAL_RULES_LIST,
  REST_REFERRAL_RULES_LIST_SUCCESS,
  REST_REFERRAL_RULES_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  ReferralRulelist: [],
  ReferralRulelistSize:0,
  AddReferralRulelist: [],
  DeleteReferralRulelist: [],
  TotalReferralRuleData:0,
  CurrentPage:1,
  error: {},
};

const Referral = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REFERRAL_RULES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_REFERRAL_RULES_LIST:
          return {
            ...state,
            ReferralRulelist: action.payload.data.data,
            ReferralRulelistSize: action.payload.data.size,
            TotalReferralRuleData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_REFERRAL_RULES_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_REFERRAL_RULES_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_REFERRAL_RULES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_REFERRAL_RULES_LIST:
          return {
            ...state,
            AddReferralRulelist: action.payload.data,
          };
      }
    case ADD_REFERRAL_RULES_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_REFERRAL_RULES_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_REFERRAL_RULES_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_REFERRAL_RULES_LIST:
          return {
            ...state,
            DeleteReferralRulelist: action.payload.data,
          };
      }
    case DELETE_REFERRAL_RULES_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_REFERRAL_RULES_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case REST_REFERRAL_RULES_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_REFERRAL_RULES_LIST:
            return {
              ...state,
              ReferralRulelist: [],
              ReferralRulelistSize:0,
              AddReferralRulelist: [],
              DeleteReferralRulelist: [],
              TotalReferralRuleData:0,
              CurrentPage:1,
              error: {},
            };
      }
    case REST_REFERRAL_RULES_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_REFERRAL_RULES_LIST:
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

export default Referral;