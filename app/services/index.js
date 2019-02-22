import ymaps from 'ymaps';

// private variables
let map;
let MultiRouter;
let routeColl = [];

function mapInit(idEl, suggestViewElement, options) {
  map = ymaps
    .load(
      'https://api-maps.yandex.ru/2.1/?apikey=2c8941af-3ed9-4dde-8355-5ae57f6dfc92&lang=ru_RU&mode=debug'
    )
    .then(yMap => {
      const cMap = new yMap.Map(idEl, options);

      new yMap.SuggestView(suggestViewElement, options);

      return {
        yMap,
        cMap,
      };
    })
    .catch(error => {
      console.error(error.message);
    });
}

function addRoute({ id, routeName }) {
  routeColl.push({ id, routeName });

  setPointsRoute(routeColl.map(route => route.routeName));

  return {
    id,
    title: routeName,
  };
}

function deleteRoute(id) {
  routeColl = routeColl.filter(route => route.id !== id);
  if (routeColl.length <= 0) {
    setPointsRoute([]);
    return [];
  }
  setPointsRoute(routeColl.map(route => route.routeName));
  return routeColl.map(route => ({ id: route.id, title: route.routeName }));
}

// private method
function setPointsRoute(points) {
  const options = {
    boundsAutoApply: true,
  };
  const routes = {
    referencePoints: points,
  };
  map
    .then(obj => {
      const { yMap, cMap } = obj;
      if (MultiRouter) cMap.geoObjects.remove(MultiRouter);
      MultiRouter = new yMap.multiRouter.MultiRoute(routes, options);
      cMap.geoObjects.add(MultiRouter);
    })
    .catch(error => {
      console.error(error.message);
    });
}

export { mapInit, addRoute, deleteRoute };
