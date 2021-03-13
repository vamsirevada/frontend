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
      <Page1 />
      <Page2 />
      <Page3 />
      <Page4 />
      <Page5 />
      <Page6 />
      <Page7 />
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
