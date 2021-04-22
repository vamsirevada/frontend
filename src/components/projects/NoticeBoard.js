import React, { useState } from 'react';
import './NoticeBoard.css';
import NoticeBoardItem from './NoticeBoardItem';
import NoticeBoardGuidelines from './NoticeBoardGuidelines';

const NoticeBoard = () => {
  const [showGuide, toggleShowGuide] = useState(false);

  const openGuide = () => {
    toggleShowGuide(true);
  };
  const closeGuide = () => {
    toggleShowGuide(!showGuide);
  };
  return (
    <>
      {showGuide && <NoticeBoardGuidelines closeGuide={closeGuide} />}
      <div className='noticeboard'>
        <div className='noticeboard-container'>
          <div className='noticeboard-heading'>
            <h2>Notice Board</h2>
          </div>
          <div className='noticeboard-main'>
            <div className='noticeboard-main-container'>
              <NoticeBoardItem />
            </div>
          </div>
        </div>
      </div>
      {!showGuide && (
        <button className='demo-tour-button notice' onClick={openGuide}>
          NoticeBoard Guidelines
          <span className='tooltiptext'>
            <div className='arrow-up'></div>
            Get to Know what is Noticeboard and how to create & manage notices
          </span>
        </button>
      )}
    </>
  );
};

export default NoticeBoard;
