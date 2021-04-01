import React from 'react';
import './NoticeBoard.css';
import NoticeBoardItem from './NoticeBoardItem';

const NoticeBoard = () => {
  return (
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
  );
};

export default NoticeBoard;
