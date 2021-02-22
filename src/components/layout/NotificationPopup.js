import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBuddyRequests } from '../../actions/profile';
import { getRealtimeNotifications } from '../../actions/notification';
import logo from '../../images/dummyimage.jpg';

const NotificationPopup = ({
  requests,
  getBuddyRequests,
  getRealtimeNotifications,
  notification: { notifications },
}) => {
  useEffect(() => {
    getBuddyRequests();
    getRealtimeNotifications();
  }, [getRealtimeNotifications, getBuddyRequests]);

  return (
    <Fragment>
      {requests.map((request) => (
        <div className='join-grp-flex' key={request._id}>
          <img
            className='display-pic-1'
            src={request?.avatar ? request?.avatar : logo}
            alt=''
          />
          <div className='flex-right'>
            <Link
              to={`/portfolio/${request?.user?._id}`}
              className='bold bold-1'
            >
              <p>{request?.user?.fullName}</p>
            </Link>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  requests: state.profile.requests,
  notification: state.notification,
});

export default connect(mapStateToProps, {
  getBuddyRequests,
  getRealtimeNotifications,
})(NotificationPopup);
