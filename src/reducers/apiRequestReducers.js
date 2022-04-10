import {
  REQUEST_STATUS,
  FETCH_MAP_MARKERS_LOADING,
  FETCH_MAP_MARKERS_SUCCESS,
  FETCH_MAP_MARKERS_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_CLEANUP,
  UPDATE_VIEWPORT
} from 'src/constants';

const initialState = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: {},
};

export const fetchMapMarkersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAP_MARKERS_LOADING:
      return {
        status: REQUEST_STATUS.LOADING,
        data: {
          markers: state.data.markers || []
        }
      };
    case FETCH_MAP_MARKERS_SUCCESS:
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: {
          markers: action.payload.markers
        }
      };
    case FETCH_MAP_MARKERS_ERROR:
      return {
        status: REQUEST_STATUS.FAILED,
        error: action.payload,
        data: state.data
      };
    default:
      return state;
  }
};

export const fetchUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_LOADING:
      let users = {}
      if (action.payload.type === state.data.type) {
        users = {
          ...state.data.users,
          page: action.payload.users.page
        }
      }
      return {
        status: REQUEST_STATUS.LOADING,
        data: {
          type: action.payload.type,
          users
        }
      };
    case FETCH_USERS_SUCCESS:
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: {
          type: action.payload.type,
          users: action.payload.users
        },
      };
    case FETCH_USERS_ERROR:
      return {
        status: REQUEST_STATUS.FAILED,
        error: action.payload,
        data: state.data
      };
    case UPDATE_VIEWPORT:
      return {
        status: REQUEST_STATUS.IDLE,
        error: state.error,
        data: state.data
      };
    default:
      return state;
  }
};

export const fetchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_LOADING:
      return {
        status: REQUEST_STATUS.LOADING,
        data: {
          id: action.payload.id
        }
      }
    case FETCH_USER_SUCCESS:
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: action.payload.user
      }
    case FETCH_USER_ERROR:
      return {
        status: REQUEST_STATUS.FAILED,
        error: action.payload,
        data: state.data
      };
    case FETCH_USER_CLEANUP:
      return {
        status: REQUEST_STATUS.IDLE,
        data: {}
      }
    default:
      return state;
  }
}
