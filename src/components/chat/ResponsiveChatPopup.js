/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Close from '../../images/Group 6054.svg';
import sendbutton from '../../images/sendbutton.svg';
import {
  getRealtimeConversations,
  updateMessage,
  messageNotificationsRead,
} from '../../actions/chat';
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
  const [preview, setPreview] = useState(null);
  const [res, setRes] = useState(null);

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setRes(file);
    const type = _gettype(file.type.split('/')[0]);
    setFileType(type);
    const storageRef = projectStorage.ref(file.name);
    if (filetype === 'photo') {
      setPreview(URL.createObjectURL(e.target.files[0]));
      storageRef.put(file).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(Math.round(percentage));
          setShow(true);
        },
        (error) => {
          switch (error.code) {
            case 'storage/canceled':
              return setShow(false) && console.log('cancelled');
            default:
              return console.log(error);
          }
        },
        async () => {
          await storageRef.getDownloadURL().then((x) => {
            setUrl(x);
          });
        }
      );
    } else {
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], file.name, {
        type: 'video/mp4',
      });
      setPreview(URL.createObjectURL(newFile));
      storageRef.put(newFile).on(
        'state_changed',
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(Math.round(percentage));
          setShow(true);
        },
        (error) => {
          switch (error.code) {
            case 'storage/canceled':
              return setShow(false) && console.log('cancelled');
            default:
              return console.log(error);
          }
        },
        async () => {
          await storageRef.getDownloadURL().then((x) => {
            setUrl(x);
          });
        }
      );
    }
  };

  const unreadMessageIds = conversations
    .filter((conv) => !conv.isView)
    .map((x) => x.id);

  const uno = conversations
    .filter((conv) => !conv.isView)
    .map((x) => x.user_uid_2);

  const isRight = uno.filter((item, key) => {
    return uno.indexOf(item) === key;
  });

  const messageRead = () => {
    if (isRight[0] === user?._id) {
      dispatch(messageNotificationsRead(unreadMessageIds));
      dispatch(
        getRealtimeConversations({
          uid_1: user?._id,
          uid_2: chatProfile?.user?._id,
        })
      );
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: user?._id,
      user_uid_2: chatProfile.projectname
        ? chatProfile?._id
        : chatProfile?.user?._id,
      formValue,
      url,
      filetype,
    };
    if (formValue !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        dispatch(
          getRealtimeConversations({
            uid_1: user?._id,
            uid_2: chatProfile.projectname
              ? chatProfile?._id
              : chatProfile?.user?._id,
          })
        );
        setFormValue('');
        setUrl(null);
        setShow(false);
        setPreview(null);
        setFileType(null);
      });
    }
  };

  return (
    <div onClick={messageRead} id='main-open-chatpopup' data-aos='fade-left'>
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
                  chatProfile?.avatar ? chatProfile?.avatar : logo
                }) no-repeat center center/cover`,
              }}
              className='dp-1'
            ></span>
            <div className='chat-top-name'>
              <h4>
                {chatProfile?.projectname
                  ? chatProfile?.projectname
                  : chatProfile?.user?.fullName || chatProfile?.user?.groupName}
              </h4>
              {chatProfile?.user?.activityStatus === 'online' && (
                <small>Active Now</small>
              )}
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
                        background: `url(${chatProfile?.avatar}) no-repeat center center/cover`,
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
              {preview !== null && (
                <div className='message-preview'>
                  {filetype === 'photo' ? (
                    <img
                      className='message-preview-image'
                      src={preview}
                      alt=''
                    />
                  ) : (
                    <video>
                      <source src={preview} type='video/mp4' />
                    </video>
                  )}
                  <span
                    onClick={() => {
                      setPreview(null);
                      projectStorage.ref(res.name).put(res).cancel();
                      setShow(false);
                    }}
                    className='message-preview-close'
                  >
                    x
                  </span>
                </div>
              )}
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
                <div>
                  <img
                    className='messageattach'
                    src={attach}
                    onClick={onOpenFileDialog}
                    alt='attach'
                  />
                </div>
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

export default ResponsiveChatPopup;
