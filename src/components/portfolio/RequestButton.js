/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import { connect } from 'react-redux';
import { getProfileById, sendBuddyRequest } from '../../actions/profile';
import { projectFirestore } from '../../firebase/config';

const RequestButton = ({
  profile: { profile, profile1 },
  sendBuddyRequest,
  getProfileById,
  paramsId,
  isGroup,
}) => {
  const [btn, setBtn] = useState({ text: 'Button Loading', disabled: true });

  const findRequestState = () => {
    let { requests, buddies } = profile1;

    let exists;

    // Check if they're friends already
    exists = buddies.filter((buddy) => buddy === profile?.user?._id);
    if (exists.length > 0) {
      return setBtn({
        text: 'Friend',
        disabled: true,
      });
    }

    // Check if you have sent a request
    exists = requests.filter((request) => request === profile?.user?._id);
    if (exists.length > 0) {
      return setBtn({
        text: 'Requested',
        disabled: true,
      });
    }

    // Set to default
    return setBtn({
      text: 'Connect',
      disabled: false,
    });
  };

  useEffect(() => {
    findRequestState();
    //eslint-disable-next-line
  }, []);

  const sendRequest = async () => {
    await sendBuddyRequest(profile1?._id);
    getProfileById(profile1?.user?._id);
    projectFirestore.collection('notifications').add({
      sender: profile?._id,
      senderUserId: profile?.user?._id,
      senderName: profile?.user?.fullName,
      avatar: profile?.user?.avatar,
      receiver: profile1?.user?._id,
      type: 'request',
      read: false,
      createdAt: new Date(),
    });
    if (profile1?.requests.filter((req) => req === profile?.user?._id)) {
      return setBtn({
        text: 'Requested',
        disabled: true,
      });
    }
  };

  const onClick = () => {
    if (!btn.disabled) {
      sendRequest();
    }
  };

  return (
    <Fragment>
      <div>
        <a
          className={`btn-white ${btn.text}`}
          disabled={btn.disabled}
          onClick={() => onClick()}
        >
          <img className='resize' src={add} alt='' />
          {btn.text}
        </a>
      </div>
    </Fragment>
  );
};

RequestButton.propTypes = {
  sendBuddyRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getProfileById,
  sendBuddyRequest,
})(RequestButton);
