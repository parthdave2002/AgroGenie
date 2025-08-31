import {
  GET_CROP_LIST,
  GET_CROP_LIST_SUCCESS,
  GET_CROP_LIST_ERROR,

  ADD_CROP_LIST,
  ADD_CROP_LIST_SUCCESS,
  ADD_CROP_LIST_ERROR,
  
  DELETE_CROP_LIST,
  DELETE_CROP_LIST_SUCCESS,
  DELETE_CROP_LIST_ERROR,

  RESET_CROP_LIST,
  RESET_CROP_LIST_SUCCESS,
  RESET_CROP_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Cropdatalist: [],
  CroplistSize:0,
  TotalCropData:0,
  CurrentPage:1,
  AddCropdatalist: [],
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
            CroplistSize: action.payload.data.size,
            TotalCropData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
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
    
    case ADD_CROP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_CROP_LIST:
          return {
            ...state,
            AddCropdatalist: action.payload.data,
          };
      }
    case ADD_CROP_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_CROP_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_CROP_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_CROP_LIST:
          return {
            ...state,
            Croplist: action.payload.data,
          };
      }
    case DELETE_CROP_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_CROP_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case RESET_CROP_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_CROP_LIST:
            return {
              ...state,
              Cropdatalist: [],
              CroplistSize:0,
              TotalCropData:0,
              CurrentPage:1,
              AddCropdatalist: [],
              error: {},
            };
        }
      case RESET_CROP_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_CROP_LIST:
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
