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
import ymaps from 'ymaps';
// import { ConnectedRouter } from 'connected-react-router/immutable';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

const MOUNT_NODE = document.getElementById('app');
const Ymap = ymaps
  .load(
    'https://api-maps.yandex.ru/2.1/?apikey=2c8941af-3ed9-4dde-8355-5ae57f6dfc92&lang=ru_RU',
  )
  .then(maps => {
    const map = new maps.Map('maps', {
      center: [55.76, 37.64],
      zoom: 7,
    });
    return map;
  });

export { Ymap };

ReactDOM.render(<App />, MOUNT_NODE);

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
