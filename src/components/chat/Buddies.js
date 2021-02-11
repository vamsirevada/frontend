/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getBuddiesById } from "../../actions/profile";

const Buddies = ({
  auth,
  getBuddiesById,
  profile: { buddies },
  setUser,
  setChatStarted,
}) => {
  console.log(buddies);
  useEffect(() => {
    getBuddiesById(auth.user._id);
  }, [auth.user._id, getBuddiesById]);

  return (
    <div className="fullchat-leftbody">
      <div className="chats">
        <div className="chats-heading">
          <h3>
            Contacts <span className="blue">{buddies.length}</span>
          </h3>
          <a className="blue">See More</a>
        </div>
        {buddies &&
          buddies.map((buddy, index) => (
            <Fragment key={index}>
              <div
                className="fullchat-chatgrid"
                onClick={() => {
                  setUser(buddy);
                  setChatStarted(true);
                }}
              >
                <div
                  style={{
                    background: `url(${buddy.avatar}) no-repeat center center/cover`,
                  }}
                  className="dp"
                ></div>
                <div className="flex-column-1">
                  <div className="chat-name">
                    <a>{buddy.user.fullName}</a>
                  </div>
                  <div className="chat-body">
                    <p>Lorem ipsum dolor sit amet.</p>
                    <div className="bubble">
                      <p>2</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="hori-2" />
            </Fragment>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getBuddiesById })(Buddies);
