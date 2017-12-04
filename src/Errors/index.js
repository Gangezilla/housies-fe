import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: ${props => props.bottom};
  right: 10px;
  transition: 0.2s;
`;

const StyledError = styled.span`
  max-width: 300px;
  background: #EA5D41;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
`;

const newError = (error, errors) => {

  const determineBottom = () => {
    const index = errors.map((existingError) => {
      return existingError.description;
    }).indexOf(error.description);
    return `${(index * 2) + 10} px`;
  };

  return (
    <ErrorContainer bottom={determineBottom()} key={error.description}>
      <StyledError>{error.description}</StyledError>
    </ErrorContainer>
  );
};

const Errors = ({
  errors,
}) => {
  return (
    <div>
      {errors.map(error => newError(error, errors))}
    </div>
  );
};

export default Errors;
