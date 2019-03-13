/* eslint-disable no-return-assign */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = styled.form`
  margin: 20px auto 12px auto;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  border: 1px solid #e3e3e3;
  padding: 0;
  height: 32px;
  width: 354px;
  align-items: center;
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
`;

const Button = styled.button`
  border: none;
  border-left: 1px solid #e3e3e3;
  background-color: none;
  background: none;
  padding: 0;
  margin: 0;
  position: relative;
  flex-basis: 0%;
  height: 32px;
`;

const FormGroup = ({ addRoute }) => {
  let input;
  const onSubmit = e => {
    e.preventDefault();
    if (!input.value.trim()) return;
    addRoute(input.value);
    input.value = '';
  };
  return (
    <Form onSubmit={onSubmit}>
      <Input ref={node => (input = node)} id="suggest" type="text" />
      <Button type="submit">
        <Icon
          viewBox="0 0 42 42"
          style={{ enableBackground: 'new 0 0 42 42' }}
          x="0px"
          y="0px"
        >
          <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22" />
        </Icon>
      </Button>
    </Form>
  );
};

FormGroup.propTypes = {
  addRoute: PropTypes.func.isRequired,
};

export default FormGroup;
