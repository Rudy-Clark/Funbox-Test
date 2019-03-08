import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Route from './Route';

const UL = styled.ul`
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
`;

const ListRoutes = ({ routes, deleteRoute }) => (
  <UL>
    {routes.map(route => (
      <Route
        id={route.id}
        key={route.id}
        routeName={route.routeName}
        deleteRoute={() => deleteRoute(route.id)}
      />
    ))}
  </UL>
);

ListRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  deleteRoute: PropTypes.func.isRequired,
};

export default DragDropContext(HTML5Backend)(ListRoutes);
