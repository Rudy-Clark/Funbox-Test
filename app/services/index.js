// import ymaps from 'ymaps';
import MapWrapper from './MapWrapper';

// private variables
const mapWrapper = new MapWrapper();
// It's ES6 feature not yandex map api
const routeColl = [];
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
  const promiseCords = mapWrapper.getGeoObject(routeName);

  promiseCords.then(geoObject => {
    mapWrapper
      .modules(['Placemark'])
      .spread(Placemark => {
        const placemark = new Placemark(
          geoObject.geometry.getCoordinates(),
          {
            iconCaption: geoObject.getAddressLine(),
            balloonContent: routeName,
          },
          {
            draggable: true,
          },
        );
        routeColl.push({ id, placemark });
        mapWrapper.addGeoObject(placemark);
        mapWrapper.drawLines(routeColl.slice());
      })
      .catch(error => console.error(error.message));
  });
}

function deleteRoute(id) {
  routeColl.forEach((route, ind) => {
    if (route.id === id) {
      let last = routeColl.length > 1 ? false : true;
      mapWrapper.removeGeoObject(route.placemark, last);
      routeColl.splice(ind, 1);
      mapWrapper.drawLines(routeColl);
    }
  });
}

export { mapInit, addRoute, deleteRoute };
