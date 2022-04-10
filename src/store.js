import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  fetchMapMarkersReducer,
  fetchUserReducer,
  fetchUsersReducer
} from 'src/reducers/apiRequestReducers';
import { homepageReducer } from 'src/reducers/homePageReducers';

const reducer = combineReducers({
  fetchMapMarkersReducer,
  fetchUserReducer,
  fetchUsersReducer,
  homepageReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export const selectPaginationInfo = (state) => {
  const users = state.fetchUsersReducer.data.users || {};
  const { docs, ...rest } = users;
  return rest || {}
};

export const selectUsersStatus = (state) => {
  return state.fetchUsersReducer.status;
}

export const selectMapBounds = (state) => {
  return [
    state.homepageReducer.data.boundsCoords.sw,
    state.homepageReducer.data.boundsCoords.ne
  ];
}

export const selectUserStatus = (state) => {
  return state.fetchUserReducer.status;
}

export const selectUser = (state) => {
  return state.fetchUserReducer.data.id && state.fetchUserReducer.data;
}

export const selectMapMarkerType = (state) => {
  return state.fetchUsersReducer.data.type
}

export const selectUsers = (state) => {
  return state.fetchUsersReducer.data.users?.docs || [];
}

export const selectMapMarkers = (state) => {
  return state.fetchMapMarkersReducer.data.markers || []
}
