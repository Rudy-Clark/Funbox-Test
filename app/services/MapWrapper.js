export default class MapWrapper {
  constructor() {
    this.api;
    this.map;
    this.promise;
    this.onload = 'yandex_maps_onload';
    this.onerror = 'yandex_maps_onerror';
  }

  load(options) {
    const version = '2.1';
    const defaultOptions = {
      onload: this.onload,
      onerror: this.onerror,
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

  injectMap(idEl, state) {
    this.map = this.promise.then(() => new this.api.Map(idEl, state));
    return this.map;
  }

  SuggestView(ideElement) {
    this.promise.then(ymaps => new ymaps.SuggestView(ideElement));
  }

  modules(args) {
    return this.getApi().modules.require(...args);
  }

  addGeoObject(geObject) {
    this.map
      .then(map => {
        map.geoObjects.add(geObject);
      })
      .catch(error => console.error(error.message));
  }
}
