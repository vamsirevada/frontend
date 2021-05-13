import React from 'react';
import PropTypes from 'prop-types';
import gps from '../../images/icons/noun_Location_3139654 copy.svg';

const GPortfolioLeftTop = ({ profile: { location, status, user } }) => {
  return (
    <div className='left-heading'>
      <div className='display-pic-g'></div>
      <h2 className='name'>
        {user.groupName && user.groupName} {user.fullName && user.fullName}
      </h2>
      <p> {user.userName && user.userName}</p>
      <p> {status}</p>
      <p>
        <img className='resize gps' src={gps} alt='' />{' '}
        <span className='gray'>{location}</span>
      </p>
    </div>
  );
};

GPortfolioLeftTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default GPortfolioLeftTop;
