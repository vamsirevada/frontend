import React, { useState } from "react";
import ImageGrid from "../addportfolio/ImageGrid";
import Modal from "../addportfolio/Modal";

const PortfolioRightBody = ({ type, profile }) => {
  const [selectedImg, setSelectedImg] = useState({
    selectedImg: "",
    type: "",
    description: "",
  });

  return (
    <div className="gallery">
      {profile !== null && (
        <ImageGrid
          type={type}
          setSelectedImg={setSelectedImg}
          id={profile?.user?._id}
        />
      )}
      {selectedImg.selectedImg && (
        <Modal
          selectedImg={selectedImg.selectedImg}
          type={selectedImg.type}
          setSelectedImg={setSelectedImg}
          description={selectedImg.description}
        />
      )}
    </div>
  );
};

export default PortfolioRightBody;
