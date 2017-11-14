import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getInit } from '../util/helpers';
import Housies from './housies.png';

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
          alt={`${user.firstName} ${user.lastName}'s profile`}
          src={user.profilePic || user.profilepic}
        />
      );
    }
    return (
      <Login onClick={facebookLogin}> Log in with Facebook </Login>
    );
  };

  // background-color should transition from white to light green #87BF5E (maybe) on scroll.
  const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    justify-content: space-around;
    height: 60px;
  `;

  const Avatar = styled.img`
    border-radius: 50%;
  `;

  const Login = styled.button`
    border-color: #FDECC4;
    background-color: #FFFFFF;
    border-style: solid;
    padding: 5px;
    height: 40px;
  `;

  const Logo = styled.div`
    background: url(${Housies});
    height: 55px;
    width: 55px;
    background-position-x: center;
    background-position-y: center;
    background-size: 55px;
  `;

  const Heading = styled.h3`
  `;

  return (
    <Container>
      <Logo alt="Housies" />
      <Heading> Housies </Heading>
      {avatarOrLogin(user)}
    </Container>
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
