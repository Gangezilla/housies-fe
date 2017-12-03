import styled from 'styled-components';

const Modal = styled.div`
  display: flex;
  position: fixed;
  z-index: 10;
  overflow: auto;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,0.4);
`;

export default Modal;
