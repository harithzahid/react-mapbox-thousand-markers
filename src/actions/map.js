import axios from 'axios';
import _ from 'lodash';

import { getUsersActions } from 'src/actions/user';

export const initalizePage = (coords, userType='contractor') => async (dispatch, getState) => {
  await dispatch(
    getMapMarkers({
      coords,
      user: userType
    })
  );

  const dataStore = getState();
  const markers = _.get(
    dataStore,
    'getMapMarkers.data.markers',
    []
  );

  markers.length > 0 && dispatch(
    getUsersActions({
      coords,
      user: userType,
      page: 1
    })
  )
}

export const getMapMarkers = ({ coords, user, page }, callback) => async (dispatch) => {
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
