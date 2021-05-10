import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import fulllogo from '../../../images/Logo files/png/Vanity_logo-06.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Page1 = () => {
  return (
    <Fragment>
      <div
        id='page-1'
        className='page'
        data-aos='fade'
        data-aos-anchor-placement='top-bottom'
        data-aos-delay='25'
        data-aos-duration='250'
        data-aos-easing='ease'
      >
        <div className='container'>
          <div
            className='nav'
            data-aos='fade-down'
            // data-aos-delay='25'
            data-aos-duration='400'
            data-aos-easing='ease-in'
          >
            <img className='logo' src={fulllogo} alt='Logo' />
            <div>
              <ul>
                <li>
                  <Link to='/register'>Sign Up</Link>
                </li>
                <li>
                  <Link to='/login'>Log In</Link>
                </li>
                <li>
                  <Link to='/blog'>Blog</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex-content'>
            <div className='container1'>
              <div
                className='content'
                data-aos='fade-right'
                data-aos-duration='400'
                data-aos-easing='ease-in-out'
              >
                <h1 className='ft-heading'>
                  Networking platform for Media & Entertainment community
                </h1>
                <p className='ft-para1'>
                  Vanity is an Professional networking platform for the Media &
                  Entertainment community, with an aim to bring entertainment
                  industry professionals under one roof and facilitate them with
                  productive tools that will ensure success.
                </p>
                <Link
                  to='/register'
                  className='btn yellow'
                  // data-aos='fade-left'
                  // data-aos-delay='100'
                  // data-aos-duration='600'
                  // data-aos-easing='ease'
                >
                  Get started
                </Link>

                <div className='hide'>
                  <div>
                    <Link to='/register' className='r-btn'>
                      SignUp
                    </Link>
                  </div>
                  <div>
                    <Link to='/login' className='r-btn'>
                      LogIn
                    </Link>
                  </div>
                  <div>
                    <Link to='/blog' className='r-btn'>
                      Blog
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className='content-blank'></div> */}
              <div className='box-3'></div>
            </div>
          </div>
        </div>
        <div className='box-1'></div>
        <div className='box-2'></div>
        <div className='box-5'></div>
        <div className='scroll-down'>
          <ExpandMoreIcon />
          <p>Scroll to know more</p>
          <ExpandMoreIcon />
        </div>
      </div>
    </Fragment>
  );
};

export default Page1;
