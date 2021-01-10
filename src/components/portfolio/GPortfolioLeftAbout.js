import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const GPortfolioLeftAbout = ({ profile: { bio } }) => {
  return (
    <Fragment>
      <div className='about'>
        <h3>About Us:</h3>
        <p>{bio}</p>
      </div>
    </Fragment>
  );
};

GPortfolioLeftAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default GPortfolioLeftAbout;
