import React from 'react';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const GPortfolioLeftClient = ({ client: { client } }) => (
  <div className='prof-top prof-top-edu'>
    <img className='prof-pic g11' src={thumbnail} alt='' />
    <div>
      <p>
        <span className='bold'>{client}</span> <br />
      </p>
    </div>
  </div>
);

export default GPortfolioLeftClient;
