export const ADD_ROUTE = 'ADD_ROUTE';
export const DELETE_ROUTE = 'DELETE_ROUTE';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const MOVE_ROUTE = 'MOVE_ROUTE';
export const ROUTE = 'ROUTE';
export const REQUEST = 'REQUEST';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';

export const addRoute = (routeName, id = generateId(5)) => ({
  id,
  routeName,
  type: ADD_ROUTE,
});

export const deleteRoute = id => ({
  id,
  type: DELETE_ROUTE,
});

export const updateRoute = (id, changedName) => ({
  id,
  changedName,
  type: UPDATE_ROUTE,
});

export const moveRoute = (from, to) => ({
  from,
  to,
  type: MOVE_ROUTE,
});

export const requestError = message => ({
  type: REQUEST_ERROR,
  message,
});

// Generate unique id;
const generateId = length => {
  const symbols = 'ABCDEFGHKLMNOPRSTQUVXYZWabcdefghklmnoprstquvxyzw1234567890';
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return result;
};
