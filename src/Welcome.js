import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Loading from './images/Loading2.jpg';

const Welcome = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
    }, 2000);
    return () => {
      clearTimeout(t);
    };
  });

  if (loading) {
    return <Redirect to='/portfolio' />;
  }

  return (
    <div>
      <div>
        <img src={Loading} alt='' />
      </div>
    </div>
  );
};

export default Welcome;
