import React from 'react';
import logo from '../../../images/vanitylogo1.png';

const Footer = () => {
  return (
    <div id='main-footer'>
      <div className='ft-para'> &copy; Vanity 2021, All Rights Reserved.</div>
      <div className='center'>
        <img src={logo} alt='logo' />
      </div>
      <div className='ft-para end'>
        <strong>Contact us:</strong>
        <br />
        support@vanity.com
      </div>
    </div>
  );
};

export default Footer;
