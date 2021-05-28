import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Page1 from './landing pages/Page1';
import Page2 from './landing pages/Page2';
import Page3 from './landing pages/Page3';
import Page4 from './landing pages/Page4';
import Page5 from './landing pages/Page5';
import Page6 from './landing pages/Page6';
import Page7 from './landing pages/Page7';
import Footer from './landing pages/Footer';

const Landing = ({ isAuthenticated }) => {
  const [header, setHeader] = useState('header');

  const listenScrollEvent = (event) => {
    // 758
    if (window.scrollY < 481) {
      return setHeader('header');
    }
    //758 && 1524
    if (481 <= window.scrollY && window.scrollY < 1253) {
      return setHeader('header2');
    }
    //1524 &&2289
    if (1253 <= window.scrollY && window.scrollY < 2015) {
      return setHeader('header3');
    }
    //2289 && 3055
    if (2015 <= window.scrollY && window.scrollY < 2783) {
      return setHeader('header4');
    }
    //3055 && 3821
    if (2783 <= window.scrollY && window.scrollY < 3550) {
      return setHeader('header5');
      //3821 && 4587
    } else if (3550 <= window.scrollY && window.scrollY < 4316) {
      return setHeader('header6');
      //4588
    } else if (4316 <= window.scrollY) {
      return setHeader('header7');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/portfolio' />;
  }
  return (
    <>
      <div className='dotstyle' data-aos='fade'>
        <ul>
          <li>
            <a href='#p-1' className={`dot dot1 ${header}`}>
              Page1
            </a>
          </li>
          <li>
            <a href='#p-2' className={`dot dot2 ${header}`}>
              Page2
            </a>
          </li>
          <li>
            <a href='#p-3' className={`dot dot3 ${header}`}>
              Page3
            </a>
          </li>
          <li>
            <a href='#p-4' className={`dot dot4 ${header}`}>
              Page4
            </a>
          </li>
          <li>
            <a href='#p-5' className={`dot dot5 ${header}`}>
              Page5
            </a>
          </li>
          <li>
            <a href='#p-6' className={`dot dot6 ${header}`}>
              Page6
            </a>
          </li>
          <li>
            <a href='#p-7' className={`dot dot7 ${header}`}>
              Page7
            </a>
          </li>
        </ul>
      </div>
      <div id='p-1'>
        <Page1 />
      </div>

      <div id='p-2'>
        <Page2 />
      </div>
      <div id='p-3'>
        <Page3 />
      </div>
      <div id='p-4'>
        <Page4 />
      </div>
      <div id='p-5'>
        <Page5 />
      </div>
      <div id='p-6'>
        <Page6 />
      </div>
      <div id='p-7'>
        <Page7 />
      </div>
      <Footer />
    </>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
