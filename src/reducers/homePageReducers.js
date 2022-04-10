import {
  UPDATE_VIEWPORT,
} from 'src/constants';

const initialState = {
  data: {
    timeout: null,
    boundsCoords: {
      sw: null,
      ne: null
    }
  }
};

export const homepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return {
        data: {
          ...state.data,
          timeout: action.payload.timeout,
          boundsCoords: {
            sw: action.payload.sw,
            ne: action.payload.ne
          }
        }
      };
    default:
      return state;
  }
}
