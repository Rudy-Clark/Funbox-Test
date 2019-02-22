import React from 'react';
import styled from 'styled-components';
import RouteList from '../containers/RouteList';
import Form from '../containers/Form';

const Wrapper = styled.div`
  flex-basis: 45%;
`;

const InputWithRoute = () => (
  <Wrapper>
    <Form />
    <RouteList />
  </Wrapper>
);

export default InputWithRoute;
