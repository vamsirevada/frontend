import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio } }) => {
  return (
    <div className='profile-des'>
      <div className='prof-container'>
        {bio && (
          <Fragment>
            <div>
              <h3>About Us:</h3>
              <p>{bio}</p>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
