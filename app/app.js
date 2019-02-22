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

import { mapInit} from './services';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'components/App';
// Import store reducers
import store from './store';

mapInit('map', {
  center: [55.76, 37.64],
  zoom: 7,
  controls: [],
});

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  MOUNT_NODE
);
