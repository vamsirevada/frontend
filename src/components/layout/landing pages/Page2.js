import React, { Fragment } from 'react';
import create from '../../../images/create.png';

const Page2 = () => {
  return (
    <Fragment>
      <div
        id='page-2'
        className='page4-columns page'
        data-aos='slide-up'
        data-aos-delay='10'
        data-aos-duration='250'
        data-aos-easing='ease'
      >
        <div className='container'>
          <div className='column'>
            <div
              className='column-1'
              data-aos='zoom-in'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='ease'
            >
              <img className='collobrate' src={create} alt='collobrate' />
              <br />
            </div>

            <div
              className='column-2'
              data-aos='fade-right'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='ease'
            >
              <h1 className='ft-heading ft-heading-light'>
                Create and share Portfolio
              </h1>
              <p className='ft-para ft-para-light'>
                You can showcase your work in a professional and purposeful
                manner to industry professionals. Also, you can share your
                personal portfolios across various other platforms using the
                link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page2;
