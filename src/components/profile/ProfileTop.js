<<<<<<< HEAD
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import gps from '../../images/icons/noun_Location_3139654.svg';
=======
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import gps from "../../images/icons/noun_Location_3139654.svg";
>>>>>>> 9d08fede18260942a8410a3ee91ea8c40531ffc5

const ProfileTop = ({
  profile: { user, buddies, location, status, experience, avatar },
}) => {
  return (
    <div className='profile-pic'>
      <div className='profile-container'>
        <div className='profile-flex'>
          <div className='profile-flex-left'>
            <div className='display-pic'>
              <img className='display-pic' src={avatar} alt='' />
            </div>
<<<<<<< HEAD
            <div className='profile-info-box'>
              <a href='#!'>
                <p className='border-1 white'>
                  <span className='f-1'>{buddies && buddies.length}</span>
                  <br /> Connections
                </p>
              </a>
              <a href='#!'>
                <p className='white'>
                  <span className='f-1'>{experience && experience.length}</span>
                  <br /> Projects{' '}
=======
            <div className="profile-info-box">
              <a>
                <p className="border-1">
                  <span className="f-1">{buddies && buddies.length}</span>
                  <br /> Connections
                </p>
              </a>
              <a>
                <p>
                  <span className="f-1">{experience && experience.length}</span>
                  <br /> Projects{" "}
>>>>>>> 9d08fede18260942a8410a3ee91ea8c40531ffc5
                </p>
              </a>
            </div>
          </div>
          <div className='profile-right'>
            <h2 className='heading-2'>
              {user.isGroup ? (
                <Fragment>{user.groupName}</Fragment>
              ) : (
                <Fragment>{user.fullName}</Fragment>
              )}
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
