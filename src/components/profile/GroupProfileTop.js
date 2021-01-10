import React from 'react';
import PropTypes from 'prop-types';
import gps from '../../images/icons/noun_Location_3139654.svg';

const GroupProfileTop = ({ profile: { user, location, status } }) => {
  // const { user, location, status } = profile;
  return (
    <div className='profile-pic'>
      <div className='profile-container'>
        <div className='profile-flex'>
          <div className='profile-flex-left'>
            <div className='display-pic'></div>
            <h2 className='heading-2'>{user.name}</h2>
            <p>{status}</p>
            <p>
              <span className='resize'>
                {' '}
                <img src={gps} alt='' />
              </span>{' '}
              {location && <span>{location}</span>}
            </p>
          </div>
          <div className='profile-right'>
            <div className='profile-info-box'>
              <a href='#!'>
                <p className='border-1'>
                  <span className='f-1'>3400</span>
                  <br /> Connections
                </p>
              </a>
              <a href='#!'>
                <p>
                  <span className='f-1'>50</span>
                  <br /> Projects Completed{' '}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default GroupProfileTop;
