const LOAD = 'spot/LOAD';
const LOAD_ONE = 'spot/LOAD_ONE';

const load = (list) => ({
  type: LOAD,
  list,
});

export const getSpots = () => async (dispatch) => {
  const response = await fetch('/api/spots');

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

const initialState = {
  list: [],
};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allSpots = {};
      action.list.forEach((spots) => {
        allSpots[spots.id] = spots;
      });
      return { ...allSpots, ...state };
    default:
      return state;
  }
};

export default spotReducer;
