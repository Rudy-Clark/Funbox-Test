// import action && constants
import {
  addRoute,
  deleteRoute,
  updateRoute,
  moveRoute,
  ADD_ROUTE,
  DELETE_ROUTE,
  UPDATE_ROUTE,
  MOVE_ROUTE,
} from '../app/actions';
import { requestSearch, REQUEST_SEARCH } from '../app/sagas/actions';

describe('Actions', () => {
  it('addRoute()', () => {
    const routeName = 'route 1 test name';
    const result = addRoute(routeName, 'rap');
    expect(result).toEqual({
      id: 'rap',
      routeName,
      type: ADD_ROUTE,
    });
  });

  it('deleteRoute()', () => {
    const id = 14;
    const result = deleteRoute(id);
    expect(result).toEqual({
      id,
      type: DELETE_ROUTE,
    });
  });

  it('updateRoute()', () => {
    const id = 14;
    const changedName = 'Test changed';
    const result = updateRoute(id, changedName);
    expect(result).toEqual({
      id,
      changedName,
      type: UPDATE_ROUTE,
    });
  });

  it('moveRoute()', () => {
    const from = 0;
    const to = 14;
    const result = moveRoute(from, to);
    expect(result).toEqual({
      from,
      to,
      type: MOVE_ROUTE,
    });
  });

  it('requestSearch() sagas', () => {
    const route = 'Test search';
    expect(requestSearch(route)).toEqual({
      type: REQUEST_SEARCH,
      route,
    });
  });
});
