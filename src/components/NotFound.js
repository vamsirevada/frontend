import React from 'react';
// import Footer from "../layouts/Footer";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className='home height'>
        <div className='error-box'>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            We are sorry. But the page you are looking for cannot be found.{' '}
          </p>
          <Link to='/' className='button-one'>
            Go To HomePage
          </Link>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default NotFound;
