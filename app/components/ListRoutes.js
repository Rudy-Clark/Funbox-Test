import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Route from '../containers/DragRoute';

const UL = styled.ul`
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
`;

const ListRoutes = ({ routes, deleteRoute, moveRoute }) => (
  <UL>
    {routes.map((route, idx) => (
      <Route
        id={route.id}
        key={route.id}
        routeName={route.routeName}
        moveRoute={moveRoute}
        deleteRoute={() => deleteRoute(route.id)}
        orderN={idx}
      />
    ))}
  </UL>
);

ListRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  moveRoute: PropTypes.func.isRequired,
};

export default ListRoutes;
