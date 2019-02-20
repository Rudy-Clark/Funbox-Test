import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Route from './Route';

const UL = styled.ul`
  list-style: none;
  margin: 18px 0 0;
`;

const ListRoutes = ({ routes, deleteRoute }) => {
  const list = [
    { id: 'kjsdkfl1', title: 'Title 1' },
    { id: 'kk123saf', title: 'Title 2' },
  ];
  return (
    <UL>
      {list.map(route => (
        <Route
          id={route.id}
          key={route.id}
          title={route.title}
          deleteRoute={() => deleteRoute(route.id)}
        />
      ))}
    </UL>
  );
};

ListRoutes.propTypes = {
  routes: PropTypes.array.isRequired,
  deleteRoute: PropTypes.func.isRequired,
};

export default ListRoutes;
