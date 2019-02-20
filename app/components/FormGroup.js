import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Form = styled.form`
  margin: 20px auto 12px auto;
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
  border: 1px solid #e3e3e3;
  padding: 0;
  height: 40px;
  width: 354px;
`;

const Input = styled.input`
  border: none;
  flex-basis: 70%;
  height: 38px;
`;

const Icon = styled.svg`
  width: 32px;
  height: 32px;
  position: absolute;
  left: -50%;
  top: -50%;
  transform: translate(50%, 50%);
`;

const Button = styled.button`
  border: none;
  border-left: 1px solid #e3e3e3;
  background-color: none;
  background: none;
  padding: 0;
  margin: 0;
  position: relative;
  flex-basis: 30%;
  height: 40px;
`;

const FormGroup = ({ addRoute }) => {
  let input;
  const onSubmit = e => {
    e.preventDefault();
    addRoute(input.value);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Input ref={node => (input = node)} id="suggest" type="text" />
      <Button type="submit">
        <Icon
          viewBox="0 0 42 42"
          style={{ enableBackground: 'new 0 0 42 42;' }}
          x="0px"
          y="0px"
        >
          <polygon points="42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 " />
        </Icon>
      </Button>
    </Form>
  );
};

FormGroup.propTypes = {
  addRoute: PropTypes.func.isRequired,
};

export default FormGroup;
