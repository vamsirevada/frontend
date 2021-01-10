import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import macbook from '../../../images/macbook_white@2x.png';

const Page7 = () => {
  return (
    <Fragment>
      <div id='page-7' className='page7-columns page'>
        <div className='container'>
          <div className='column'>
            <div className='column-2'>
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
              <Link to='/register' className='btn'>
                Get started
              </Link>
            </div>
            <div className='column-1'>
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
