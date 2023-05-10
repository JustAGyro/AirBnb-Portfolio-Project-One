import { csrfFetch } from './csrf';

const LOAD_OWNER = 'owner/LOAD_OWNER';
const CLEAR_OWNER = 'owner/CLEAR_OWNER';

const loadOwner = (owner) => ({
  type: LOAD_OWNER,
  owner,
});

export const clearOwner = () => ({
  type: CLEAR_OWNER,
});

export const getOwnerBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadOwner(data.Owner));
  }
};

const initialState = {};

const ownerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OWNER: {
      const newState = { ...state, [action.owner.id]: action.owner };
      return newState;
    }
    case CLEAR_OWNER: {
      return {};
    }
    default:
      return state;
  }
};

export default ownerReducer;
