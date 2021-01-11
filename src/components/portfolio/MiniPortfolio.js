import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import setting from "../../images/icons/noun_Settings_3144389.svg";
import share from "../../images/icons/noun_Share_3136056 copy.svg";
import loc from "../../images/icons/noun_Location_3139654.svg";
import logo from "../../images/image29@2.png";

const MiniPortfolio = ({ profile, loading }) => {
  const [displayShare, toogleShare] = useState(false);

  console.log(profile);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <div className="left-container">
            <div>
              <a href="#!" onClick={() => toogleShare(!displayShare)}>
                <img className="setting setting-f" src={setting} alt="" />
              </a>

              {displayShare && (
                <Fragment>
                  <a href="#!" className="share-port" id="share-port-1">
                    <img src={share} alt="zx" /> Share Portfolio
                  </a>
                </Fragment>
              )}
            </div>

            <div className="left-heading heading-1">
              <img
                className="display-pic"
                src={profile?.avatar}
                alt=""
                onError={(i) => (i.target.src = `${logo}`)}
              />
              <h2 className="name name-f">
                {profile.user.fullName && profile.user.fullName}
                {profile.user.groupName && profile.user.groupName}
              </h2>
              <p> {profile.user.userName}</p>
              <p> {profile.status}</p>
              <p>
                <img className="resize" src={loc} alt="" />{" "}
                <span className="gray"> {profile.location} </span>
              </p>
            </div>
            <hr className="hori" />

            <div className="about">
              <h3>About :</h3>
              <p>{profile.bio}</p>
            </div>

            <hr className="hori" />

            <div className="connect-info">
              <div>
                <Link to="/friends">
                  <p className="border-1">
                    <span className="f-1">{profile.buddies.length}</span>
                    <br /> Connections
                  </p>
                </Link>
              </div>
              <div>
                <Link to={`/projects/${profile.user._id}`}>
                  <p>
                    <span className="f-1">
                      {profile.experience && profile.experience.length}
                    </span>
                    <br /> Projects Completed{" "}
                  </p>
                </Link>
              </div>
            </div>
            <hr className="hori" />

            {/* <footer id='left-mini-footer'>
              <div>
                <p>
                  <a href='#!'>Privacy Policy</a> |{' '}
                  <a href='#!'>Terms of use</a> | <a href='#!'>Support</a>
                  <br />
                  care@vanity.com
                </p>
              </div>
            </footer> */}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Spinner />
        </Fragment>
      )}
    </Fragment>
  );
};

export default MiniPortfolio;
