import axios from 'axios';

export const getMapMarkers = ({ coords, user }, callback) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_MAP_MARKERS_LOADING',
      payload: {
        data: {
          type: user,
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
    const endpoint = `/api/map?user=${user}&sw=${sw}&ne=${ne}`;
    const { data } = await axios.get(endpoint, config);
    dispatch({
      type: 'GET_MAP_MARKERS_SUCCESS',
      payload: {
        type: user,
        list: data
      },
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
