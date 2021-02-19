import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PortfolioLeftExperience = ({
  experience: { title, company, location, from, to },
}) => (
  <div className='prof-top'>
    <div className='prof-pic p1'></div>
    <div>
      <p>
        <span className='bold'>{title}</span> <br />
        <span className='second-bold'>{company}</span> <br />
        <span className='third-bold'>
          <Moment format='MMM YYYY'>{from}</Moment>-{' '}
          {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
        </span>
      </p>
    </div>
  </div>
);

PortfolioLeftExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default PortfolioLeftExperience;
