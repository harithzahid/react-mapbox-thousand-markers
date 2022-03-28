export const REQUEST_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

const initialState = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: [],
};

export const getMapMarkers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MAP_MARKERS_LOADING':
      return {
        status: REQUEST_STATUS.LOADING,
        data: state.data
      };
    case 'GET_MAP_MARKERS_SUCCESS':
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: action.payload,
      };
    case 'GET_MAP_MARKERS_ERROR':
      return {
        status: REQUEST_STATUS.FAILED,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export const getMapMarkersRequestStatus = (state) => {
  return state.getMapMarkers.status;
};

export const getMapMarkersData = (state) => {
  return state.getMapMarkers.data
}
