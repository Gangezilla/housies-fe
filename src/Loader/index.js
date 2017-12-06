import React from 'react';
import styled, { keyframes } from 'styled-components';
import Housies from '../Header/housies.png';

const rotationBuilder = (degree) => {
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
  background-image: url(${Housies});
  position: fixed;
  bottom: 20px;
  left: 10px;
  height: 55px;
  width: 55px;
  background-position-x: center;
  background-position-y: center;
  background-size: 55px;
  animation: ${rotationBuilder(10)} 1.5s linear infinite;
`;


const Loader = () => (
  <LoaderSpinner />
);

export default Loader;

// const rotationBuilder = (degree) => {
//   const rotation = keyframes`
//     0% {
//       transform: rotate(0deg);
//     }
//     25% {
//       transform: rotate(-${degree}deg);
//     }
//     50% {
//       transform: rotate(0deg);
//       opacity: .9
//     }
//     75% {
//       transform: rotate(${degree}deg);
//     }
//   `;
//   return rotation;
// };
