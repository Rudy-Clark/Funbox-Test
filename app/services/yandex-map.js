import { updateRoute } from '../actions';
import store from '../store';

export function mapInit(idEl, suggestViewElement, options) {
  fetchScript(
    'https://api-maps.yandex.ru/2.1/?width=100%&apikey=2c8941af-3ed9-4dde-8355-5ae57f6dfc92&lang=ru_RU&mode=debug',
  )
    .then(() => {
      const { ymaps } = window;
      mapManage.setApi(ymaps);
      ymaps.ready(() => {
        const customMap = new ymaps.Map(idEl, options);
        // eslint-disable-next-line no-new
        new ymaps.SuggestView(suggestViewElement);

        const GeoObjectCollection = new ymaps.GeoObjectCollection();
        customMap.geoObjects.add(GeoObjectCollection);
        mapManage.setGeoCollection(GeoObjectCollection);

        GeoObjectCollection.events.add(['add', 'remove'], () => {
          if (GeoObjectCollection.getLength() <= 0) return undefined;
          customMap.setBounds(GeoObjectCollection.getBounds(), {
            checkZoomRange: true,
          });
          return true;
        });
      });
    })
    .catch(() => {
      console.error('network error');
    });
}

function fetchScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = resolve;
    script.onerror = reject;
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
  });
}

// eslint-disable-next-line func-names
const mapManage = (function() {
  // private variables
  let api;
  const collection = [];
  let geoCollection;
  let polyline;

  // private methods
  function promiseApi() {
    if (!api) return undefined;
    return new Promise(resolve => {
      api.ready(ymp => {
        resolve(ymp);
      });
    });
  }

  async function getGeoObject(query) {
    const ymp = await promiseApi();
    return ymp.geocode(query, { result: 1 }).then(res => res.geoObjects.get(0));
  }

  async function drawLines() {
    if (collection.length <= 1) {
      if (polyline) {
        geoCollection.remove(polyline);
        polyline = null;
      }
      return undefined;
    }

    const coords = collection.map(route =>
      route.placemark.geometry.getCoordinates(),
    );

    if (!polyline) {
      const ymp = await promiseApi();
      polyline = new ymp.Polyline(
        coords,
        {},
        {
          strokeWidth: 3,
        },
      );
      geoCollection.add(polyline);
    } else polyline.geometry.setCoordinates(coords);
    return polyline;
  }

  // public methods
  function setApi(ymaps) {
    if (!api) api = ymaps;
  }

  function setGeoCollection(GeoObjectCollection) {
    if (!geoCollection) geoCollection = GeoObjectCollection;
  }

  async function searchRouteCoords(query) {
    const geocode = await getGeoObject(query);
    if (!geocode) throw new Error(`can't find ${query}`);
    return geocode.geometry.getCoordinates();
  }

  async function createPlaceMark(routeName, coords) {
    let id;
    try {
      const ymp = await promiseApi();
      const placemark = new ymp.Placemark(
        coords,
        {
          iconCaption: routeName,
          balloonContent: routeName,
        },
        {
          draggable: true,
        },
      );
      geoCollection.add(placemark);
      id = generateId(5);
      collection.push({ id, placemark });
      drawLines();
      // attach drag event
      placemark.events.add('drag', e => {
        const target = e.get('target');
        placemark.geometry.setCoordinates(target.geometry.getCoordinates());
        drawLines();
      });
      // attach dragend event with dispatch
      placemark.events.add('dragend', e => {
        const coordinates = e.get('target').geometry.getCoordinates();
        const promiseGeoObject = getGeoObject(coordinates);
        promiseGeoObject.then(geoObject => {
          const address = geoObject.getAddressLine();
          placemark.properties.set({
            iconCaption: address,
            balloonContent: address,
          });
          store.dispatch(updateRoute(id, address));
        });
      });
    } catch (error) {
      console.error(error.message);
    }
    return id;
  }

  function deletePlaceMark(id) {
    collection.filter((route, idx) => {
      if (route.id === id) {
        geoCollection.remove(route.placemark);
        collection.splice(idx, 1);
      }
      return undefined;
    });
    drawLines();
  }

  function movePlaceMark(from, to) {
    const splicedMark = collection.splice(from, 1);
    collection.splice(to, 0, splicedMark[0]);
    drawLines();
  }

  return {
    setApi,
    setGeoCollection,
    searchRouteCoords,
    createPlaceMark,
    deletePlaceMark,
    movePlaceMark,
  };
})();

// Generate unique id;
const generateId = length => {
  const symbols = 'ABCDEFGHKLMNOPRSTQUVXYZWabcdefghklmnoprstquvxyzw1234567890';
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return result;
};

export default mapManage;
