import React from 'react';
import Navbar from './layout/NavbarBlog';
import Footer from './layout/landing pages/Footer';
// import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className='home height'>
        <div className='error-box'>
          {/* <h1>404</h1> */}
          <h2>Under maintainence</h2>
          <p>
            We are sorry. we are working to make vanity website more awesome, We
            will be getting back to you shortly. Inconvenience Regretted. <br />
            <br /> Regards,
            <br /> Team Vanity{' '}
          </p>
          {/* <Link to='/' className='button-one'>
            Go To HomePage
          </Link> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
