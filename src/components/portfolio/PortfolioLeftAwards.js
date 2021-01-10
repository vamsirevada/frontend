import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const PortfolioLeftAwards = ({ awards: { award, date, description } }) => (
  <div className='prof-btn'>
    <div className='prof-btn-flex'>
      <div className='prof-top prof-top-edu'>
        <div className='prof-pic p4'></div>
        <div>
          <p>
            <span className='bold'>
              {award} -{' '}
              <Moment format='YYYY'>
                <span className='third-bold'>{date}</span>
              </Moment>
            </span>{' '}
            <br />
            <span className='second-bold'>{description}</span>{' '}
          </p>
        </div>
      </div>
    </div>
  </div>
);

PortfolioLeftAwards.propTypes = {
  awards: PropTypes.object.isRequired,
};

export default PortfolioLeftAwards;
