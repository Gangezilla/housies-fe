import React from 'react';
import PropTypes from 'prop-types';
import { getInit } from '../util/helpers';
import Avatar from '../Avatar';

const Header = ({
  user,
  updateLoggedInUser,
  showLoader,
  removeVisibleError,
}) => {
  const facebookLogin = () => {
    showLoader(true);
    removeVisibleError('Please log in with Facebook first.');
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

  const avatarOrLogin = () => {
    if (user) {
      return (
        <Avatar
          user={user}
        />
      );
    }
    return (
      <button onClick={facebookLogin}> Log in to Facebook </button>
    );
  };

  return (
    <div className="header">
      {avatarOrLogin(user)}
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    locale: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    profilepic: PropTypes.string,
  }),
  updateLoggedInUser: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: null,
};

export default Header;
