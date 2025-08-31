import {
  GET_BANNER_LIST,
  GET_BANNER_LIST_SUCCESS,
  GET_BANNER_LIST_ERROR,

  ADD_BANNER_LIST,
  ADD_BANNER_LIST_SUCCESS,
  ADD_BANNER_LIST_ERROR,
  
  DELETE_BANNER_LIST,
  DELETE_BANNER_LIST_SUCCESS,
  DELETE_BANNER_LIST_ERROR,

  REST_BANNER_LIST,
  REST_BANNER_LIST_SUCCESS,
  REST_BANNER_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Bannerlist: [],
  BannerlistSize:0,
  TotalBannerData:0,
  CurrentPage:1,
  AddBannerlist: [],
  DeleteBannerlist: [],
  error: {},
};

const Banner = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BANNER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_BANNER_LIST:
          return {
            ...state,
            Bannerlist: action.payload.data.data,
            BannerlistSize: action.payload.data.size,
            TotalBannerData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_BANNER_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_BANNER_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_BANNER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_BANNER_LIST:
          return {
            ...state,
            AddBannerlist: action.payload.data,
          };
      }
    case ADD_BANNER_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_BANNER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_BANNER_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_BANNER_LIST:
          return {
            ...state,
            DeleteBannerlist: action.payload.data,
          };
      }
    case DELETE_BANNER_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_BANNER_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

      case REST_BANNER_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case REST_BANNER_LIST:
            return {
              ...state,
              Bannerlist: [],
              BannerlistSize:0,
              TotalBannerData:0,
              CurrentPage:1,
              AddBannerlist: [],
              DeleteBannerlist: [],
              error: {},
            };
        }
      case REST_BANNER_LIST_ERROR:
        switch (action.payload.actionType) {
          case REST_BANNER_LIST:
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

export default Banner;
