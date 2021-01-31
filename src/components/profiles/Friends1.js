import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Friend from "./Friend";
import Spinner from "../layout/Spinner";
import { getBuddiesById, getProfileById } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UseFirestore from "../addportfolio/UseFireStore";

const Friends1 = ({
  getBuddiesById,
  getProfileById,
  profile: { profile, buddies, loading },
  match,
}) => {
  const { docs } = UseFirestore("images");

  const remove = async (profileid) => {
    try {
      await axios.delete(`api/profile/buddy/${profileid}`);
      setAlert("Successfully removed", "success");
      getBuddiesById(match.params.id);
    } catch (err) {
      setAlert(err.response.data.msg, "danger");
    }
  };

  useEffect(() => {
    getProfileById(match.params.id);
    getBuddiesById(match.params.id);
  }, [getBuddiesById, getProfileById, match.params.id]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="c-list">
        <div className="c-list-container c-1">
          <div className="c-list-head">
            <div className="flex">
              <div className="display-pic">
                <img className="display-pic" src={profile?.avatar} alt="" />
              </div>
              <h2 className="name name-f">
                {profile?.user.fullName && profile?.user.fullName}
              </h2>
              <h2 className="name name-f">
                {profile?.user.groupName && profile?.user.groupName}
              </h2>
            </div>
            <div>
              <p className="blue">{profile?.status && profile?.status}</p>
            </div>
            <div>
              <p>
                {/* <img className='resize' src={loc} alt='' />{' '} */}
                <span className="gray">
                  {" "}
                  {profile?.location && profile?.location}
                </span>
              </p>
            </div>

            <div className="profile-info-box">
              <Link to={`/friends/${profile?.user._id}`} href="#">
                <p className="border-1">
                  <span className="f-1">{buddies && buddies.length}</span>
                  <br /> Connections
                </p>
              </Link>
              <Link to={`/projects/${profile?.user._id}`} href="#">
                <p>
                  <span className="f-1">
                    {profile?.experience && profile?.experience.length}
                  </span>
                  <br /> Projects Completed{" "}
                </p>
              </Link>
            </div>
          </div>
          <div className="search-flex search-flex-1">
            <div>
              <h1 className="name name-f">Friends</h1>
            </div>
          </div>
          <hr className="hori" />
          {buddies.empty === null ? (
            // <h3>Loading </h3>
            <Spinner />
          ) : (
            <Fragment>
              {buddies.empty ? (
                <Fragment>
                  <h2> You have no buddies </h2>
                </Fragment>
              ) : (
                <Fragment>
                  {buddies.map((profile) => (
                    <Friend
                      key={profile._id}
                      profile={profile}
                      remove={remove}
                      displayAdd={true}
                      docs={docs}
                    />
                  ))}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Friends1.propTypes = {
  getBuddiesById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById, getBuddiesById })(
  Friends1
);
