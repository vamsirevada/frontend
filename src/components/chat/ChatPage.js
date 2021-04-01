/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { getBuddiesById } from '../../actions/profile';
import { getRealtimeConversations, updateMessage } from '../../actions/chat';
import { connect, useDispatch } from 'react-redux';
import sendbutton from '../../images/sendbutton.svg';
import attach from '../../images/attach.svg';
import logo from '../../images/dummyimage.jpg';
import emoji from '../../images/emoji.svg';
import path from '../../images/path.svg';
import videocall from '../../images/videocall.png';
import background from '../../images/Rectangle.png';

const ChatPage = ({
  auth,
  getBuddiesById,
  profile: { buddies },
  chat: { conversations },
}) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');
  const [chatProfile, setChatProfile] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUserImage, setChatUserImage] = useState(logo);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    getBuddiesById(auth?.user?._id);
  }, [getBuddiesById, auth?.user?._id]);

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
  console.log(logo);

  return (
    <div id='full-chat'>
      <aside id='fullchat-left'>
        <div className='fullchat-lefttop'>
          <div
            style={{
              background: `url(${
                auth?.user?.avatar ? auth?.user?.avatar : logo
              }) no-repeat center center/cover`,
            }}
            className='display-pic'
          ></div>
          <div>
            <input
              type='search'
              name='search'
              placeholder='Search People & Groups'
            />
          </div>
        </div>
        <div className='fullchat-leftcontainer'>
          <div className='fullchat-leftbody'>
            <div className='chats'>
              <div className='chats-heading'>
                <h3>
                  Contacts <span className='blue'>({buddies.length})</span>
                </h3>
                <a className='blue'>See More</a>
              </div>
              {buddies &&
                buddies.map((profile, index) => (
                  <Fragment key={index}>
                    <div
                      onClick={() => {
                        setChatProfile(profile);
                        setChatStarted(true);
                        setUserUid(profile?.user?._id);
                        setChatUserImage(profile?.avatar);
                        dispatch(
                          getRealtimeConversations({
                            uid_1: auth?.user?._id,
                            uid_2: profile?.user?._id,
                          })
                        );
                      }}
                      className='fullchat-chatgrid'
                    >
                      <div
                        style={{
                          background: `url(${profile.avatar}) no-repeat center center/cover`,
                        }}
                        className='dp'
                      ></div>
                      <div className='flex-column-1'>
                        <div className='chat-name'>
                          <a>{profile.user.fullName}</a>
                        </div>
                        <div className='chat-body'>
                          <p>{profile.location}</p>
                          {/* <div className="bubble">
                            <p>2</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <hr className='hori-2' />
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </aside>
      {chatStarted ? (
        <section id='fullchat-right'>
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
                  <a>{chatProfile?.user?.fullName}</a>
                </div>
                <div className='chat-body'>
                  <p>Active Now</p>
                </div>
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
                <a type='submit'>
                  <img src={sendbutton} onClick={sendMessage} alt='' />
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section
          id='fullchat-right'
          style={{ background: `url(${background})` }}
        >
          <p
            style={{
              textAlign: 'center',
              marginTop: '30%',
            }}
          >
            You Can Start Conversation with your Friends Here
          </p>
        </section>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  getBuddiesById,
})(ChatPage);
