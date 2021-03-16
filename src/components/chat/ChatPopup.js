import React, { useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import Path from '../../images/path 2.svg';
import Moment from 'react-moment';
import Close from '../../images/noun_Plus_2310779.svg';
import sendbutton from '../../images/sendbutton.svg';
import { updateMessage } from '../../actions/chat';

const ChatPopup = ({
  auth: { user },
  chatProfile,
  userUid,
  chatUserImage,
  conversations,
}) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');
  const [miniHead, setminiHead] = useState(true);
  const [miniChat, setminiChat] = useState(true);

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
    <>
      <div
        className='open-button open-button-1'
        // onClick={() => {
        //   setminiChat(true);
        // }}
        onClick={() => {
          document.getElementById('myForm1').style.display = 'block';
        }}
      >
        <button
          // onClick={() => {
          //   document.getElementById('myForm1').style.display = 'block';
          // }}
          className='individual-chat'
        >
          <span
            style={{
              background: `url(${chatUserImage}) no-repeat center center/cover`,
            }}
            className='dp-1'
          ></span>{' '}
          {chatProfile?.user?.fullName}
        </button>
        <a
          href='#!'
          type='button'
          className='close-btn'
          onClick={() =>
            (document.getElementById('individual-chat').style.display = 'none')
          }
          // onClick={() => {
          //   setminiHead(false);
          // }}
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
              <h4>{chatProfile?.user?.fullName}</h4>
              <small>Active Now</small>
            </div>
          </div>
          <div className='chatboxtop-right'>
            <a href='#!' type='button' className='resize'>
              <img src={Path} alt='' />
            </a>
            <a
              href='#!'
              type='button'
              className='cancel'
              onClick={() =>
                (document.getElementById('myForm1').style.display = 'none')
              }
              // onClick={(() => setminiChat(false), setminiHead(false))}
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
              <a href='#!' type='submit'>
                <img src={sendbutton} onClick={sendMessage} alt='' />
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  // chat: state.chat,
});

export default connect(mapStateToProps)(ChatPopup);
