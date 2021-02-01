import React from "react";
import { Link } from "react-router-dom";

const PortfolioRightTop = ({
  type,
  profile: {
    user: { _id },
    buddies,
    experience,
  },
}) => (
  <div className="main-grid-top">
    <div className="profile-info-box p-black">
      <Link to={`/friends/${_id}`}>
        <p className="border-1">
          <span className="f-1">{buddies && buddies.length}</span>
          {/* <span className='f-1'>2</span> */}
          <br /> Connections
        </p>
      </Link>
      <Link to={`/projects/${_id}`}>
        <p>
          <span className="f-1">{experience && experience.length}</span>
          <br /> Projects{" "}
        </p>
      </Link>
    </div>
    <div className="mutual-frds">
      {type !== "edit" && (
        <div className="prof-heading-flex">
          <div></div>
          <Link to={"/addfiles"}>
            <h4>
              <span className="bg-1">Add to Portfolio</span>
            </h4>
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default PortfolioRightTop;
