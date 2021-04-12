/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Close from '../../images/Group 6054.svg';
import sendbutton from '../../images/sendbutton.svg';
import { getRealtimeConversations, updateMessage } from '../../actions/chat';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import logo from '../../images/dummyimage.jpg';
import attach from '../../images/attach.svg';

const _gettype = (type) => {
  if (type === 'image') {
    return 'photo';
  } else if (type === 'audio') {
    return 'audio';
  } else if (type === 'video') {
    return 'video';
  } else {
    return 'default';
  }
};

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
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const fileInput = createRef();
  const [url, setUrl] = useState(null);
  const [filetype, setFileType] = useState(null);

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const type = _gettype(file.type.split('/')[0]);
    setFileType(type);
    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(Math.round(percentage));
        setShow(true);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(`${url}`);
      }
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: user?._id,
      user_uid_2: userUid,
      formValue,
      url,
      filetype,
    };
    if (formValue !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        if (chatProfile.projectname) {
          dispatch(
            getRealtimeConversations({
              uid_1: user?._id,
              uid_2: chatProfile?._id,
            })
          );
        } else {
          dispatch(
            getRealtimeConversations({
              uid_1: user?._id,
              uid_2: chatProfile?.user?._id,
            })
          );
        }
        setFormValue('');
        setShow(false);
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
                background: `url(${
                  chatUserImage ? chatUserImage : logo
                }) no-repeat center center/cover`,
              }}
              className='dp-1'
            ></span>
            <div className='chat-top-name'>
              <h4>
                {chatProfile?.projectname
                  ? chatProfile?.projectname
                  : chatProfile?.user?.fullName}
              </h4>
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
                    {con.filetype === 'photo' ? (
                      <>
                        {con.formValue !== '' && (
                          <p
                            className={`${
                              user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                            }`}
                          >
                            {con.formValue}
                          </p>
                        )}
                        <img
                          className={`${
                            user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                          }`}
                          src={con?.url}
                          alt=''
                        />
                      </>
                    ) : con.filetype === 'video' ? (
                      <>
                        {con.formValue !== '' && (
                          <p
                            className={`${
                              user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                            }`}
                          >
                            {con.formValue}
                          </p>
                        )}
                        <video
                          controls
                          className={`${
                            user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                          }`}
                          src={con.url}
                          alt=''
                        />
                      </>
                    ) : (
                      <>
                        {con.formValue !== '' && (
                          <p
                            className={`${
                              user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                            }`}
                          >
                            {con.formValue}
                          </p>
                        )}
                      </>
                    )}

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
        <form className='chatpopup-type' onSubmit={sendMessage}>
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
              <input
                onChange={handleChange}
                type='file'
                accept='*'
                hidden={true}
                ref={fileInput}
              />
              {!show && (
                <img
                  className='messageattach'
                  src={attach}
                  onClick={onOpenFileDialog}
                  alt='attach'
                />
              )}
              {show && (
                <div style={{ width: 50, height: 50, margin: 'auto' }}>
                  <CircularProgressbar value={progress} text={`${progress}%`} />
                </div>
              )}
              <button type='submit'>
                <img src={sendbutton} alt='' />
              </button>
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
