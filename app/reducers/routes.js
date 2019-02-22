import { ADD_ROUTE, DELETE_ROUTE } from '../actions';
import { addRoute, deleteRoute } from '../services';

const routes = (state = [], action) => {
  switch (action.type) {
    case ADD_ROUTE:
      return [
        ...state,
        addRoute({
          id: action.id,
          routeName: action.title,
        }),
      ];
    case DELETE_ROUTE:
      return deleteRoute(action.id);
    default:
      return state;
  }
};

export default routes;
