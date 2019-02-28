// import ymaps from 'ymaps';
import MapManager from './MapWrapper';

// private variables
const mapManager = new MapManager();
// It's ES6 feature not api
const routeColl = new Map();
function mapInit(idEl, suggestViewElement, options) {
  mapManager.load({
    apikey: '2c8941af-3ed9-4dde-8355-5ae57f6dfc92',
    lang: 'ru_RU',
    mode: 'debug',
  });
  mapManager.injectMap(idEl, options);
  mapManager.SuggestView(suggestViewElement);
}

function addRoute(id, routeName) {
  mapManager
    .modules('Placemark')
    .spread(Placemark => {
      const placemark = new Placemark([55.76, 37.56]);
      mapManager.addGeoObject(placemark);
    })
    .catch(error => console.error(error.message));
}

export { mapInit, addRoute };
