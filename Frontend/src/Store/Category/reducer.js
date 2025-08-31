import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_ERROR,

  ADD_CATEGORY_LIST,
  ADD_CATEGORY_LIST_SUCCESS,
  ADD_CATEGORY_LIST_ERROR,
  
  DELETE_CATEGORY_LIST,
  DELETE_CATEGORY_LIST_SUCCESS,
  DELETE_CATEGORY_LIST_ERROR,

  RESET_CATEGORY_LIST,
  RESET_CATEGORY_LIST_SUCCESS,
  RESET_CATEGORY_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Categorylist: [],
  CategorylistSize:0,
  TotalCategoryData:0,
  CurrentPage:1,
  AddCategorylist: [],
  deleteCategorylist:[],
  error: {},
};

const Category = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_CATEGORY_LIST:
          return {
            ...state,
            Categorylist: action.payload.data.data,
            CategorylistSize: action.payload.data.size,
            TotalCategoryData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
          };
      }
    case GET_CATEGORY_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_CATEGORY_LIST:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }
    
    case ADD_CATEGORY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_CATEGORY_LIST:
          return {
            ...state,
            AddCategorylist: action.payload.data,
          };
      }
    case ADD_CATEGORY_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_CATEGORY_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_CATEGORY_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_CATEGORY_LIST:
          return {
            ...state,
            deleteCategorylist: action.payload.data,
          };
      }
    case DELETE_CATEGORY_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_CATEGORY_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case RESET_CATEGORY_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_CATEGORY_LIST:
            return {
              ...state,
              Categorylist: [],
              CategorylistSize:0,
              TotalCategoryData:0,
              CurrentPage:1,
              AddCategorylist:[],
              deleteCategorylist:[],
              error: {},
            };
        }
      case RESET_CATEGORY_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_CATEGORY_LIST:
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

export default Category;
