import React from 'react';
import ImageGrid from '../addportfolio/ImageGrid';

const PortfolioRightBody = ({ guest, profile, docs }) => {
  return (
    <div className='gallery'>
      {profile !== null && (
        <ImageGrid
          guest={guest}
          profile={profile}
          id={profile?.user?._id}
          docs={docs}
        />
      )}
    </div>
  );
};

export default PortfolioRightBody;
