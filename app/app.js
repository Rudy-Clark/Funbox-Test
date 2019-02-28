/**
 * app.js
 *
 * This is the entry file for the application.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Import root app
import App from 'components/App';
// Import store reducers
import store from './store';

import { mapInit } from './services';
import 'sanitize.css/sanitize.css';

mapInit('map', 'suggest', {
  center: [55.76, 37.64],
  zoom: 9,
  controls: [],
});

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
);
