import React from 'react';

const GPortfolioLeftPartner = ({ partner: { partner } }) => (
  <div className='prof-top prof-top-edu'>
    <div className='prof-pic g9'></div>
    <div>
      <p>
        <span className='bold'>{partner}</span> <br />
      </p>
    </div>
  </div>
);

export default GPortfolioLeftPartner;
