import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const GPortfolioLeftTeam = ({ team: { name, status, from, to } }) => (
  <div className='prof-top prof-top-edu'>
    <img className='prof-pic p1' src={thumbnail} alt='' />
    <div>
      <p>
        <span className='bold bold-1'>{name}</span> <br />
        <span className='second-bold'>{status}</span> <br />
        <span className='third-bold'>
          <Moment format='MMM YYYY'>{from}</Moment>-{' '}
          {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
        </span>
      </p>
    </div>
  </div>
);

GPortfolioLeftTeam.propTypes = {
  team: PropTypes.object.isRequired,
};

export default GPortfolioLeftTeam;
