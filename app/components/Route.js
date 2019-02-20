import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LI = styled.li`
  padding: 2px 5px;
  background-color: #005b96;
  position: relative;
  border-radius: 4px;
  color: #fff;
  font-size: 0.875em;
  margin: 0 0 7px;
  box-shadow: 2px 3px 0 rgba(0, 0, 0, 0.3);
`;

const IconDelete = styled.svg`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -27px;
  width: 26px;
  height: 22px;
  cursor: pointer;
`;

const Route = ({ title, deleteRoute }) => (
  <LI onClick={deleteRoute}>
    {title}
    <IconDelete viewBox="0 0 50 50">
      <circle style={{ fill: '#D75A4A' }} cx="25" cy="25" r="25" />
      <polyline
        style={{
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeMiterlimit: '10',
        }}
        points="16,34 25,25 34,16"
      />
      <polyline
        style={{
          fill: 'none',
          stroke: '#FFFFFF',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeMiterlimit: 10,
        }}
        points="16,16 25,25 34,34"
      />
    </IconDelete>
  </LI>
);

Route.propTypes = {
  title: PropTypes.string.isRequired,
  deleteRoute: PropTypes.func.isRequired,
};

export default Route;
