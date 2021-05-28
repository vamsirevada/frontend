/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import logo from '../../images/dummyimage.jpg';

const ChatItem = ({ val, messagesCount, onClickHandler }) => {
  const onStartHandler = () => {
    onClickHandler(val);
  };

  return (
    <Fragment>
      <div onClick={onStartHandler} className='fullchat-chatgrid'>
        <div
          style={{
            background: `url(${
              val?.avatar ? val?.avatar : logo
            }) no-repeat center center/cover`,
          }}
          className='dp'
        >
          {val?.user?.activityStatus === 'online' && (
            <span className='dp-dot'></span>
          )}
        </div>
        <div className='flex-row-1'>
          <div className='flex-column-1'>
            <div className='chat-name'>
              <a>
                {val?.projectname
                  ? val?.projectname
                  : val?.user?.fullName || val?.user?.groupName}
              </a>
            </div>
            <div className='chat-body'>
              <p>{val?.projectname ? val?.location : val.status}</p>
            </div>
          </div>
          {messagesCount &&
            messagesCount.filter((msg) => msg.user_uid_1 === val?.user?._id)
              .length > 0 && (
              <div className='message-count-icon'>
                <span className='message-count'>
                  {
                    messagesCount.filter(
                      (msg) => msg.user_uid_1 === val?.user?._id
                    ).length
                  }
                </span>
              </div>
            )}
        </div>
      </div>
      <hr className='hori-2' />
    </Fragment>
  );
};

export default ChatItem;
