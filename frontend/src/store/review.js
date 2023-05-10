// store/review.js

import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const clearReviews = () => ({
  type: CLEAR_REVIEWS,
});

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

const deleteReview = (id) => ({
  type: DELETE_REVIEW,
  id,
});

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
      const reviews = await res.json();
      dispatch(loadReviews(reviews));
    }
  } catch (err) {
    console.error(err);
  }
};

export const createAReview = (data, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(createReview(newReview));
  }
};

export const deleteAReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(id));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const spotReviews = {};
      action.reviews.forEach((review) => {
        spotReviews[review.id] = review;
      });
      return { ...state, ...spotReviews };
    }
    case CLEAR_REVIEWS: {
      return {};
    }
    case CREATE_REVIEW: {
      if (!state[action.review.id]) {
        const newState = {
          ...state,
          [action.review.id]: action.review,
        };

        return newState;
      }
      return {
        ...state,
        [action.review.id]: action.review,
      };
    }
    case DELETE_REVIEW: {
      const { [action.id]: deletedReview, ...remainingReviews } = state;
      return remainingReviews;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
