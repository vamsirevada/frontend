import React from 'react';
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
  if (isAuthenticated) {
    return <Redirect to='/portfolio' />;
  }

  return (
    <>
      <div class='dotstyle dotstyle-fillup'>
        <ul>
          <li class='current'>
            <a href='#p-1'>Page1</a>
          </li>
          <li>
            <a href='#p-2'>Page2</a>
          </li>
          <li>
            <a href='#p-3'>Page3</a>
          </li>
          <li>
            <a href='#p-4'>Page4</a>
          </li>
          <li>
            <a href='#p-5'>Page5</a>
          </li>
          <li>
            <a href='#p-6'>Page6</a>
          </li>
          <li>
            <a href='#p-7'>Page7</a>
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
