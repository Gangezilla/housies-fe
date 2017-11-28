import styled from 'styled-components';

const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 10;
  overflow: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Modal;


// display: none; /* Hidden by default */
// position: fixed; /* Stay in place */
// z-index: 1; /* Sit on top */
// left: 0;
// top: 0;
// width: 100%; /* Full width */
// height: 100%; /* Full height */
// overflow: auto; /* Enable scroll if needed */
// background-color: rgb(0,0,0); /* Fallback color */
// background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
