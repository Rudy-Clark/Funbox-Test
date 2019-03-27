import React from 'react';
import styled from 'styled-components';
import Map from './Map';
import InputWithRoute from './InputWithRoute';

const Container = styled.div`
  max-width: 980px;
  margin: 12px auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const H1 = styled.h1`
  text-align: center;
`;

const options = {
  center: [55.76, 37.64],
  zoom: 9,
  controls: [],
};

const suggestView = 'suggest';

const App = () => (
  <div>
    <H1>Funbox Test</H1>
    <Container>
      <InputWithRoute />
      <Map options={options} suggestView={suggestView} />
    </Container>
  </div>
);

export default App;
