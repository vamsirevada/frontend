import React from 'react';
import c35 from '../../images/Component35.svg';

const GPortfolioLeftSkill = ({ skills: { skill } }) => (
  <div className='flex-1'>
    <img className='resize' src={c35} alt='' />
    <p>{skill}</p>
  </div>
);

export default GPortfolioLeftSkill;
