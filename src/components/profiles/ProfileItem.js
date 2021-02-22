/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2).svg';
import mail from '../../images/chat.svg';
import logo from '../../images/dummyimage.jpg';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { sendBuddyRequest, getCurrentProfile } from '../../actions/profile';
import { motion } from 'framer-motion';

const ProfileItem = ({
  profile: { _id, user, avatar, status, location, buddies },
  sendBuddyRequest,
  getCurrentProfile,
  setAlert,
  displayAdd,
  docs,
}) => {
  const sendRequest = async () => {
    await sendBuddyRequest(_id);
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

  const note = async (profileid) => {
    try {
      await axios.put(`api/profile/note/${_id}`);

      setAlert('Noted', 'success');

      // let empty = true;
      // if (res.data.length > 0) {
      //   //eslint-disable-next-line
      //   empty = false;
      // }

      // setRefreshBuddies(true);
      getCurrentProfile();
    } catch (err) {
      if (err.response.data !== undefined) {
        setAlert(err.response.data.msg, 'danger');
      }
    }
  };

  return (
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
        </div>

        <div className='connect-left-bottom'>
          <div className='btn-b'>
            {' '}
            <Link to={`/portfolio/${user?._id}`} className='btn-blue'>
              View Profile
            </Link>
          </div>
          <div className='btn-b'>
            {' '}
            <a className='btn-blue' onClick={() => onClick()}>
              <img src={add} alt='' />
            </a>
          </div>
          <div className='btn-b g'>
            {' '}
            <a className='btn-blue' onClick={() => note()}>
              <img src={add} alt='' />
            </a>
          </div>

          <div className='btn-g'>
            {' '}
            <a className='btn-blue g-1'>
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
    </div>
  );
};

ProfileItem.propTypes = {
  sendBuddyRequest: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, getCurrentProfile, sendBuddyRequest })(
  ProfileItem
);
