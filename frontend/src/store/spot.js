import Cookies from 'js-cookie';

const LOAD = 'spot/LOAD';
const CREATE_SPOT = '/spot/CREATE_SPOT';
const CREATE_IMAGE = '/spot/CREATE_IMAGE';
const LOAD_CURRENT = '/spot/LOAD_CURRENT';
const CLEAR_CURRENT = '/spot/CLEAR_CURRENT';
const DELETE_SPOT = '/spot/DELETE_SPOT';
const LOAD_ONE = '/spot/LOAD_ONE';
const UPDATE_SPOT = '/spot/UPDATE_SPOT';

const load = (list) => ({
  type: LOAD,
  list,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const createImage = (spot, image) => ({
  type: CREATE_IMAGE,
  spot,
  image,
});

const loadCurrent = (spots) => ({
  type: LOAD_CURRENT,
  spots,
});

export const clearCurrent = () => ({
  type: CLEAR_CURRENT,
});

const deleteSpot = (id) => ({
  type: DELETE_SPOT,
  id,
});

const loadOne = (spot) => ({
  type: LOAD_ONE,
  spot,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createASpot = (data) => async (dispatch) => {
  const token = Cookies.get('XSRF-TOKEN');
  const response = await fetch('/api/spots/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    return spot;
  }
};

export const createAnImage = (data, spotId) => async (dispatch) => {
  const token = Cookies.get('XSRF-TOKEN');
  const response = await fetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const image = await response.json();
    const spot = { id: spotId, previewImage: image };
    dispatch(createImage(spot));
    return image;
  }
};

export const getCurrentSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots/current');
  if (response.ok) {
    const spots = await response.json();
    dispatch(loadCurrent(spots));
  }
};

export const deleteASpot = (id) => async (dispatch) => {
  const token = Cookies.get('XSRF-TOKEN');
  const response = await fetch(`/api/spots/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
    },
  });

  if (response.ok) {
    dispatch(deleteSpot(id));
  }
};

export const getOneSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(loadOne(spot));
  }
};

export const updateASpot = (spotId, data) => async (dispatch) => {
  const token = Cookies.get('XSRF-TOKEN');
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    dispatch(updateSpot(spotId));
  }
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allSpots = {};
      action.list.forEach((spots) => {
        allSpots[spots.id] = spots;
      });
      return { ...allSpots, ...state };
    case CREATE_SPOT:
      if (!state[action.spot.id]) {
        const newState = {
          ...state,
          [action.spot.id]: action.spot,
        };
        return newState;
      }
      return {
        ...state,
        [action.spot.id]: action.spot,
      };
    case CREATE_IMAGE:
      const updatedSpot = {
        ...state[action.spot.id],
        previewImage: [[action.spot.previewImage]],
      };
      return {
        ...state,
        [action.spot.id]: updatedSpot,
      };
    case LOAD_CURRENT:
      const allCurrentSpots = {};
      action.spots.forEach((spot) => {
        allCurrentSpots[spot.id] = spot;
      });
      return { ...allCurrentSpots };
    case CLEAR_CURRENT: {
      return {};
    }
    case DELETE_SPOT:
      const { [action.id]: deletedSpot, ...remainingSpots } = state;
      return remainingSpots;
    case LOAD_ONE:
      const oneSpot = { [action.spot.id]: action.spot };
      return oneSpot;
    case UPDATE_SPOT:
      return {
        ...state,
        [action.spot.id]: action.spot,
      };
    default:
      return state;
  }
};

export default spotReducer;
