/* eslint-disable prefer-const no-unused-vars */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { combineReducers } from 'redux';

import Form from '../app/containers/Form';
import RouteList from '../app/containers/RouteList';

describe('Form', () => {
  let store;
  // eslint-disable-next-line no-unused-vars
  let form;
  const mockStore = configureStore([]);

  beforeEach(() => {
    store = mockStore({});
    form = mount(
      <Provider store={store}>
        <Form />
      </Provider>,
    );
  });

  it('addRoute dispatch', () => {
    const value = 'test route';
    const addRoute = name => ({ type: 'ADD', routeName: name });
    store.dispatch(addRoute(value));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'ADD', routeName: value }]);
    store.dispatch(addRoute('second'));
    expect(actions.length).toBe(2);
    expect(actions).toContainEqual({ type: 'ADD', routeName: 'second' });
  });
});

describe('RouteList', () => {
  const initialState = [
    { id: 'pop', routeName: 'sweet dreams' },
    { id: 'rap', routeName: 'candy shop' },
  ];
  let store;
  // eslint-disable-next-line no-unused-vars
  let list;
  const mockStore = configureStore([]);

  beforeEach(() => {
    store = mockStore(
      combineReducers({
        routes: (state = initialState) => state,
      }),
    );
    list = mount(
      <Provider store={store}>
        <RouteList />
      </Provider>,
    );
  });

  it('delete route dispatch', () => {
    const deleteRoute = { type: 'DELETE' };
    const actions = store.getActions();
    store.dispatch(deleteRoute);
    expect(actions).toContainEqual(deleteRoute);
  });

  it('check RouteList contain elements', () => {
    const res = list.find('li');
    expect(res.length).toBe(2);
  });
});
