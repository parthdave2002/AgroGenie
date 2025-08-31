import {
  GET_EXPORT_DATA_LIST,
  GET_EXPORT_DATA_LIST_SUCCESS,
  GET_EXPORT_DATA_LIST_ERROR,

  RESET_EXPORT_DATA_LIST,
  RESET_EXPORT_DATA_LIST_SUCCESS,
  RESET_EXPORT_DATA_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  ExportDatalist: [],
  ExportDatalistSize:0,
  TotalExportData:0,
  CurrentPage:1,
  error: {},
};

const ExportData = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EXPORT_DATA_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_EXPORT_DATA_LIST:
          return {
            ...state,
            ExportDatalist: action.payload.data.data,
            ExportDatalistSize: action.payload.data.size,
            TotalExportData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_EXPORT_DATA_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_EXPORT_DATA_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

      case RESET_EXPORT_DATA_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_EXPORT_DATA_LIST:
            return {
              ...state,
              ExportDatalist: [],
              ExportDatalistSize:0,
              TotalExportData:0,
              CurrentPage:1,
              error: {},
            };
        }
      case RESET_EXPORT_DATA_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_EXPORT_DATA_LIST:
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

export default ExportData;
