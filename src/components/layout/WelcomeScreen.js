import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import logo from '../../images/Logo files/png/Vanity_logo-05.png';

const WelcomeScreen = () => {
  const [welcome, setWelcome] = useState(true);
  const [motto, setMotto] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setWelcome(false);
      setMotto(true);
    }, 2500);
  });

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
    }, 2700);
    return () => {
      clearTimeout(t);
    };
  });

  if (loading) {
    return <Redirect to='/portfolio' />;
  }

  return (
    <>
      <div
        className='welcome-screen'
        // data-aos='fade-in'
        // data-aos-delay='10'
        // data-aos-duration='250'
        // data-aos-easing='ease-in'
      >
        <section
          className={welcome ? 'welcome' : 'welcome-hide'}
          // className='welcome'
          data-aos='fade'
          data-aos-delay='300'
          data-aos-duration='500'
          data-aos-easing='ease-in'
        >
          <img src={logo} alt='' />
          <h1>Welcome to Vanity</h1>
        </section>

        <section className={motto ? 'motto' : 'motto-hide'}>
          <p>
            Bringing you to the right place, time and people for your right
            opportunity.
          </p>
        </section>
      </div>
    </>
  );
};

export default WelcomeScreen;
