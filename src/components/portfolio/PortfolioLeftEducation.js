import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const PortfolioLeftEducation = ({
  education: { school, degree, fieldofstudy, from, to },
}) => (
  <div className='prof-btn'>
    <div className='prof-btn-flex'>
      <div className='prof-top prof-top-edu'>
        <img className='prof-pic p3' src={thumbnail} alt='' />
        <div>
          <p>
            <span className='bold'>{school}</span> <br />
            <span className='second-bold'>
              {degree}, {fieldofstudy}
            </span>{' '}
            <br />
            <span className='third-bold'>
              <Moment format='MMM YYYY'>{from}</Moment> -{' '}
              {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

PortfolioLeftEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default PortfolioLeftEducation;
