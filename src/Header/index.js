import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getInit } from '../util/helpers';
import Housies from './housies.png';
import Button from '../Common/Button';
import Heading from '../Common/Heading';

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
      <Button onClick={facebookLogin}> Facebook Login </Button>
    );
  };

  const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: white;
    justify-content: space-around;
    height: 60px;
    max-width: 800px;
    margin: 0 auto;
  `;

  const Avatar = styled.img`
    border-radius: 50%;
  `;

  const Logo = styled.div`
    background: url(${Housies});
    height: 55px;
    width: 55px;
    background-position-x: center;
    background-position-y: center;
    background-size: 55px;
  `;

  const HousiesName = Heading.extend`
    display: none;

    @media (max-width: 480px) {
      display: block;
    }
  `;

  return [
    <Container>
      <Logo alt="Housies" />
      <HousiesName> Housies </HousiesName>
      {avatarOrLogin(user)}
    </Container>,
    <Container>
      <p>The best place to learn about your new rental property</p>
    </Container>,
  ];
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
