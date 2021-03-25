/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2).svg';
import mail from '../../images/chat.svg';
import logo from '../../images/dummyimage.jpg';
import { connect, useDispatch } from 'react-redux';
import api from '../../utils/api';
import { setAlert } from '../../actions/alert';
import { sendBuddyRequest } from '../../actions/profile';
import { motion } from 'framer-motion';
import { projectFirestore } from '../../firebase/config';
import ChatPopup from '../chat/ChatPopup';
import NotePeoplePopUp from '../posts/NotePeoplePopUp';
import { getRealtimeConversations } from '../../actions/chat';
import noteimg from '../../images/icons/summarize-24px.svg';

const ProfileItem = ({
  auth,
  profile: { profile },
  item: { _id, user, avatar, status, location, buddies },
  chat: { conversations },
  sendBuddyRequest,
  setAlert,
  displayAdd,
  docs,
}) => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  const chatRequest = async () => {
    setStart(true);
    dispatch(
      getRealtimeConversations({
        uid_1: auth?.user?._id,
        uid_2: user?._id,
      })
    );
  };

  const sendRequest = async () => {
    await sendBuddyRequest(_id);
    projectFirestore.collection('notifications').add({
      sender: profile?._id,
      senderName: auth?.user?.userName,
      avatar: auth?.user?.avatar,
      receiver: user?._id,
      type: 'request',
      read: false,
      createdAt: new Date(),
    });
  };

  const onClick = () => {
    sendRequest();
  };

  const meta = (url) => {
    var new_url = url.substring(0, url.indexOf('?alt'));
    const ext = new_url.substring(new_url.lastIndexOf('.'));
    return ext;
  };

  const documents = docs && docs.filter((doc) => doc?.userId === user?._id);

  const filter = documents.filter(
    (doc) => doc?.type !== 'audio' || doc?.type !== 'blog'
  );

  return (
    <>
      <NotePeoplePopUp
        show={show}
        close={close}
        id={_id}
        avatar={avatar}
        status={status}
        user={user}
      />
      <div className='connect-main'>
        <div className='connect-left'>
          <div className='connect-left-top'>
            <div
              style={{
                background: `url(${
                  avatar ? avatar : logo
                }) no-repeat center center/cover`,
              }}
              className='display-pic'
            ></div>
            <div className='flex-c'>
              <p>
                <span className='bold'>
                  {user?.fullName && user?.fullName}
                  {user?.groupName && user?.groupName}
                </span>{' '}
                <br />
                <span className='second-bold'>
                  {/* {user?.userName && user?.userName} */}
                </span>{' '}
                {/* <br /> */}
                <span className='second-bold'>{status}</span> <br />
                <span className='second-bold'>{location}</span>
                <br />
                <span className='third-bold'>
                  Connections : <span className='f-1'>{buddies.length}</span>
                </span>
              </p>
            </div>
            <div className='note'>
              {' '}
              <a href='#!' onClick={() => setShow(true)}>
                <img src={noteimg} alt='' />
              </a>
            </div>
          </div>

          <div className='connect-left-bottom'>
            <div className='btn-b'>
              {' '}
              <Link to={`/portfolio/${user?._id}`} className='btn-blue'>
                View Portfolio
              </Link>
            </div>
            <div className='btn-b'>
              {' '}
              <a className='btn-blue' onClick={() => onClick()}>
                <img src={add} alt='' />
              </a>
            </div>
            <div className='btn-g'>
              {' '}
              <a onClick={chatRequest} className='btn-blue g-1'>
                <img src={mail} alt='' />
              </a>
            </div>
          </div>
        </div>

        {displayAdd && (
          <div className='connect-right'>
            {filter &&
              filter.slice(0, 4).map(
                (doc) =>
                  meta(doc.url) !== '.mp3' && (
                    <a key={doc.id}>
                      <div className='pic-1'>
                        {doc.type === 'video' ? (
                          <motion.video
                            controls
                            src={doc.url}
                            alt='uploaded pic'
                            initial={{
                              opacity: 0,
                              height: '100%',
                              width: '100%',
                            }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                          />
                        ) : (
                          <motion.img
                            src={doc.url}
                            height='100%'
                            width='100%'
                            alt=''
                          />
                        )}
                      </div>
                    </a>
                  )
              )}
          </div>
        )}
        {start ? (
          <ChatPopup
            userUid={user?._id}
            chatProfile={user?.fullName}
            conversations={conversations}
            chatUserImage={avatar}
          />
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});

ProfileItem.propTypes = {
  sendBuddyRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setAlert,
  sendBuddyRequest,
})(ProfileItem);
