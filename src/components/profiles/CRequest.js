/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendBuddyRequest } from '../../actions/profile';
import { projectFirestore } from '../../firebase/config';
import Tooltip from '@material-ui/core/Tooltip';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import accepted from '../../images/friendaccepted.svg';

const CRequest = ({
  profile: { profile },
  item,
  sendBuddyRequest,
  isGroup,
}) => {
  const [btn, setBtn] = useState({ text: 'Button Loading', disabled: true });

  useEffect(() => {
    let { requests, buddies } = item;

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
  }, [item, profile?.user?._id]);

  const sendRequest = async () => {
    await sendBuddyRequest(item?._id);
    projectFirestore.collection('notifications').add({
      sender: profile?._id,
      senderUserId: profile?.user?._id,
      senderName: profile?.user?.fullName
        ? profile?.user?.fullName
        : profile?.user?.groupName,
      avatar: profile?.user?.avatar,
      receiver: item?.user?._id,
      type: 'request',
      read: false,
      createdAt: new Date(),
    });
    if (item?.requests.filter((req) => req === profile?.user?._id)) {
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
    <Tooltip title={btn.text} placement='top'>
      <div className={`btn-white ${btn.text}`}>
        <a onClick={() => onClick()}>
          {btn.text === 'Friend' ? (
            <img className='resize' src={accepted} alt='' />
          ) : (
            <img className='resize' src={add} alt='' />
          )}
        </a>
      </div>
    </Tooltip>
  );
};

CRequest.propTypes = {
  sendBuddyRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  sendBuddyRequest,
})(CRequest);
