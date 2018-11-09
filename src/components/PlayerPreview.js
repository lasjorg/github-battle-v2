import React from 'react';
import PropTypes from 'prop-types';

const PlayerPreview = ({ avatar, username, children }) => {
  return (
    <div>
      <div className="column">
        <img className="avatar" src={avatar} alt={`Avatar for ${username}`} />
        <h2 className="userName">@{username}</h2>
      </div>
      {children}
    </div>
  );
};

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};

export default PlayerPreview;
