// import reducer routes
import reducer from '../app/reducers/routes';
// import tested actions
import { addRoute, updateRoute, moveRoute, deleteRoute } from '../app/actions';

describe('Test Reducer Routes', () => {
  it('Initial State', () => {
    expect(reducer(undefined, {})).toEqual(expect.any(Array));
  });

  it('Delete Route', () => {
    const state = [
      { id: 'rap', routeName: 'Foo' },
      { id: 'jazz', routeName: 'Bar' },
    ];
    const action = deleteRoute('rap');
    expect(reducer(state, action)).toEqual([{ id: 'jazz', routeName: 'Bar' }]);
  });

  it('Add Route', () => {
    const routeName = 'test route';
    const action = addRoute(routeName);
    expect(reducer([], action)).toEqual([
      { id: expect.any(String), routeName },
    ]);
  });

  it('Update Route', () => {
    const changedName = 'Bar';
    const targetId = 'hiphop';
    const state = [
      { id: 'jazz', routeName: 'Foo' },
      { id: targetId, routeName: 'Baz' },
    ];
    const action = updateRoute(targetId, changedName);
    expect(reducer(state, action)).toContainEqual({
      id: targetId,
      routeName: changedName,
    });
  });

  it('Move Routes', () => {
    const from = 2;
    const to = 6;
    const action = moveRoute(from, to);

    const state = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 15; i++) {
      state.push({ id: i, routeName: `${i}` });
    }

    // eslint-disable-next-line array-callback-return
    state.map((route, idx) => {
      if (idx === to) expect(reducer(state, action)[to]).toEqual(state[idx]);
    });
  });
});
