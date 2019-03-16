/* eslint-disable no-unused-vars */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Adapter from 'enzyme-adapter-react-16';

import Route from '../app/components/Route';
import Map from '../app/components/Map';
import App from '../app/components/App';
import InputWithRoute from '../app/components/InputWithRoute';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('App component snapshot', () => {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
    expect(app.exists()).toBe(true);
  });
});

describe('InputWithRoute', () => {
  it('InputWithRoute snapshot', () => {
    const inputWithRoute = shallow(<InputWithRoute />);
    expect(inputWithRoute).toMatchSnapshot();
    expect(inputWithRoute.exists()).toBe(true);
  });
});

describe('Route', () => {
  it('Route component snapshot', () => {
    const route = shallow(<Route />);
    expect(route).toMatchSnapshot();
  });

  it('Route component snapshot with props', () => {
    const mock = {
      routeName: 'test',
      deleteRoute: jest.fn(),
      isDragging: false,
    };

    const route = shallow(
      <Route
        routeName={mock.routeName}
        deleteRoute={mock.deleteRoute}
        isDragging={mock.isDragging}
      />,
    );
    expect(route).toMatchSnapshot();
  });

  it('check Route render', () => {
    const route = shallow(<Route />);
    expect(route.exists()).toBe(true);
  });

  it('check routeName text', () => {
    const routeName = 'Test route';
    const route = mount(<Route routeName={routeName} />);
    expect(route.text()).toEqual(routeName);
  });

  it('check Route elements', () => {
    const route = mount(<Route />);
    const cont = route.find('div');
    expect(cont.length).toBe(2);
    expect(cont.find('div div').length).toBe(1);
    expect(cont.find('svg').length).toBe(1);
    expect(cont.find('p').length).toBe(1);
  });

  it('check delete route', () => {
    const spyClick = jest.fn();
    const route = mount(<Route deleteRoute={spyClick} />);
    route.find('svg').simulate('click');
    expect(spyClick).toHaveBeenCalled();
  });
});

describe('Map', () => {
  it('Map component snapshot', () => {
    const map = mount(<Map />);
    expect(map).toMatchSnapshot();
  });
  it('Map exists', () => {
    const map = shallow(<Map />);
    expect(map.exists()).toBe(true);
  });
});
