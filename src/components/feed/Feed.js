/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import MiniPortfolio from '../portfolio/MiniPortfolio';
import Posts from '../posts/Posts';
import PostForm from '../posts/PostForm';
import NotePeoples from '../notes/NotePeoples';
import NotePosts from '../notes/NotePosts';
import notify from '../../images/noun_notification_887294.svg';
import BallotIcon from '@material-ui/icons/Ballot';
import ChatSideBar from '../chat/ChatSideBar';

const Feed = () => {
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
              <NotePeoples />
              <NotePosts />
              <ChatSideBar />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Feed;
