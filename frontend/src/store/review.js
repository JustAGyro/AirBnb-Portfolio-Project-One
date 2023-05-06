// store/review.js

import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/loadReviews';
const CLEAR_REVIEWS = 'reviews/CLEAR_REVIEWS';

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const clearReviews = () => ({
  type: CLEAR_REVIEWS,
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
    default:
      return state;
  }
};

export default reviewsReducer;
