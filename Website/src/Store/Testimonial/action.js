import {
  GET_TESTIMONIAL_LIST,
  GET_TESTIMONIAL_LIST_SUCCESS,
  GET_TESTIMONIAL_LIST_ERROR,
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
