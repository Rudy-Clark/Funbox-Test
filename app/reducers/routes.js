import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE, MOVE_ROUTE } from '../actions';

const routes = (state = [], action) => {
  let sliced = null;
  switch (action.type) {
    case ADD_ROUTE:
      return [
        ...state,
        {
          id: action.id,
          routeName: action.routeName,
        },
      ];
    case DELETE_ROUTE:
      return state.filter(route => route.id !== action.id);
    case UPDATE_ROUTE:
      return state.map(route => {
        // eslint-disable-next-line no-param-reassign
        if (route.id === action.id) route.routeName = action.changedName;
        return route;
      });
    case MOVE_ROUTE:
      sliced = state.splice(action.from, 1);
      state.splice(action.to, 0, sliced[0]);
      return state.slice();
    default:
      return state;
  }
};

export default routes;
