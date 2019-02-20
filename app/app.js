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

import yandexMaps from 'ymaps';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'components/App';
// Import store reducers
import store from './store';

const MOUNT_NODE = document.getElementById('app');

yandexMaps
  .load(
    'https://api-maps.yandex.ru/2.1/?apikey=2c8941af-3ed9-4dde-8355-5ae57f6dfc92&lang=ru_RU&mode=debug',
  )
  .then(yMap => {
    const myMap = new yMap.Map('map', {
      center: [55.76, 37.64],
      zoom: 7,
      controls: [],
    });

    new yMap.SuggestView('suggest');

    return {
      yMap,
      myMap,
    };
  })
  .catch(error => {
    console.error(error.message);
  });

console.log(window.ymaps);

ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  MOUNT_NODE
);
