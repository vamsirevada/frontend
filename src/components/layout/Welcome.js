import React, { useEffect, useState } from 'react';
import Loading2 from '../../images/Loading2.jpg';
import { Redirect } from 'react-router';

const Welcome = (props) => {
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
    <div className='welcome-page'>
      <img className='welcome-image' src={Loading2} alt='' />
    </div>
  );
};

export default Welcome;
