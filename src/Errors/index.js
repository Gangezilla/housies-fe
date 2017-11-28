import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  position: fixed;
  top: 10px;
  right: 10px;
  transition: 0.2s;
`;

const StyledError = styled.span`
  width: 150px;
  background: #EA5D41;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
`;

const Error = (error) => {
  return (
    <ErrorContainer key={error.description}>
      <StyledError>{error.description}</StyledError>
    </ErrorContainer>
  );
};

const Errors = ({
  errors,
}) => {
  console.log(errors);
  return (<div>
    {errors.map(error => Error(error))}
  </div>
  );
};

export default Errors;
