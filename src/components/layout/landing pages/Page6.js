import React, { Fragment } from 'react';
import manage from '../../../images/manage.png';

const Page6 = () => {
  return (
    <Fragment>
      <div
        id='page-6'
        className='page6-columns page'
        data-aos='fade'
        data-aos-delay='25'
        data-aos-duration='500'
        data-aos-easing='ease'
      >
        <div className='container'>
          <div className='column'>
            <div
              className='column-1'
              data-aos='zoom-in-up'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='ease'
            >
              <img className='collobrate' src={manage} alt='collobrate' />
              <br />
            </div>
            <div
              className='column-2'
              data-aos='fade-right'
              data-aos-delay='25'
              data-aos-duration='500'
              data-aos-easing='linear'
            >
              <h1 className='ft-heading ft-heading-light'>
                Easily manage your projects
              </h1>
              <p className='ft-para ft-para-light'>
                Manage your projects and reduce the cost, energy and effort for
                processes like searching talent, auditioning and hiring talents
                across India, effectively increasing your productivity &
                efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page6;
