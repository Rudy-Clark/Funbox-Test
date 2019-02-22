import { ADD_ROUTE, DELETE_ROUTE } from '../actions';
import { addRoute } from '../services'

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
    default:
      return state;
  }
};

export default routes;
