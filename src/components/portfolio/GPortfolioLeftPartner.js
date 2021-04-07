import React from 'react';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const GPortfolioLeftPartner = ({ partner: { partner } }) => (
  <div className='prof-top prof-top-edu'>
    <img className='prof-pic g9' src={thumbnail} alt='' />
    <div>
      <p>
        <span className='bold'>{partner}</span> <br />
      </p>
    </div>
  </div>
);

export default GPortfolioLeftPartner;
