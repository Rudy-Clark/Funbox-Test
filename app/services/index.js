import ymaps from 'ymaps';

// private variables
let map;
let MultiRouter;
let routeColl = [];

function mapInit(idEl, suggestViewElement, options) {
  ymaps
    .load(
      'https://api-maps.yandex.ru/2.1/?apikey=2c8941af-3ed9-4dde-8355-5ae57f6dfc92&lang=ru_RU&mode=debug'
    )
    .then(yMap => {
      map = new yMap.Map(idEl, options);

      new yMap.SuggestView(suggestViewElement, options);

    })
    .catch(error => {
      console.error(error.message);
    });
}

function addRoute({ id, routeName }) {
  routeColl.push({ id, routeName });

  setPointsRoute(routeColl.map(route => route.routeName));

  return routeColl.slice();
}

function deleteRoute(id) {
  routeColl = routeColl.filter(route => route.id !== id);
  if (routeColl.length === 0 && MultiRouter) {
    ymaps.load().then(api => MultiRouter.model.destroy());
    return [];
  }
  setPointsRoute(routeColl.map(route => route.routeName));
  return routeColl.slice();
}

// private method
function setPointsRoute(points) {
  const options = {
    boundsAutoApply: true,
    wayPointDraggable: true,
  };
  const routes = {
    referencePoints: points,
    params: {
      reverseGeocoding: false,
    },
  };
  ymaps
    .load()
    .then(api => {
      if (MultiRouter) {
        MultiRouter.model.setReferencePoints(points);
        MultiRouter.events.add('update', () => {
          const currRoutes = MultiRouter.getRoutes();
          // currRoutes.each(route => {
          //   route.events.add('pixelboundschange', e => {
          //   });
          // });
        });
        return;
      }
      MultiRouter = new api.multiRouter.MultiRoute(routes, options);
      map.geoObjects.add(MultiRouter);
      MultiRouter.events.add('boundschange', () => {
        map.setBounds(MultiRouter.getBounds(), {
          checkZoomRange: true,
        });
      });
    })
    .catch(error => {
      console.error(error.message);
    });
}

export { mapInit, addRoute, deleteRoute };
