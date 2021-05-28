import React, { createRef, useState } from 'react';
import {
  getRealtimeConversations,
  updateMessage,
  messageNotificationsRead,
} from '../../actions/chat';
import { useDispatch } from 'react-redux';
import attach from '../../images/attach.svg';
import sendbutton from '../../images/sendbutton.svg';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import logo from '../../images/dummyimage.jpg';
import close from '../../images/close.svg';

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

const ChatRight = ({ auth, conversations, chatProfile, setChatStarted }) => {
  const [formValue, setFormValue] = useState('');
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [res, setRes] = useState(null);
  const fileInput = createRef();
  const [url, setUrl] = useState(null);
  const [filetype, setFileType] = useState(null);
  const [preview, setPreview] = useState(null);

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setRes(file);
    setFileType(_gettype(file.type.split('/')[0]));
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
    if (isRight[0] === auth?.user?._id) {
      dispatch(messageNotificationsRead(unreadMessageIds));
      dispatch(
        getRealtimeConversations({
          uid_1: auth?.user?._id,
          uid_2: chatProfile?.user?._id,
        })
      );
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: auth?.user?._id,
      user_uid_2: chatProfile.projectname
        ? chatProfile?._id
        : chatProfile?.user?._id,
      formValue,
      url,
      filetype,
    };
    if (formValue || url !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        dispatch(
          getRealtimeConversations({
            uid_1: auth?.user?._id,
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
    <div onClick={messageRead} id='fullchat-right' data-aos='zoom-in'>
      <div className='fullchat-maintop'>
        <div className='fullchat-maintop-left'>
          <div
            style={{
              background: `url(${
                chatProfile?.avatar ? chatProfile?.avatar : logo
              }) no-repeat center center/cover`,
            }}
            className='dp-4'
          >
            {chatProfile?.user?.activityStatus === 'online' && (
              <span className='dp-4-dot'></span>
            )}
          </div>
          <div className='flex-column'>
            <div className='chat-name'>
              <a href='#!'>
                {chatProfile?.projectname
                  ? chatProfile?.projectname
                  : chatProfile?.user?.fullName || chatProfile?.user?.groupName}
              </a>
            </div>
            {chatProfile?.user?.activityStatus === 'online' && (
              <div className='chat-body'>
                <p>Active Now</p>
              </div>
            )}
          </div>
        </div>
        <div onClick={() => setChatStarted(false)}>
          <img src={close} className='closechat' alt='' />
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
                      background: `url(${chatProfile?.avatar}) no-repeat center center/cover`,
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
                  {con.filetype === 'photo' ? (
                    <>
                      {con.formValue !== '' && (
                        <p
                          className={`${
                            auth?.user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                          }`}
                        >
                          {con.formValue}
                        </p>
                      )}
                      <img
                        className={`${
                          auth?.user?._id === con?.user_uid_1 ? 'img-1' : 'b-2'
                        }`}
                        src={con.url}
                        alt=''
                      />
                    </>
                  ) : con.filetype === 'video' ? (
                    <>
                      {con.formValue !== '' && (
                        <p
                          className={`${
                            auth?.user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
                          }`}
                        >
                          {con.formValue}
                        </p>
                      )}
                      <video
                        controls
                        className={`${
                          auth?.user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
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
                            auth?.user?._id === con?.user_uid_1 ? 'b-1' : 'b-2'
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
        <form className='form-grid' onSubmit={sendMessage}>
          <div className='form-flex-left'>
            {preview !== null && (
              <div className='message-preview'>
                {filetype === 'photo' ? (
                  <img className='message-preview-image' src={preview} alt='' />
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
            ></input>
          </div>
          <div className='form-flex-right'>
            <input
              onChange={handleChange}
              onClick={(e) => (e.target.value = null)}
              type='file'
              accept='*'
              hidden={true}
              ref={fileInput}
            />
            {show === false && (
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

            <button className='sendmessage' type='submit'>
              <img src={sendbutton} alt='' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRight;
