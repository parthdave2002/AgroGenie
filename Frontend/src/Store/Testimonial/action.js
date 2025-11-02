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

export const getTestimoniallist = (requserdata) => ({
  type: GET_TESTIMONIAL_LIST,
  payload: requserdata,
});

export const getTestimoniallistSuccess = (actionType, data) => ({
  type: GET_TESTIMONIAL_LIST_SUCCESS,
  payload: { actionType, data },
});

export const getTestimoniallistFail = (actionType, error) => ({
  type: GET_TESTIMONIAL_LIST_ERROR,
  payload: { actionType, error },
});

export const AddTestimoniallist = (requserdata) => ({
  type: ADD_TESTIMONIAL_LIST,
  payload: requserdata,
});

export const AddTestimoniallistSuccess = (actionType, data) => ({
  type: ADD_TESTIMONIAL_LIST_SUCCESS,
  payload: { actionType, data },
});

export const AddTestimoniallistFail = (actionType, error) => ({
  type: ADD_TESTIMONIAL_LIST_ERROR,
  payload: { actionType, error },
});

export const DeleteTestimoniallist = (requserdata) => ({
  type: DELETE_TESTIMONIAL_LIST,
  payload: requserdata,
});

export const DeleteTestimoniallistSuccess = (actionType, data) => ({
  type: DELETE_TESTIMONIAL_LIST_SUCCESS,
  payload: { actionType, data },
});

export const DeleteTestimoniallistFail = (actionType, error) => ({
  type: DELETE_TESTIMONIAL_LIST_ERROR,
  payload: { actionType, error },
});

export const ResetTestimoniallist = (requserdata) => ({
  type: RESET_TESTIMONIAL_LIST,
  payload: requserdata,
});

export const ResetTestimoniallistSuccess = (actionType, data) => ({
  type: RESET_TESTIMONIAL_LIST_SUCCESS,
  payload: { actionType, data },
});

export const ResetTestimoniallistFail = (actionType, error) => ({
  type: RESET_TESTIMONIAL_LIST_ERROR,
  payload: { actionType, error },
});
