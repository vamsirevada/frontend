import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const GPortfolioLeftAwards = ({ awards: { award, date, description } }) => (
  <div className='prof-btn'>
    <div className='prof-btn-flex'>
      <div className='prof-top prof-top-edu'>
        <img className='prof-pic g8' src={thumbnail} alt='' />
        <div>
          <p>
            <span className='bold'>{award}</span> <br />
            <span className='third-bold'>{description}</span> <br />{' '}
            <Moment format='MMM YYYY'>
              <span className='third-bold'>{date}</span>
            </Moment>
          </p>
        </div>
      </div>
    </div>
  </div>
);

GPortfolioLeftAwards.propTypes = {
  awards: PropTypes.object.isRequired,
};

export default GPortfolioLeftAwards;
