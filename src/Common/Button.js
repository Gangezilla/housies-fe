import styled from 'styled-components';

const Button = styled.button`
  display: block;
  background: white;
  padding: 5px 15px;
  min-height: 40px;
  min-width: 125px;
  color: #7ab8e3;
  font-size: 14px;
  border: 2px solid #7ab8e3;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: white;
    background: #7ab8e3;
  }
`;

export default Button;
