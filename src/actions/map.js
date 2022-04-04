import axios from 'axios';
import _ from 'lodash';

import { getUsersActions } from 'src/actions/user';

export const initalizePage = (coords, userType='contractor', debounce=0) => async (dispatch, getState) => {
  const dataStore = getState();

  const fetch = async () => {
    dispatch(
      getMapMarkers({
        coords,
        user: userType
      })
    );

    dispatch(
      getUsersActions({
        coords,
        user: userType,
        page: 1
      })
    )
  }

  const currentTimeout = _.get(
    dataStore,
    'getMapMarkers.data.timeout',
    []
  );
  clearTimeout(currentTimeout);
  const timeout = setTimeout(fetch, debounce);
  dispatch({
    type: 'INITIALIZE',
    payload: {
      timeout,
      sw: coords[0],
      ne: coords[1]
    }
  })
}

export const getMapMarkers = ({ coords, user, page }, callback) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_MAP_MARKERS_LOADING',
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
    const endpoint = `/api/map?user=${user}&sw=${sw}&ne=${ne}&type=${user}`;
    const { data } = await axios.get(endpoint, config);
    const dataStore = getState();
    const currentMarkersData = _.get(dataStore,'getMapMarkers.data.markers',[]);
    const currentSw = _.get(dataStore,'mapReducer.data.sw');
    const currentNe = _.get(dataStore,'mapReducer.data.ne');
    const isResponseSyncWithMap = currentSw === sw && currentNe === ne;
    if (!isResponseSyncWithMap) {
      throw new Error("Response not sync with map bounds.");
    }

    dispatch({
      type: 'GET_MAP_MARKERS_SUCCESS',
      payload: {
        markers: data
      }
    });

  } catch (error) {
    dispatch({
      type: 'GET_MAP_MARKERS_ERROR',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
