import React, { Fragment } from 'react';
import give from '../../../images/give.png';

const Page5 = () => {
  return (
    <Fragment>
      <div
        id='page-5'
        className='page5-columns page'
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
              <h1 className='ft-heading ft-heading-light black'>
                Give, Find, and Seize Opportunities
              </h1>
              <p className='ft-para ft-para-light black'>
                With a simple, powerful old school tool like “noticeboard” we
                are providing a customized portal for all users to put up their
                requirements, where each noticeboard will be personalized
                according to the needs of user so that you get purposeful
                information on opportunities spanning across the country.
              </p>
            </div>

            <div
              className='column-1'
              data-aos='zoom-out'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='ease'
            >
              <img className='collobrate' src={give} alt='collobrate' />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page5;
