import React from 'react';
import loading from './vanity.gif';

const Loading = () => {
  return (
    <div style={{ alignItems: 'center' }}>
      <img
        style={{
          display: 'block',
          margin: 'auto',
        }}
        src={loading}
        alt=''
      />
    </div>
  );
};

export default Loading;
