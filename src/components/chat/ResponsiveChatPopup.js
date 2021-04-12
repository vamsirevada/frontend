/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
// import Path from '../../images/path 2.svg';
import Moment from 'react-moment';
import Close from '../../images/Group 6054.svg';
import sendbutton from '../../images/sendbutton.svg';
import { updateMessage } from '../../actions/chat';

const ResponsiveChatPopup = ({
  auth: { user },
  chatProfile,
  userUid,
  chatUserImage,
  conversations,
  chatClose,
}) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: user?._id,
      user_uid_2: userUid,
      formValue,
    };
    if (formValue !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        setFormValue('');
      });
    }
  };

  return (
    <div id='main-open-chatpopup' data-aos='fade-left'>
      <div className='chat-popup-1' id='myForm1'>
        <div className='chatbox-top'>
          <div className='chatboxtop-left'>
            <div className='chatboxtop-right'>
              <a
                type='button'
                className='cancel'
                onClick={() => {
                  chatClose();
                }}
              >
                <img src={Close} alt='' />
              </a>
            </div>
            <span
              style={{
                background: `url(${chatUserImage}) no-repeat center center/cover`,
              }}
              className='dp-1'
            ></span>
            <div className='chat-top-name'>
              <h4>{chatProfile?.user?.fullName}</h4>
              {user?.activityStatus === 'online' && <small>Active Now</small>}
            </div>
          </div>
        </div>

        <div className='form-container-2'>
          <div className='form-container-2-container'>
            <div className='flex-c'>
              {conversations.map((con, index) => (
                <div
                  key={index}
                  className={`${
                    user._id === con.user_uid_1 ? 'flex-c-r' : 'flex-2'
                  }`}
                >
                  {user?._id !== con?.user_uid_1 && (
                    <span
                      style={{
                        background: `url(${chatUserImage}) no-repeat center center/cover`,
                      }}
                      className='dp-2'
                    ></span>
                  )}
                  <div
                    className={`${
                      user?._id === con?.user_uid_1
                        ? 'flex-c-r-left'
                        : 'flex-2-c'
                    }`}
                  >
                    <p
                      className={`${
                        user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                      }`}
                    >
                      {con.formValue}
                    </p>
                    <small className='i-1'>
                      {new Date(con?.createdAt?.toDate()).toLocaleString()}
                    </small>
                  </div>
                  {user?._id === con?.user_uid_1 && (
                    <span
                      style={{
                        background: `url(${user?.avatar}) no-repeat center center/cover`,
                      }}
                      className='dp-4-1 flex-c-r-right'
                    ></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <form className='chatpopup-type'>
          <div className='form-grid'>
            <div className='form-flex-left'>
              <input
                type='text'
                name='typemessage'
                value={formValue}
                placeholder='Type your Message'
                onChange={(e) => setFormValue(e.target.value)}
              />
            </div>
            <div className='form-flex-right'>
              <a type='submit'>
                <img src={sendbutton} onClick={sendMessage} alt='' />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(ResponsiveChatPopup);
