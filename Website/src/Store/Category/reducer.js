import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_SUCCESS,
  GET_CATEGORY_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Categorylist: [],
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
    default:
      return state;
  }
};

export default Category;