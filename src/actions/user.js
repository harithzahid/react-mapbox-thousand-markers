import axios from 'axios';
import _ from 'lodash';

import {
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USERS_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from 'src/constants';

import { fetchMapMarkers } from 'src/actions/map';

export const updateUserTypeActions = (userType) => async (dispatch, getState) => {
  const dataStore = getState();
  const currentSw = _.get(dataStore,'homepageReducer.data.boundsCoords.sw');
  const currentNe = _.get(dataStore,'homepageReducer.data.boundsCoords.ne');
  dispatch(fetchMapMarkers([currentSw, currentNe], userType));
  dispatch(fetchUsers([currentSw, currentNe], userType, 1));
}

export const fetchUsers = (coords, user, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USERS_LOADING,
      payload: {
        type: user,
        users: {
          page
        }
      }
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const sw = coords[0];
    const ne = coords[1];
    const endpoint = `/api/user/list?user=${user}&sw=${sw}&ne=${ne}&page=${page}`;
    const { data } = await axios.get(endpoint, config);

    const dataStore = getState();
    const currentSw = _.get(dataStore,'homepageReducer.data.boundsCoords.sw');
    const currentNe = _.get(dataStore,'homepageReducer.data.boundsCoords.ne');
    const isResponseSyncWithMap = currentSw === sw && currentNe === ne;
    if (!isResponseSyncWithMap) {
      throw new Error("Response not sync with map bounds.");
    }

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: {
        type: user,
        users: data
      },
    });

  } catch (error) {
    dispatch({
      type: FETCH_USERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_USER_LOADING,
      payload: {
        id
      }
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const endpoint = `/api/user?id=${id}`;
    const { data } = await axios.get(endpoint, config);

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: {
        user: data
      },
    });

  } catch (error) {
    dispatch({
      type: FETCH_USER_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
