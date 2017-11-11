import React from 'react';
import { getInit } from '../util/helpers';

const Header = ({
  user,
  updateLoggedInUser,
  showLoader,
}) => {
  const facebookLogin = () => {
    showLoader(true);
    fetch('/auth/facebook/', getInit)
      .then((res) => {
        showLoader(false);
        if (res.status === 200) {
          return res.json();
        }
        return null;
      })
      .then(json => updateLoggedInUser(json));
  };

  return (
    <div className="header">
      <button onClick={facebookLogin}> Log in to Facebook </button>
      <span> {JSON.stringify(user)} </span>
    </div>
  );
};

export default Header;
