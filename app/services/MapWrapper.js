export default class MapWrapper {
  constructor() {
    this.api = null;
    this.map = null;
    this.promise = null;
    this.geoObjects = null;
    this.polyline = null;
    this.onload = 'yandex_maps_onload';
    this.onerror = 'yandex_maps_onerror';
  }

  load(options) {
    const version = '2.1';
    const defaultOptions = {
      onload: this.onload,
      onerror: this.onerror,
      width: '100%',
    };

    const commOptions = Object.assign(defaultOptions, options);
    const baseUrl = 'https://api-maps.yandex.ru';
    const params = Object.keys(commOptions)
      .map(key => `${key}=${commOptions[key]}`)
      .join('&');

    const url = [baseUrl, version, '?' + params].join('/');
    const fetchedScript = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.onerror = reject;
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      document.head.appendChild(script);
    });
    fetchedScript.catch(error => console.error(error));

    this.promise = new Promise((resolve, reject) => {
      window[this.onload] = ymaps => {
        delete window[this.onload];
        ymaps.ready(() => resolve(this.setApi(ymaps)));
      };

      window[this.onerror] = error => {
        delete window[this.onerror];
        reject(error);
      };
    });

    return this.promise;
  }

  setPromise(promise) {
    this.promise = promise;
  }

  setApi(api) {
    this.api = api;
    return this.api;
  }

  getApi() {
    return this.api ? this.api : window['ymaps'];
  }

  setMap(map) {
    this.map = map;
    return this.map;
  }

  injectMap(idEl, state) {
    this.promise.then(() => {
      const myMap = new this.api.Map(idEl, state);
      this.geoObjects = new this.api.GeoObjectCollection(
        {},
        {
          preset: 'islands#darkBlueDotIconWithCaption',
        },
      );
      myMap.geoObjects.add(this.geoObjects);
      this.geoObjects.events.add(['add', 'remove'], () =>
        myMap.setBounds(this.geoObjects.getBounds(), {
          checkZoomRange: true,
        })
      );
      this.setMap(myMap);
    });
  }

  SuggestView(ideElement) {
    this.promise.then(ymaps => new ymaps.SuggestView(ideElement));
  }

  modules(args) {
    return this.getApi().modules.require(...args);
  }

  addGeoObject(geoObject) {
    this.promise
      .then(() => {
        this.geoObjects.add(geoObject);
      })
      .catch(error => console.error(error.message));
  }

  getGeoObject(query) {
    return new Promise((resolve, reject) => {
      this.api.geocode(query, { result: 1 }).then(
        res => {
          resolve(res.geoObjects.get(0));
        },
        error => {
          reject(error);
        }
      );
    });
  }

  removeGeoObject(geoObject) {
    this.promise
      .then(() => {
        this.geoObjects.remove(geoObject);
      })
      .catch(error => error);
  }

  drawLines(routeColl) {
    if (routeColl.length <= 1) {
      if (this.polyline) {
        this.removeGeoObject(this.polyline);
        this.polyline = null;
      }
      return undefined;
    }
    const coords = routeColl.map(route =>
      route.placemark.geometry.getCoordinates()
    );
    if (!this.polyline) {
      this.polyline = new this.api.Polyline(
        coords,
        {},
        {
          strokeWidth: 3,
          strokeColor: '#0000FF',
        },
      );
      this.addGeoObject(this.polyline);
    } else {
      this.polyline.geometry.setCoordinates(coords);
    }

    return undefined;
  }
}
