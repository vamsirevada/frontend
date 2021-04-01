import React from 'react';
// import { connect } from 'react-redux';
import loading from './Vanity_logo.png';
import './Loading.css';

const Loading = () => {
  return (
    <div className='card-container'>
      <div className='card-loader'>
        <img src={loading} alt='' />
      </div>
    </div>
  );
};

export default Loading;
