import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE, MOVE_ROUTE } from '../actions';
import { addRoute, deleteRoute, swapLines } from '../services';

const routes = (state = [], action) => {
  let newState = null;
  let sliced = null;
  switch (action.type) {
    case ADD_ROUTE:
      addRoute(action.id, action.routeName);
      return [
        ...state,
        {
          id: action.id,
          routeName: action.routeName,
        },
      ];
    case DELETE_ROUTE:
      deleteRoute(action.id);
      return state.filter(route => route.id !== action.id);
    case UPDATE_ROUTE:
      return state.map(route => {
        if (route.id === action.id) route.routeName = action.changedName;
        return route;
      });
    case MOVE_ROUTE:
      swapLines(action.from, action.to);
      sliced = state.splice(action.from, 1);
      state.splice(action.to, 0, sliced[0]);
      return state.slice();
    default:
      return state;
  }
};

export default routes;
