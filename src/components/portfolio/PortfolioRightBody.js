import React from "react";
import ImageGrid from "../addportfolio/ImageGrid";

const PortfolioRightBody = ({ profile }) => {
  return (
    <div className="gallery">
      {profile !== null && (
        <ImageGrid profile={profile} id={profile?.user?._id} />
      )}
    </div>
  );
};

export default PortfolioRightBody;
