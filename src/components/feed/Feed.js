/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from 'react';
import MiniPortfolio from '../portfolio/MiniPortfolio';
import Posts from '../posts/Posts';
import PostForm from '../posts/PostForm';
import NotePeoples from '../notes/NotePeoples';
import NotePosts from '../notes/NotePosts';
import notify from '../../images/noun_notification_887294.svg';
import noteimg from '../../images/icons/summarize-24px.svg';
import BallotIcon from '@material-ui/icons/Ballot';
import ChatSideBar from '../chat/ChatSideBar';

const Feed = () => {
  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);
  const [ipadRight, toggleIpadright] = useState(false);

  const onClick1 = (e) => {
    toogleLeft(true);
    toogleRight(false);
  };
  const onClick2 = (e) => {
    toogleLeft(false);
    toogleRight(true);
  };
  const onClick3 = (e) => {
    toggleIpadright(!ipadRight);
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
              <MiniPortfolio />
            </div>
          </div>
          {displayLeft && (
            <div className='center'>
              <div id='feed-main'>
                <div className='feed-main-container'>
                  <PostForm />
                  <Posts />
                </div>
              </div>
            </div>
          )}
          {displayRight && (
            <div className='right'>
              {/* <a onClick={(e) => onClick3(e)} className='note-slide-button'>
                <img src={noteimg} alt='' />
              </a> */}
              <div classname='note-slide'>
                <NotePeoples />
                <NotePosts />
              </div>

              <ChatSideBar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
