import {
  GET_CROP_LIST,
  GET_CROP_LIST_SUCCESS,
  GET_CROP_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Cropdatalist: [],
  error: {},
};

const Crop = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CROP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CROP_LIST:
          return {
            ...state,
            Cropdatalist: action.payload.data.data,
          };
      }
    case GET_CROP_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_CROP_LIST:
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

export default Crop;
