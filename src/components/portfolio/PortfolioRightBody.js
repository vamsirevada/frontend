import React from 'react';
import ImageGrid from '../addportfolio/ImageGrid';

const PortfolioRightBody = ({ guest, profile, setProgress }) => {
  return (
    <div className='gallery'>
      {profile !== null && (
        <ImageGrid
          guest={guest}
          profile={profile}
          setProgress={setProgress}
          id={profile?.user?._id}
        />
      )}
    </div>
  );
};

export default PortfolioRightBody;
