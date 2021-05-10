import React, { Fragment } from 'react';
import NavbarBlog from '../layout/NavbarBlog';
import logo from '../../images/Logo files/png/Vanity_logo-05.png';

const Help = () => {
  return (
    <Fragment>
      <NavbarBlog />
      <div className='help'>
        <div className='help-page'>
          <img src={logo} alt='' />
          <h1>How can we help ?</h1>
          <input type='text' placeholder='Ask your Query ?' />
        </div>
      </div>
    </Fragment>
  );
};

export default Help;
