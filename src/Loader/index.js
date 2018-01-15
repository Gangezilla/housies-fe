import React from 'react';
import styled, { keyframes } from 'styled-components';
import Housies from '../Header/housies.png';

const rotationBuilder = () => {
  const rotation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
  return rotation;
};

const LoaderSpinner = styled.img`
  position: fixed;
  bottom: 20px;
  left: 10px;
  height: 55px;
  width: 55px;
  animation: ${rotationBuilder(10)} 1.5s linear infinite;
`;

const Loader = () => (
  <LoaderSpinner src={Housies} />
);

export default Loader;
