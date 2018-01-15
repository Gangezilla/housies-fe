import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  padding: 30px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p style={{ textAlign: 'center' }}>
        Housies
      </p>
    </FooterContainer>
  );
};

export default Footer;
