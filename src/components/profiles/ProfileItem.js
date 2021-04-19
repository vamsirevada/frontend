/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2).svg';
import mail from '../../images/chat.svg';
import logo from '../../images/dummyimage.jpg';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { sendBuddyRequest } from '../../actions/profile';
import { motion } from 'framer-motion';
import { projectFirestore } from '../../firebase/config';
import PersonalMessage from '../chat/PersonalMessage';
import NotePeoplePopUp from '../posts/NotePeoplePopUp';
import noteimg from '../../images/icons/summarize-24px.svg';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ProfileItem = ({
  auth,
  profile: { profile },
  item: { _id, user, avatar, status, location, buddies },
  sendBuddyRequest,
  displayAdd,
  docs,
}) => {
  const [start, setStart] = useState(false);
  const [show, setShow] = useState(false);
  const [chatUserName, setChatUserName] = useState('');
  const [chatUserImage, setChatUserImage] = useState(logo);
  const [userUid, setUserUid] = useState(null);

  const close = () => {
    setShow(false);
  };

  const chatClose = () => {
    setStart(false);
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

  const documents =
    docs &&
    docs.filter(
      (doc) =>
        doc?.userId === user?._id &&
        doc?.type !== 'Audio' &&
        doc?.type !== 'Blog'
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
                Portfolio
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
              <a
                onClick={() => {
                  setStart(true);
                  setUserUid(user?._id);
                  setChatUserName(user?.fullName);
                  setChatUserImage(avatar);
                }}
                className='btn-blue g-1'
              >
                <img src={mail} alt='' />
              </a>
            </div>
          </div>
        </div>

        {displayAdd && (
          <div className='connect-right'>
            {documents &&
              documents.slice(0, 3).map((doc) => (
                <div className='pic-1' key={doc.id}>
                  {doc.type === 'Video' ? (
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
              ))}
            {documents.length > 0 && (
              <Link to={`/portfolio/${user?._id}`}>
                <ArrowForwardIosIcon />
              </Link>
            )}
          </div>
        )}
      </div>
      {start ? (
        <PersonalMessage
          userUid={userUid}
          chatUserName={chatUserName}
          chatUserImage={chatUserImage}
          chatClose={chatClose}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

ProfileItem.propTypes = {
  sendBuddyRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  setAlert,
  sendBuddyRequest,
})(ProfileItem);
