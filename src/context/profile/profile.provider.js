import React, { useEffect, useState } from "react";
import { ProfileContext } from "./profile.context";

export const ProfileProvider = ({ children }) => {
  const [img, setImg] = useState();
  const getProfilepic = () => {
    const img = localStorage.getItem("profilepicture");
    setImg(img);
  };
  useEffect(() => {
    getProfilepic();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        img,
        setImg,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
