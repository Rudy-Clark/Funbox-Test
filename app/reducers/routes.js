import { ADD_ROUTE, DELETE_ROUTE, UPDATE_ROUTE, MOVE_ROUTE } from '../actions';
import { addRoute, deleteRoute } from '../services';

const routes = (state = [], action) => {
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
      if (action.from === action.to) return state;
      let newState = state.slice();
      let spliced = newState.splice(action.from, 1);
      state.map((route, idx) => {
        if (idx === action.to) newState.splice(idx, 0, spliced[0]);
        return route;
      });
      return newState;
    default:
      return state;
  }
};

export default routes;
