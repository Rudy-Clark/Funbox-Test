// Helper class for yandexMaps api
import MapWrapper from './MapWrapper';
// Import store for dispatch action update routes
import store from '../store';
import { updateRoute } from '../actions';

// private variables
const mapWrapper = new MapWrapper();
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
  const promiseGeoObject = mapWrapper.getGeoObject(routeName);

  promiseGeoObject.then(geoObject => {
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
        // this event redraw lines
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
        // here dispatching action update after drag end
        placemark.events.add('dragend', e => {
          const coords = e.get('target').geometry.getCoordinates();
          const resultPromise = mapWrapper.getGeoObject(coords);
          resultPromise.then(firstGeoObject => {
            const changedName = firstGeoObject.getAddressLine();
            placemark.properties.set({
              iconCaption: firstGeoObject.getAddressLine(),
              balloonContent: changedName,
            });
            // action update;
            store.dispatch(updateRoute(id, changedName));
          });
        });
      })
      .catch(error => console.error(error.message));
  });
}

function swapLines(from, to) {
  const sliced = routeColl.splice(from, 1);
  routeColl.splice(to, 0, sliced[0]);
  mapWrapper.drawLines(routeColl);
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

export { mapInit, addRoute, deleteRoute, swapLines };
