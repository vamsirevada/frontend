/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import { connect } from 'react-redux';
import { sendBuddyRequest, getProfileById } from '../../actions/profile';

const RequestButton = ({
  peerid,
  reloadid,
  sendBuddyRequest,
  getProfileById,
  profile: { profile1 },
  isGroup,
  user,
}) => {
  const [btn, setBtn] = useState({ text: 'Button Loading', disabled: true });

  const findRequestState = () => {
    let { requests, buddies } = profile1;

    let exists;

    // Check if they're friends already
    exists = buddies.filter((buddy) => buddy === user._id);
    if (exists.length > 0) {
      return setBtn({
        text: 'Friend',
        disabled: true,
      });
    }

    // Check if you have sent a request
    exists = requests.filter((request) => request === user._id);
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
    await sendBuddyRequest(peerid);
    getProfileById(reloadid);
  };

  const onClick = () => {
    if (!btn.disabled) {
      sendRequest();
    }
  };

  return (
    <Fragment>
      <div className='btns'>
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
  sendBuddyRequest,
  getProfileById,
})(RequestButton);
