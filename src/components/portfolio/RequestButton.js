/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import { connect } from 'react-redux';
import { sendBuddyRequest } from '../../actions/profile';
import { projectFirestore } from '../../firebase/config';

const RequestButton = ({
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
    console.log('als');
    if (!btn.disabled) {
      sendRequest();
    }
  };

  return (
    <Fragment>
      <div className={`btn-req-white ${btn.text}`}>
        <a disabled={btn.disabled} onClick={() => onClick()}>
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
  sendBuddyRequest,
})(RequestButton);
