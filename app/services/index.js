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
        placemark.events.add('drag', e => {
          const target = e.get('target');
          const changedRoutesCoords = routeColl.map(route => {
            if (route.id === id) {
              route.placemark.geometry.setCoordinates(
                target.geometry.getCoordinates()
              );
            }
            return route;
          });
          mapWrapper.drawLines(changedRoutesCoords);
        });
      })
      .catch(error => console.error(error.message));
  });
}

function deleteRoute(id) {
  routeColl.forEach((route, ind) => {
    if (route.id === id) {
      mapWrapper.removeGeoObject(route.placemark);
      routeColl.splice(ind, 1);
      mapWrapper.drawLines(routeColl);
    }
  });
}


export { mapInit, addRoute, deleteRoute };
