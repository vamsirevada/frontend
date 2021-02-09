import React from "react";
import PropTypes from "prop-types";
import gps from "../../images/icons/noun_Location_3139654 copy.svg";
import logo from "../../images/dummyimage.jpg";

const PortfolioLeftTop = ({ profile: { location, status, user, avatar } }) => {
  return (
    <div className="left-heading">
      <div className="pp">
        <img className="pp" src={avatar ? avatar : logo} alt="" />
      </div>
      <h2 className="name">
        {user.groupName && user.groupName} {user.fullName && user.fullName}
      </h2>
      <p> {user.userName && user.userName}</p>
      <p> {status}</p>
      <p>
        <img className="resize" src={gps} alt="" />{" "}
        <span className="gray">{location}</span>
      </p>
    </div>
  );
};

PortfolioLeftTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default PortfolioLeftTop;
