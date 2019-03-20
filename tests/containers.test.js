/* eslint-disable prefer-const */
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import Form from '../app/containers/Form';

describe('FormCont', () => {
  let initialState = {};
  let store;
  // eslint-disable-next-line no-unused-vars
  let form;
  const mockStore = configureStore();

  beforeEach(() => {
    store = mockStore(initialState);
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
  });
});
