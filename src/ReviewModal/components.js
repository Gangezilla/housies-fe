import { Field } from 'formik';
import styled from 'styled-components';
import Button from '../Common/Button';

export const ModalGuts = styled.div`
overflow: auto;
background: white;
min-height: 500px;
padding: 50px;  
position: relative;
max-width: 500px;
width: 100%;
`;

export const Label = styled.label`
display: block;
font-family: 'Montserrat', sans-serif;
text-transform: uppercase;
font-size: 14px;
margin-bottom: 5px;
`;

export const FormBlock = styled.div`
display: block;
margin: 15px 0;
`;

export const FitButton = Button.extend`
width: 100%;
margin-top: 50px;
`;

export const Address = styled.p`

`;

export const CloseButton = Button.extend`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const StyledField = styled(Field)`
width: 100%;
padding: 5px;
border: 1px solid rgb(216, 216, 216);
font-family: 'Cardo', serif;
font-size: 14px;
box-sizing: border-box;
`;

export const Textarea = styled.textarea`
padding: 5px;
max-width: 100%;
width: 100%;
min-width: 100%;
border: 1px solid rgb(216, 216, 216);
font-family: 'Cardo', serif;
font-size: 14px;
box-sizing: border-box;
`;

export const styledError = styled.p`
color: '#EA5D41';
text-transform: uppercase;
font-family: 'Montserrat', sans-serif;
font-size: 10px;
`;
