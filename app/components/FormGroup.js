/* eslint-disable no-return-assign */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = styled.form`
  margin: 20px auto 12px auto;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  border: 1px solid ${props => (props.error ? '#e82b19' : '#e3e3e3')};
  padding: 0;
  height: 32px;
  width: 354px;
  align-items: center;
  position: relative;
`;

const Input = styled.input`
  border: none;
  flex-basis: 95%;
  height: 32px;
  margin: 0 12px;
  outline: none;
`;

const Icon = styled.svg`
  width: 28px;
  height: 28px;
  padding: 3px;
  fill: ${props => (props.error ? '#d02414' : '#5a5252')};
`;

const Button = styled.button`
  border: none;
  border-left: 1px solid ${props => (props.error ? '#e82b19' : '#e3e3e3')};
  background-color: none;
  background: none;
  padding: 0;
  margin: 0;
  position: relative;
  flex-basis: 0%;
  height: 32px;
`;

const ErrorBlock = styled.div`
  z-index: 99;
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  background-color: #e82b19;
  color: #fff;
  transition: all 0.4s;
  display: ${props => (props.error ? 'block' : 'none')};
  padding: 2px;
  text-align: center;
  word-break: break-all;
`;

const FormGroup = ({ requestSearch, request, resetError }) => {
  let input;
  const onSubmit = e => {
    e.preventDefault();
    if (!input.value.trim()) return;
    requestSearch(input.value);
    input.value = '';
  };
  return (
    <Form error={request.error} onSubmit={onSubmit}>
      <Input ref={node => (input = node)} id="suggest" type="text" />
      <Button error={request.error} type="submit">
        <Icon
          error={request.error}
          viewBox="0 0 42 42"
          style={{ enableBackground: 'new 0 0 42 42' }}
          x="0px"
          y="0px"
        >
          <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22" />
        </Icon>
      </Button>
      <ErrorBlock onClick={() => resetError()} error={request.error}>
        {request.message}
      </ErrorBlock>
    </Form>
  );
};

FormGroup.propTypes = {
  requestSearch: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  resetError: PropTypes.func.isRequired,
};

export default FormGroup;
