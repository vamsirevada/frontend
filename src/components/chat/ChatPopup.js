/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import Path from '../../images/path 2.svg';
import Moment from 'react-moment';
import Close from '../../images/noun_Plus_2310779.svg';
import sendbutton from '../../images/sendbutton.svg';
import { updateMessage } from '../../actions/chat';

const ChatPopup = ({
  auth: { user },
  chatUserName,
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
    <div id='main-open-chatpopup'>
      <div
        className='open-button open-button-1'
        onClick={() => {
          document.getElementById('myForm1').style.display = 'block';
        }}
      >
        <button id='individual-chat'>
          <span
            style={{
              background: `url(${chatUserImage}) no-repeat center center/cover`,
            }}
            className='dp-1'
          ></span>{' '}
          {chatUserName}
        </button>
        <a
          style={{ cursor: 'pointer' }}
          type='button'
          className='close-btn'
          onClick={() => {
            document.getElementById('main-open-chatpopup').style.display =
              'none';
            chatClose();
          }}
        >
          <img src={Close} alt='' />
        </a>
      </div>

      <div className='chat-popup-1' id='myForm1'>
        <div className='chatbox-top'>
          <div className='chatboxtop-left'>
            <span
              style={{
                background: `url(${chatUserImage}) no-repeat center center/cover`,
              }}
              className='dp-1'
            ></span>
            <div className='chat-top-name'>
              <h4>{chatUserName}</h4>
              <small>Active Now</small>
            </div>
          </div>
          <div className='chatboxtop-right'>
            <a type='button' className='resize'>
              <img src={Path} alt='' />
            </a>
            <a
              type='button'
              className='cancel'
              onClick={() =>
                (document.getElementById('myForm1').style.display = 'none')
              }
            >
              <img src={Close} alt='' />
            </a>
          </div>
        </div>

        <div className='form-container-2'>
          <div className='flex-c'>
            {conversations.map((con, index) => (
              <Fragment key={index}>
                {user?._id === con?.user_uid_1 ? (
                  <div className='flex-c-r'>
                    <span
                      style={{
                        background: `url(${user?.avatar}) no-repeat center center/cover`,
                      }}
                      className='dp-2'
                    ></span>
                    <p className='b-1'>{con?.formValue}</p>
                    <small>
                      <Moment format='DD MMM YY'>
                        {con?.createdAt.toDate()}
                      </Moment>{' '}
                      {', '}
                      <Moment format='hh:mm A'>
                        {con?.createdAt.toDate()}
                      </Moment>
                    </small>
                  </div>
                ) : (
                  <div className='flex-2'>
                    <div>
                      <p className='b-2'>{con?.formValue}</p>
                      <small>
                        <Moment format='DD MMM YY'>
                          {con?.createdAt.toDate()}
                        </Moment>{' '}
                        {', '}
                        <Moment format='hh:mm A'>
                          {con?.createdAt.toDate()}
                        </Moment>
                      </small>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <form className='form-container-2'>
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

export default connect(mapStateToProps)(ChatPopup);
