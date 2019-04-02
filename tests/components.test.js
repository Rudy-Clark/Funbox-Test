/* eslint-disable no-unused-vars */
import React from 'react';
import '@babel/polyfill';
import { mount, shallow } from 'enzyme';
import 'jest-styled-components';

import Route from '../app/components/Route';
import Map from '../app/components/Map';
import App from '../app/components/App';
import InputWithRoute from '../app/components/InputWithRoute';
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
    id: 'hiphop',
    routeName: 'test',
    deleteRoute: jest.fn(),
    isDragging: false,
  };
  const route = mount(<Route {...mock} />);
  const routerShallowRender = shallow(<Route {...mock} />);
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

describe('FormGroup', () => {
  const mock = {
    requestSearch: jest.fn(),
    request: { error: false, loading: false, message: '' },
    resetError: jest.fn(),
  };

  const formGroup = shallow(<FormGroup {...mock} />);
  const fullFormGroup = mount(<FormGroup {...mock} />);

  it('FormGroup snapshot with props', () => {
    expect(formGroup.exists()).toBe(true);
    expect(formGroup).toMatchSnapshot();
  });

  it('FormGroup simulate click on empty form', () => {
    const form = fullFormGroup.find('form');
    form.simulate('submit');
    expect(mock.requestSearch).not.toHaveBeenCalled();
  });

  it('FormGroup check addRoute', () => {
    const value = 'test route';
    const form = fullFormGroup.find('form');
    form.find('input').instance().value = value;
    form.simulate('submit');
    expect(mock.requestSearch).toHaveBeenCalled();
    expect(mock.requestSearch.mock.calls.length).toBe(1);
    expect(mock.requestSearch.mock.calls[0][0]).toBe(value);
  });

  it('FormGroup check resetError', () => {
    const renderWithError = mount(
      <FormGroup
        {...mock}
        request={{ error: true, loading: false, message: '' }}
      />,
    );
    const errorBlock = renderWithError.find('div');
    errorBlock.simulate('click');
    expect(mock.resetError).toHaveBeenCalled();
    expect(mock.resetError.mock.calls.length).toBe(1);
    expect(fullFormGroup).toHaveProp({
      requestSearch: mock.requestSearch,
      request: { error: false, loading: false, message: '' },
      resetError: mock.resetError,
    });
  });
});

describe('Map', () => {
  it('Map snapshots', () => {
    const options = {
      center: [55.76, 37.64],
      zoom: 9,
      controls: [],
    };
    const map = shallow(<Map suggestView={'"suggest"'} options={options} />);
    expect(map.exists()).toBe(true);
    expect(map).toMatchSnapshot();
  });
});
