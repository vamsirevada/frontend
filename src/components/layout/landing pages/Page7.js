import React, { Fragment } from 'react';
import macbook from '../../../images/macbook_white@2x.png';

const Page7 = () => {
  return (
    <Fragment>
      <div
        id='page-7'
        className='page7-columns page'
        data-aos='fade'
        data-aos-delay='25'
        data-aos-duration='500'
        data-aos-easing='ease'
      >
        <div className='container'>
          <div className='column'>
            <div
              className='column-2'
              data-aos='fade-left'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='ease'
            >
              <h1 className='ft-heading '>
                One stop for finding top industry creatives
              </h1>
              <p className='ft-para '>
                With a simple, powerful old school tool like “noticeboard” we
                are providing a customized portal for all users to put up their
                requirements, where each noticeboard will be personalized
                according to the needs of user so that you get purposeful
                information on opportunities spanning across the country.
              </p>
              <a href='#page-1' className='btn' data-aos='fade-left'>
                Get started
              </a>
            </div>
            <div
              className='column-1'
              data-aos='fade-right'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='ease'
            >
              <img className='collobrate' src={macbook} alt='collobrate' />
              <div className='circlebox'></div>
              <div className='rotatebox'></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page7;
