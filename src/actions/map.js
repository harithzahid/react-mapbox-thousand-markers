import axios from 'axios';
import _ from 'lodash';

import {
  UPDATE_VIEWPORT,
  FETCH_MAP_MARKERS_LOADING,
  FETCH_MAP_MARKERS_SUCCESS,
  FETCH_MAP_MARKERS_ERROR
} from 'src/constants';

import { fetchUsers } from 'src/actions/user';

export const updateViewportActions = (coords, userType, debounce=0) => async (dispatch, getState) => {
  const dataStore = getState();
  const currentTimeout = _.get(dataStore,'homepageReducer.data.timeout',[]);
  clearTimeout(currentTimeout);

  const actions = () => {
    dispatch(fetchMapMarkers(coords, userType));
    dispatch(fetchUsers(coords, userType, 1));
  }

  dispatch({
    type: UPDATE_VIEWPORT,
    payload: {
      timeout: setTimeout(actions, debounce),
      sw: coords[0],
      ne: coords[1]
    }
  })
}

export const fetchMapMarkers = (coords, user, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_MAP_MARKERS_LOADING,
      payload: {
        type: user
      }
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const sw = coords[0];
    const ne = coords[1];
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}/api/map?user=${user}&sw=${sw}&ne=${ne}&type=${user}`;
    const { data } = await axios.get(endpoint, config);

    const dataStore = getState();
    const currentSw = _.get(dataStore,'homepageReducer.data.boundsCoords.sw');
    const currentNe = _.get(dataStore,'homepageReducer.data.boundsCoords.ne');
    const isResponseSyncWithMap = currentSw === sw && currentNe === ne;
    if (!isResponseSyncWithMap) {
      throw new Error("Response not sync with map bounds.");
    }

    dispatch({
      type: FETCH_MAP_MARKERS_SUCCESS,
      payload: {
        markers: data
      }
    });

  } catch (error) {
    dispatch({
      type: FETCH_MAP_MARKERS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
