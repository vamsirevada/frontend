import React, { Fragment } from 'react';
import perry from '../../../images/perry2.png';
import volo from '../../../images/volodymy2.png';

const Page3 = () => {
  return (
    <Fragment>
      <div
        id='page-3'
        className='page3-columns page'
        data-aos='fade'
        data-aos-delay='25'
        data-aos-duration='500'
        data-aos-easing='ease'
      >
        <div className='container'>
          <div className='column'>
            <div
              className='column-2'
              data-aos='fade-down-right'
              data-aos-delay='50'
              data-aos-duration='400'
              data-aos-easing='linear'
            >
              <h1 className='ft-heading ft-heading-light'>
                Connect and Collaborate
              </h1>
              <p className='ft-para ft-para-light'>
                Stay connected & maintain your connections with industry
                professionals, college friends, aspiring talents and locate
                collaboration opportunities.
              </p>
            </div>

            <div
              className='column-1'
              data-aos='fade-down-left'
              data-aos-delay='30'
              data-aos-duration='400'
              data-aos-easing='linear'
            >
              <img className='collobrate' src={perry} alt='collobrate' />
              <br />
              <img src={volo} alt='chat' />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page3;
