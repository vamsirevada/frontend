import React from 'react';
import c35 from '../../images/Component35.svg';

const PortfolioLeftSkill = ({ skills: { skill } }) => (
  <div className='prof-top skill'>
    <div>
      <img className='resize' src={c35} alt='' />
    </div>
    <div>
      <p>
        <span className='bold'>{skill}</span> <br />
      </p>
    </div>
  </div>
);

export default PortfolioLeftSkill;
