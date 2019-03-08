export const ADD_ROUTE = 'ADD_ROUTE';
export const DELETE_ROUTE = 'DELETE_ROUTE';
export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const ROUTE = 'ROUTE';

export const addRoute = routeName => ({
  id: generateId(5),
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

// Generate unique id;
const generateId = length => {
  const symbols = 'ABCDEFGHKLMNOPRSTQUVXYZWabcdefghklmnoprstquvxyzw1234567890';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return result;
};
