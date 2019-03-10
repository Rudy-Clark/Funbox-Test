import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE, MOVE_ROUTE } from '../actions';
import { addRoute, deleteRoute } from '../services';

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
      newState = state.slice();
      sliced = newState.splice(action.from, 1);
      state.map((route, idx) => {
        if (idx === action.to) newState.splice(idx, 0, sliced[0]);
      });
      return newState;
    default:
      return state;
  }
};

export default routes;
