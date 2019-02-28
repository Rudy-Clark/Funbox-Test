import { ADD_ROUTE, DELETE_ROUTE } from '../actions';
import { addRoute } from '../services';

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
      return state.filter(route => route.id !== action.id);
    default:
      return state;
  }
};

export default routes;
