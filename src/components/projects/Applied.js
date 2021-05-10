import React from 'react';
import tick from '../../images/tick.svg';

const Applied = () => {
  return (
    <div className='applied'>
      <div className='applied-box'>
        <div>
          <img src={tick} alt='' />
        </div>
        <div>
          <h3>Applied</h3>
        </div>
      </div>
    </div>
  );
};

export default Applied;
