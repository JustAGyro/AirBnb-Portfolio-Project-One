import Cookies from 'js-cookie';

const LOAD = 'spot/LOAD';
const CREATE_SPOT = '/spot/CREATE_SPOT';
const CREATE_IMAGE = '/spot/CREATE_IMAGE';

const load = (list) => ({
  type: LOAD,
  list,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const createImage = (image) => ({
  type: CREATE_IMAGE,
  image,
});

export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');
  if (response.ok) {
    const list = await response.json();
    console.log(list);
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
  const response = await fetch(`/api/spots/${spotId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(createImage(image));
    return image;
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
      const newState = {
        ...state,
        [action.spot.previewImage]: action.image,
      };
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
