import React from 'react';

const Loader = () => {
  return (
    <div
      className='loader-screen'
      data-aos='fade-in'
      data-aos-delay='10'
      data-aos-duration='500'
      data-aos-easing='ease-in'
    >
      <div className='loader'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
