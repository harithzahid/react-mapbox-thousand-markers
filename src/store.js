import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  mapReducer,
  getMapMarkers,
  selectUser,
  getUsersReducer
} from 'src/reducers/map';

const reducer = combineReducers({
  getMapMarkers,
  selectUser,
  getUsersReducer,
  mapReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

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

export const getPaginationInfo = (state) => {
  const users = state.getUsersReducer.data.users || {};
  const { docs, ...rest } = users;
  return rest || {}
};
