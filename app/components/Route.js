import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import mapManage from '../services/yandex-map';

const RouteCont = styled.div`
  margin: 0 0 7px;
`;

const ROUTE = styled.div`
  display: ${props => (props.isDragging ? 'none' : 'flex')};
  opacity: 1;
  flex-flow: row nowrap;
  align-items: start;
  cursor: pointer;
`;

const RoutePlaceholder = styled.div`
  display: block;
  margin: 0 0 9px;
  opacity: 1;
  width: 100%;
  height: 20px;
  border: 2px solid #ffff66;
`;

const IconDelete = styled.svg`
  width: 26px;
  height: 22px;
  cursor: pointer;
  flex-basis: 5%;
`;

const Title = styled.p`
  flex-basis: 95%;
  line-height: 20px;
  padding: 2px 5px;
  background-color: #1282cb;
  border-radius: 1px;
  height: 22px;
  color: #fff;
  font-size: 0.975em;
  margin: 0;
  word-break: break-all;
  overflow: hidden;
`;

const deletePoint = (id, deleteRoute) => {
  function handleClick() {
    mapManage.deletePlaceMark(id);
    deleteRoute(id);
  }
  return handleClick;
};

const Route = ({ id, routeName, deleteRoute, isDragging }) => (
  <RouteCont>
    <ROUTE isDragging={isDragging}>
      <Title>{routeName}</Title>
      <IconDelete
        onClick={deletePoint(id, deleteRoute)}
        viewBox="0 0 14.098 14.098"
      >
        <path
          style={{ fill: 'rgb(237, 70, 82)' }}
          d="M13.198,0H0.901C0.404,0,0,0.403,0,0.9v12.299c0,0.496,0.404,0.9,0.901,0.9h12.298
			      c0.497,0,0.9-0.404,0.9-0.9V0.901C14.098,0.403,13.694,0,13.198,0z M11.209,9.601l-1.608,1.607c-0.078,0.078-0.202,0.078-0.28,0
			      L7.049,8.936l-2.272,2.273c-0.078,0.077-0.202,0.077-0.28,0L2.889,9.601c-0.077-0.078-0.077-0.202,0-0.28L5.16,7.049L2.888,4.777
			      c-0.077-0.078-0.077-0.202,0-0.28l1.608-1.608c0.078-0.078,0.202-0.078,0.28,0l2.272,2.272L9.32,2.889
			      c0.078-0.078,0.202-0.078,0.28,0l1.607,1.608c0.078,0.078,0.078,0.202,0,0.28l-2.27,2.272l2.272,2.272
			      C11.286,9.399,11.286,9.523,11.209,9.601z"
        />
      </IconDelete>
    </ROUTE>
    {isDragging && <RoutePlaceholder />}
  </RouteCont>
);

Route.propTypes = {
  routeName: PropTypes.string.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Route;
