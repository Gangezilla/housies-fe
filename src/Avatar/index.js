import React from 'react';

const Avatar = ({
  user,
}) => (
  <div className="av">
    <span> {JSON.stringify(user)} </span>
    <img
      className="av-img"
      alt={`${user.firstName} ${user.lastName}'s profile`}
      src={user.profilePic}
    />
  </div>
);

export default Avatar;
