import React, { createRef, useState } from 'react';
import { getRealtimeConversations, updateMessage } from '../../actions/chat';
import { useDispatch } from 'react-redux';
import attach from '../../images/attach.svg';
import sendbutton from '../../images/sendbutton.svg';
import { projectFirestore, projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import logo from '../../images/dummyimage.jpg';

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

const ChatRight = ({
  auth,
  conversations,
  userUid,
  chatProfile,
  chatUserImage,
}) => {
  const [formValue, setFormValue] = useState('');
  const dispatch = useDispatch();
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
      user_uid_1: auth?.user?._id,
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
              uid_1: auth?.user?._id,
              uid_2: chatProfile?._id,
            })
          );
        } else {
          dispatch(
            getRealtimeConversations({
              uid_1: auth?.user?._id,
              uid_2: chatProfile?.user?._id,
            })
          );
        }
        projectFirestore.collection('notifications').add({
          sender: auth?.user?._id,
          senderName: auth?.user?.fullName
            ? auth?.user?.fullName
            : auth?.user?.groupName,
          avatar: auth?.user?.avatar,
          receiver: userUid,
          type: 'chat',
          read: false,
          createdAt: new Date(),
        });
        setFormValue('');
        setShow(false);
      });
    }
  };

  return (
    <div id='fullchat-right' data-aos='zoom-in'>
      <div className='fullchat-maintop'>
        <div className='fullchat-maintop-left'>
          <div
            style={{
              background: `url(${
                chatUserImage ? chatUserImage : logo
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
            <textarea
              type='text'
              name='typemessage'
              value={formValue}
              placeholder='Type your Message'
              onChange={(e) => setFormValue(e.target.value)}
              rows='3'
            ></textarea>
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
