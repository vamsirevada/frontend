import React, { useState } from 'react';
import { updateMessage } from '../../actions/chat';
import { useDispatch } from 'react-redux';
import sendbutton from '../../images/sendbutton.svg';

const ChatRight = ({
  auth,
  conversations,
  userUid,
  chatProfile,
  chatUserImage,
}) => {
  const [formValue, setFormValue] = useState('');
  const dispatch = useDispatch();

  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: auth?.user?._id,
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
    <section id='fullchat-right' data-aos='zoom-in'>
      <div className='fullchat-maintop'>
        <div className='fullchat-maintop-left'>
          <div
            style={{
              background: `url(${chatUserImage}) no-repeat center center/cover`,
            }}
            className='dp-4'
          ></div>
          <div className='flex-column'>
            <div className='chat-name'>
              <a href='#!'>{chatProfile?.user?.fullName}</a>
            </div>
            <div className='chat-body'>{/* <p>Active Now</p> */}</div>
          </div>
        </div>
      </div>

      <div className='fullchat-mainbody'>
        <div className='fullchat-mainbody-container'>
          <div className='flex-c'>
            {conversations.map((con, index) => (
              <div
                key={index}
                className={`${
                  auth.user._id === con.user_uid_1 ? 'flex-c-r' : 'flex-2'
                }`}
              >
                {auth?.user?._id !== con?.user_uid_1 && (
                  <span
                    style={{
                      background: `url(${chatUserImage}) no-repeat center center/cover`,
                    }}
                    className='dp-2'
                  ></span>
                )}
                <div
                  className={`${
                    auth?.user?._id === con?.user_uid_1
                      ? 'flex-c-r-left'
                      : 'flex-2-c'
                  }`}
                >
                  <p
                    className={`${
                      auth?.user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                    }`}
                  >
                    {con.formValue}
                  </p>
                  <small className='i-1'>
                    {new Date(con?.createdAt?.toDate()).toLocaleString()}
                  </small>
                </div>
                {auth?.user?._id === con?.user_uid_1 && (
                  <span
                    style={{
                      background: `url(${auth?.user?.avatar}) no-repeat center center/cover`,
                    }}
                    className='dp-4-1 flex-c-r-right'
                  ></span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='fullchat-type'>
        <div className='form-grid'>
          <div className='form-flex-left'>
            <textarea
              type='text'
              name='typemessage'
              value={formValue}
              placeholder='Type your Message'
              onChange={(e) => setFormValue(e.target.value)}
              rows='1'
            ></textarea>
          </div>
          <div className='form-flex-right'>
            <a href='#!' type='submit'>
              <img src={sendbutton} onClick={sendMessage} alt='' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatRight;
