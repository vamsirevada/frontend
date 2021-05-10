import React, { Fragment } from 'react';
import macbook from '../../../images/macbook_white@2x.png';

const Page4 = () => {
  return (
    <Fragment>
      <div
        id='page-4'
        className='page-columns page'
        data-aos='fade'
        data-aos-delay='25'
        data-aos-duration='500'
        data-aos-easing='ease'
      >
        <div className='container'>
          <div className='column'>
            <div
              className='column-1'
              data-aos='fade-right'
              data-aos-delay='10'
              data-aos-duration='250'
              data-aos-easing='ease'
            >
              <img
                className='macimage'
                src={macbook}
                alt='Macbook macbook_air'
              />
              <div className='circlebox'></div>
            </div>

            <div
              className='column-2'
              data-aos='fade-left'
              data-aos-delay='10'
              data-aos-duration='250'
              data-aos-easing='ease'
            >
              <h1 className='ft-heading ft-heading-light'>
                Discover top industry professionals
              </h1>
              <p className='ft-para ft-para-light'>
                You can search and find the top professionals from artist to
                technicians and engineers from all leading film & drama, music,
                modeling & fashion institutes of India and across entertainment
                industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Page4;
