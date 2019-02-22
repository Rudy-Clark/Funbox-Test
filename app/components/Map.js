import React from 'react';
import styled from 'styled-components';

const Map = styled.div`
  flex-basis: 45%;
  height: 320px;
  width: 100%;
  margin: 20px 0 0;
`;

const MapView = () => <Map id="map" />;

export default MapView;
