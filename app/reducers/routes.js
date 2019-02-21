import { ADD_ROUTE, DELETE_ROUTE } from '../actions';

const routes = (state = [], action) => {
  switch (action.type) {
    case ADD_ROUTE:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
        },
      ];
    default:
      return state;
  }
};

export default routes;
