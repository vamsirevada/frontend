/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import gps from '../../images/icons/noun_Location_3139654.svg';
import { Link } from 'react-router-dom';

const ProfileTop = ({
  profile: { user, buddies, location, status, experience, avatar },
  projects,
}) => {
  return (
    <div className='profile-pic'>
      <div className='profile-container'>
        <div className='profile-flex'>
          <div className='profile-flex-left'>
            <div className='display-pic'>
              <img className='display-pic' src={avatar} alt='' />
            </div>
            <div className='profile-info-box'>
              <Link to={`/friends/${user?._id}`}>
                <p className='border-1 white'>
                  <span className='f-1'>{buddies && buddies.length}</span>
                  <span>
                    <br /> Connections
                  </span>
                </p>
              </Link>
              <Link to={`/projectlist/${user?._id}`}>
                <p>
                  <span className='f-1'>
                    {projects.length > 0 || experience.length > 0
                      ? projects.length + experience.length
                      : 0}
                  </span>
                  <span>
                    <br /> Projects{' '}
                  </span>
                </p>
              </Link>
            </div>
          </div>
          <div className='profile-right'>
            <h2 className='heading-2'>
              {user?.groupName && user.groupName}
              {user?.fullName && user.fullName}
            </h2>
            <p className='white'>@{user.userName}</p>
            <p className='white'>{status}</p>
            <p className='white'>
              <span className='resize'>
                {' '}
                <img src={gps} alt='' />
              </span>{' '}
              {location && <span>{location}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
