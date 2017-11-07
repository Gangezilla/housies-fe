import React from 'react';
import { getInit } from '../util/helpers';

const Header = () => {
  const facebookLogin = () => {
    console.log('heeeloo');
    fetch('/auth/facebook/', getInit);
    // .then(res => res.json());
  };

  return (
    <div className="header">
      <button onClick={facebookLogin}> Log in to Facebook </button>
    </div>
  );
};

export default Header;
