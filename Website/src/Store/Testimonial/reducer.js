import {
  GET_TESTIMONIAL_LIST,
  GET_TESTIMONIAL_LIST_SUCCESS,
  GET_TESTIMONIAL_LIST_ERROR,
} from "./actionType";

const INIT_STATE = {
  Testimoniallist: [],
  error: {},
};

const Testimonial = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TESTIMONIAL_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TESTIMONIAL_LIST:
          return {
            ...state,
            Testimoniallist: action.payload.data.data,
          };
      }
    case GET_TESTIMONIAL_LIST_ERROR:
      switch (action.payload.actionType) {
        case GET_TESTIMONIAL_LIST:
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

export default Testimonial;
