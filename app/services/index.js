// import ymaps from 'ymaps';
import MapWrapper from './MapWrapper';

// private variables
const mapWrapper = new MapWrapper();
// It's ES6 feature not yandex map api
const routeColl = new Map();
function mapInit(idEl, suggestViewElement, options) {
  mapWrapper.load({
    apikey: '2c8941af-3ed9-4dde-8355-5ae57f6dfc92',
    lang: 'ru_RU',
    mode: 'debug',
  });
  mapWrapper.injectMap(idEl, options);
  mapWrapper.SuggestView(suggestViewElement);
}

function addRoute(id, routeName) {
  const promiseCords = mapWrapper.getCoords(routeName);

  promiseCords.then(coords => {
    mapWrapper
      .modules(['Placemark'])
      .spread(Placemark => {
        const placemark = new Placemark(coords);
        routeColl.set(id, placemark);
        mapWrapper.addGeoObject(placemark);
      })
      .catch(error => console.error(error.message));
  });
}

function deleteRoute(id) {
  routeColl.forEach((placemark, key) => {
    if (routeColl.has(id)) {
      mapWrapper.removeGeoObject(placemark);
      routeColl.delete(key);
    }
  });
}

export { mapInit, addRoute, deleteRoute };
