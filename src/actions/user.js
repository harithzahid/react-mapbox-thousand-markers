import axios from 'axios';
import _ from 'lodash';

export const getUsersActions = ({ coords, user, page }, callback) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_NEXT_USERS_LOADING',
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
    const currentUsersData = _.get(dataStore,'getUsersReducer.data.users',[]);
    const currentSw = _.get(dataStore,'mapReducer.data.sw');
    const currentNe = _.get(dataStore,'mapReducer.data.ne');
    const isResponseSyncWithMap = currentSw === sw && currentNe === ne;
    if (!isResponseSyncWithMap) {
      throw new Error("Response not sync with map bounds.");
    }

    dispatch({
      type: 'GET_NEXT_USERS_SUCCESS',
      payload: {
        type: user,
        users: data
      },
    });

  } catch (error) {
    dispatch({
      type: 'GET_NEXT_USERS_ERROR',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserActions = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'GET_USER_LOADING',
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
      type: 'GET_USER_SUCCESS',
      payload: {
        user: data
      },
    });

  } catch (error) {
    dispatch({
      type: 'GET_USER_ERROR',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
