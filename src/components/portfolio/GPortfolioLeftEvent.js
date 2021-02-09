import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const GPortfolioLeftEvent = ({ events: { event, date, description } }) => (
  <div className='prof-top'>
    <div className='prof-pic g6'></div>
    <div>
      <p>
        <span className='bold'>
          {event} - <Moment format='YYYY'>{date}</Moment>
        </span>{' '}
        <br />
        <span className='third-bold'>{description}</span>
      </p>
    </div>
  </div>
);

GPortfolioLeftEvent.propTypes = {
  events: PropTypes.object.isRequired,
};

export default GPortfolioLeftEvent;
