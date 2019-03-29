import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Route from '../containers/DragRoute';
import gif from '../images/25.gif';

const UL = styled.ul`
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  position: relative;
`;
const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px;
  background: url(${gif});
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 30%;
`;

const ListRoutes = ({ routes, deleteRoute, moveRoute, request }) => (
  <UL>
    {request.loading && <Loader />}
    {!request.loading &&
      routes.map((route, idx) => (
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
