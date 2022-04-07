import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MapProvider } from 'react-map-gl';

import store from './store';
import App from './App';

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MapProvider>
        <App />
      </MapProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
