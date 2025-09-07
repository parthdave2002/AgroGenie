import {
  GET_BANNER_LIST,
  GET_BANNER_LIST_SUCCESS,
  GET_BANNER_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Bannerlist: [],
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
 
    default:
      return state;
  }
};

export default Banner;
