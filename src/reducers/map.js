export const REQUEST_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

const initialState = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: {},
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        data: {
          ...state.data,
          sw: action.payload.sw,
          ne: action.payload.ne
        }
      };
    default:
      return state;
  }
}

export const getMapMarkers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MAP_MARKERS_LOADING':
      return {
        status: REQUEST_STATUS.LOADING,
        data: {
          markers: state.data.markers || []
        }
      };
    case 'GET_MAP_MARKERS_SUCCESS':
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: {
          markers: action.payload.markers
        }
      };
    case 'GET_MAP_MARKERS_ERROR':
      return {
        status: REQUEST_STATUS.FAILED,
        error: action.payload,
        data: state.data
      };
    case 'INITIALIZE':
      return {
        status: REQUEST_STATUS.IDLE,
        data: {
          timeout: action.payload.timeout,
          markers: state.data.markers || []
        }
      }
    default:
      return state;
  }
};

export const getUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEXT_USERS_LOADING':
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
    case 'GET_NEXT_USERS_SUCCESS':
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: {
          type: action.payload.type,
          users: action.payload.users
        },
      };
    case 'GET_NEXT_USERS_ERROR':
      return {
        status: REQUEST_STATUS.FAILED,
        error: action.payload,
        data: state.data
      };
    default:
      return state;
  }
};

export const selectUser = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_LOADING':
      return {
        status: REQUEST_STATUS.LOADING,
        data: {
          id: action.payload.id
        }
      }
    case 'GET_USER_SUCCESS':
      return {
        status: REQUEST_STATUS.SUCCEEDED,
        data: action.payload.user
      }
    case 'CLEAR_SELECTED_USER':
      return {
        status: REQUEST_STATUS.IDLE,
        data: {}
      }
    default:
      return state;
  }
}

export const getUsersStatus = (state) => {
  return state.getUsersReducer.status;
}

export const getBounds = (state) => {
  return [state.mapReducer.data.sw, state.mapReducer.data.ne];
}

export const getSelectUserStatus = (state) => {
  return state.selectUser.status;
}

export const getSelectedUser = (state) => {
  return state.selectUser.data.id && state.selectUser.data;
}

export const getMapMarkersRequestStatus = (state) => {
  return state.getMapMarkers.status;
};

export const getMapMarkerType = (state) => {
  return state.getUsersReducer.data.type
}

export const getUsers = (state) => {
  return state.getUsersReducer.data.users?.docs || [];
}

export const getMapMarkerList = (state) => {
  return state.getMapMarkers.data.markers || []
}
