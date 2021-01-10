import React from 'react';

const GPortfolioLeftClient = ({ client: { client } }) => (
  <div className='prof-top prof-top-edu'>
    <div className='prof-pic g11'></div>
    <div>
      <p>
        <span className='bold'>{client}</span> <br />
      </p>
    </div>
  </div>
);

export default GPortfolioLeftClient;
