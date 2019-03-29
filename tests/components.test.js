/* eslint-disable no-unused-vars */
import React from 'react';
import '@babel/polyfill';
import { mount, shallow } from 'enzyme';
import 'jest-styled-components';

import Route from '../app/components/Route';
import Map from '../app/components/Map';
import App from '../app/components/App';
import InputWithRoute from '../app/components/InputWithRoute';
import ListRoutes from '../app/components/ListRoutes';
import DragRoute from '../app/containers/DragRoute';
import FormGroup from '../app/components/FormGroup';

describe('App', () => {
  it('App component snapshot', () => {
    const app = shallow(<App />);
    expect(app.exists()).toBe(true);
    expect(app).toMatchSnapshot();
  });
});

describe('InputWithRoute', () => {
  it('InputWithRoute snapshot', () => {
    const inputWithRoute = shallow(<InputWithRoute />);
    expect(inputWithRoute.exists()).toBe(true);
    expect(inputWithRoute).toMatchSnapshot();
  });
});

describe('Route', () => {
  const mock = {
    routeName: 'test',
    deleteRoute: jest.fn(),
    isDragging: false,
  };
  const route = mount(
    <Route
      routeName={mock.routeName}
      deleteRoute={mock.deleteRoute}
      isDragging={mock.isDragging}
    />,
  );
  const routerShallowRender = shallow(
    <Route
      routeName={mock.routeName}
      deleteRoute={mock.deleteRoute}
      isDragging={mock.isDragging}
    />,
  );
  it('Route component snapshot with props', () => {
    expect(routerShallowRender).toMatchSnapshot();
  });

  it('check routeName text', () => {
    expect(route.text()).toEqual(mock.routeName);
  });

  it('check Route elements', () => {
    const cont = route.find('div');
    expect(cont.length).toBe(2);
    expect(cont.find('div div').length).toBe(1);
    expect(cont.find('svg').length).toBe(1);
    expect(cont.find('p').length).toBe(1);
  });

  it('check delete route', () => {
    route.find('svg').simulate('click');
    expect(mock.deleteRoute).toHaveBeenCalled();
  });

  it('Route contains props', () => {
    expect(route).toHaveProp({
      routeName: mock.routeName,
      isDragging: mock.isDragging,
      deleteRoute: mock.deleteRoute,
    });
  });
});

describe('ListRoutes', () => {
});

describe('FormGroup', () => {
  const mock = {
    addRoute: jest.fn(),
  };
  const formGroup = shallow(<FormGroup addRoute={mock.addRoute} />);

  it('FormGroup snapshot with props', () => {
    expect(formGroup.exists()).toBe(true);
    expect(formGroup).toMatchSnapshot();
  });

  it('FormGroup simulate click on empty form', () => {
    const form = formGroup.find('form');
    form.simulate('submit');
    expect(mock.addRoute).not.toHaveBeenCalled();
  });

  it('FormGroup check addRoute', () => {
    const value = 'test route';
    const form = formGroup.find('form');
    form.find('input').instance().value = value;
    form.simulate('submit');
    expect(mock.addRoute).toHaveBeenCalled();
    expect(mock.addRoute.mock.calls.length).toBe(1);
    expect(mock.addRoute.mock.calls[0][0]).toBe(value);
  });
});

describe('Map', () => {
  it('Map snapshots', () => {
    const map = shallow(<Map />);
    expect(map.exists()).toBe(true);
    expect(map).toMatchSnapshot();
  });
});
