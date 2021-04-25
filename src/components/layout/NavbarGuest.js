/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import maskGroup from '../../images/maskGroup.svg';
import { Link } from 'react-router-dom';

const NavbarGuest = () => {
  return (
    <Fragment>
      <div className='navbar'>
        <div className='s-logo'>
          <Link to='/'>
            <img src={maskGroup} alt='Vanity' />
          </Link>
        </div>

        <div className='container blog'>
          <div className='logo-box'>
            <Link to='/' className='hide'></Link>
          </div>

          <div className='nav-icons'>
            <ul>
              <li>
                <a href='/register' className='guest-signup'>
                  SignUp
                </a>
              </li>
              <li>
                <a href='/login' className='guest-signup'>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NavbarGuest;
