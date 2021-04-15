import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const PortfolioLeftExperience = ({
  experience: { title, company, project, location, from, to },
}) => (
  <div className='prof-top'>
    <img className='prof-pic p1' src={thumbnail} alt='' />
    <div>
      <p>
        <span className='bold'>{project}</span> <br />
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
