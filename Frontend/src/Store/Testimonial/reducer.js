import {
  GET_TESTIMONIAL_LIST,
  GET_TESTIMONIAL_LIST_SUCCESS,
  GET_TESTIMONIAL_LIST_ERROR,

  ADD_TESTIMONIAL_LIST,
  ADD_TESTIMONIAL_LIST_SUCCESS,
  ADD_TESTIMONIAL_LIST_ERROR,
  
  DELETE_TESTIMONIAL_LIST,
  DELETE_TESTIMONIAL_LIST_SUCCESS,
  DELETE_TESTIMONIAL_LIST_ERROR,

  RESET_TESTIMONIAL_LIST,
  RESET_TESTIMONIAL_LIST_SUCCESS,
  RESET_TESTIMONIAL_LIST_ERROR
} from "./actionType";

const INIT_STATE = {
  Testimonialdatalist: [],
  TestimoniallistSize:0,
  TotalTestimonialData:0,
  CurrentPage:1,
  AddTestimonialdatalist: [],
  error: {},
};

const Testimonial = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TESTIMONIAL_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case GET_TESTIMONIAL_LIST:
          return {
            ...state,
            Testimonialdatalist: action.payload.data.data,
            TestimoniallistSize: action.payload.data.size,
            TotalTestimonialData: action.payload.data.totalData,
            CurrentPage: action.payload.data.page,
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
    
    case ADD_TESTIMONIAL_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case ADD_TESTIMONIAL_LIST:
          return {
            ...state,
            AddTestimonialdatalist: action.payload.data,
          };
      }
    case ADD_TESTIMONIAL_LIST_ERROR:
      switch (action.payload.actionType) {
        case ADD_TESTIMONIAL_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }

    case DELETE_TESTIMONIAL_LIST_SUCCESS:
      switch (action.payload.actionType) {
        case DELETE_TESTIMONIAL_LIST:
          return {
            ...state,
            Testimoniallist: action.payload.data,
          };
      }
    case DELETE_TESTIMONIAL_LIST_ERROR:
      switch (action.payload.actionType) {
        case DELETE_TESTIMONIAL_LIST:
          return {
            ...state,
            error: action.payload,
          };
        default:
          return { ...state };
      }


      case RESET_TESTIMONIAL_LIST_SUCCESS:
        switch (action.payload.actionType) {
          case RESET_TESTIMONIAL_LIST:
            return {
              ...state,
              Testimonialdatalist: [],
              TestimoniallistSize:0,
              TotalTestimonialData:0,
              CurrentPage:1,
              AddTestimonialdatalist: [],
              error: {},
            };
        }
      case RESET_TESTIMONIAL_LIST_ERROR:
        switch (action.payload.actionType) {
          case RESET_TESTIMONIAL_LIST:
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
