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
  let collection;
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
  // public methods
  function setApi(ymaps) {
    if (!api) api = ymaps;
  }

  function setGeoCollection(GeoObjectCollection) {
    if (!collection) collection = GeoObjectCollection;
  }

  async function searchRouteCoords(query) {
    let geocode;
    try {
      geocode = await getGeoObject(query);
      if (!geocode.geometry) return false;
      return geocode.geometry.getCoordinates();
    } catch (error) {
      return false;
    }
  }

  async function createPlacemark(routeName, coords) {
    let placemark;
    try {
      const ymp = await promiseApi();
      placemark = new ymp.Placemark(
        coords,
        {
          iconCaption: routeName,
          balloonContent: routeName,
        },
        {
          draggable: true,
        },
      );
      collection.add(placemark);
    } catch (error) {
      console.error(error.message);
    }
    return collection.getLength() - 1;
  }

  return {
    setApi,
    setGeoCollection,
    searchRouteCoords,
    createPlacemark,
  };
})();

export default mapManage;
