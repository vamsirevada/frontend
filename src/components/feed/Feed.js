import React, { useState, useEffect } from "react";
import { getCurrentProfile } from "../../actions/profile";
import { getBuddyPosts } from "../../actions/post";
import { connect } from "react-redux";
import MiniPortfolio from "../portfolio/MiniPortfolio";
import Posts from "../posts/Posts";
import PostForm from "../posts/PostForm";
import Chat from "../chat/Chat";
import FriendRequests from "./FriendRequests";
import notify from "../../images/noun_notification_887294.svg";
import BallotIcon from "@material-ui/icons/Ballot";

const Feed = ({
  getBuddyPosts,
  getCurrentProfile,
  auth,
  profile: { profile, loading },
  post,
  id,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getBuddyPosts(id);
  }, [getCurrentProfile, getBuddyPosts, id]);

  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);

  const onClick1 = (e) => {
    toogleLeft(true);
    toogleRight(false);
  };
  const onClick2 = (e) => {
    toogleLeft(false);
    toogleRight(true);
  };

  return (
    <>
      <div className="ribbon">
        <a href="#!" onClick={(e) => onClick1(e)} className="ribbon-left">
          <BallotIcon />
        </a>
        <a href="#!" onClick={(e) => onClick2(e)} className="ribbon-right">
          <img src={notify} alt="portfolioe" />
        </a>
      </div>
      <div>
        <div id="feed">
          <div className="left">
            <div id="left-sidebar">
              <MiniPortfolio profile={profile} loading={loading} />
            </div>
          </div>
          {displayLeft && (
            <div className="center">
              <div id="feed-main">
                <div className="feed-main-container">
                  <PostForm />
                  <Posts profile={profile} />
                </div>
              </div>
            </div>
          )}
          {displayRight && (
            <div className="right">
              <FriendRequests />
              <Chat />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getBuddyPosts,
})(Feed);
