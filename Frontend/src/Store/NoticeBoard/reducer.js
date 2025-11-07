import {
  GET_NOTICE_BOARD_LIST,
  GET_NOTICE_BOARD_LIST_SUCCESS,
  GET_NOTICE_BOARD_LIST_ERROR,

  ADD_NOTICE_BOARD_LIST,
  ADD_NOTICE_BOARD_LIST_SUCCESS,
  ADD_NOTICE_BOARD_LIST_ERROR,
  
  DELETE_NOTICE_BOARD_LIST,
  DELETE_NOTICE_BOARD_LIST_SUCCESS,
  DELETE_NOTICE_BOARD_LIST_ERROR,

  RESET_NOTICE_BOARD_LIST,
  RESET_NOTICE_BOARD_LIST_SUCCESS,
  RESET_NOTICE_BOARD_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Cropdatalist: [],
  CroplistSize:0,
  TotalCropData:0,
  CurrentPage:1,
  AddNoticedatalist: [],
  error: {},
};

const NoticeBoard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NOTICE_BOARD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_NOTICE_BOARD_LIST:
          return {
            ...state,
            Cropdatalist: action.payload.data.data,
            CroplistSize: action.payload.data.size,
            TotalCropData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_NOTICE_BOARD_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_NOTICE_BOARD_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_NOTICE_BOARD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_NOTICE_BOARD_LIST:
          return {
            ...state,
            AddNoticedatalist: action.payload.data,
          };
      }
    case ADD_NOTICE_BOARD_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_NOTICE_BOARD_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_NOTICE_BOARD_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_NOTICE_BOARD_LIST:
          return {
            ...state,
            Croplist: action.payload.data,
          };
      }
    case DELETE_NOTICE_BOARD_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_NOTICE_BOARD_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case RESET_NOTICE_BOARD_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_NOTICE_BOARD_LIST:
            return {
              ...state,
              Cropdatalist: [],
              CroplistSize:0,
              TotalCropData:0,
              CurrentPage:1,
              AddNoticedatalist: [],
              error: {},
            };
        }
      case RESET_NOTICE_BOARD_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_NOTICE_BOARD_LIST:
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

export default NoticeBoard;
