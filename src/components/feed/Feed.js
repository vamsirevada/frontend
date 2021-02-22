/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { getCurrentProfile, getBuddyRequests } from '../../actions/profile';
import { getBuddyPosts } from '../../actions/post';
import { connect } from 'react-redux';
import MiniPortfolio from '../portfolio/MiniPortfolio';
import Posts from '../posts/Posts';
import PostForm from '../posts/PostForm';
import FriendRequests from './FriendRequests';
import NotePeoples from '../notes/NotePeoples';
import notify from '../../images/noun_notification_887294.svg';
import BallotIcon from '@material-ui/icons/Ballot';

const Feed = ({
  getBuddyPosts,
  getCurrentProfile,
  getBuddyRequests,
  auth,
  profile: { profile, loading },
  post,
  id,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getBuddyRequests();
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
      <div className='ribbon'>
        <a onClick={(e) => onClick1(e)} className='ribbon-left'>
          <BallotIcon />
        </a>
        <a onClick={(e) => onClick2(e)} className='ribbon-right'>
          <img src={notify} alt='portfolioe' />
        </a>
      </div>
      <div>
        <div id='feed'>
          <div className='left'>
            <div id='left-sidebar'>
              <MiniPortfolio profile={profile} loading={loading} />
            </div>
          </div>
          {displayLeft && (
            <div className='center'>
              <div id='feed-main'>
                <div className='feed-main-container'>
                  <PostForm />
                  <Posts profile={profile} />
                </div>
              </div>
            </div>
          )}
          {displayRight && (
            <div className='right'>
              <FriendRequests />
              <hr />
              <NotePeoples profile={profile} />
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
  getBuddyRequests,
})(Feed);
