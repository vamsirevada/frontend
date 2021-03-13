import React, { useEffect, useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  getRealtimeNotifications,
  markNotificationsRead,
} from '../../actions/notification';
import { accept, decline } from '../../actions/profile';
import logo from '../../images/dummyimage.jpg';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import { projectFirestore } from '../../firebase/config';
import { grey } from '@material-ui/core/colors';

const NotificationPopup = ({
  user,
  notification: { notifications },
  accept,
  decline,
  markNotificationsRead,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getRealtimeNotifications({
        uid_1: user?._id,
      })
    );
  }, [dispatch, user?._id]);

  const [open, setOpen] = useState(false);

  const add = (id) => {
    projectFirestore
      .collection('notifications')
      .where('sender', '==', id)
      .where('type', '==', 'request')
      .get()
      .then((i) => {
        i.forEach((d) => {
          d.ref.delete();
        });
      });
    projectFirestore.collection('notifications').add({
      sender: user?._id,
      senderName: user?.userName,
      avatar: user?.avatar,
      receiver: id,
      type: 'accept',
      read: false,
      createdAt: new Date(),
    });
  };

  const onMenuOpened = () => {
    const unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.id);
    markNotificationsRead(unreadNotificationsIds);
  };

  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((not) => not.read === false).length
            }
            color='secondary'
          >
            <NotificationsIcon
              style={{
                fontSize: 22,
                color: grey[600],
                verticalAlign: 'top',
              }}
              color='action'
            />
          </Badge>
        ))
      : (notificationsIcon = (
          <NotificationsIcon
            style={{
              fontSize: 22,
              color: grey[600],
              verticalAlign: 'top',
            }}
            color='action'
          />
        ));
  } else {
    notificationsIcon = (
      <NotificationsIcon
        style={{
          fontSize: 24,
          color: grey[600],
          verticalAlign: 'top',
        }}
      />
    );
  }

  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        return (
          <li
            className='notif-element'
            style={{ listStyle: 'none' }}
            key={not?.createdAt}
          >
            {not.type === 'like' && (
              <>
                <img
                  height='10px'
                  width='10px'
                  src={not.avatar ? not.avatar : logo}
                  alt=''
                />
                <p>{not.senderName} liked your post </p>
              </>
            )}
            {not.type === 'comment' && (
              <>
                <img
                  height='10px'
                  width='10px'
                  src={not.avatar ? not.avatar : logo}
                  alt=''
                />
                <p>{not.senderName} commented on your post </p>
              </>
            )}
            {not.type === 'request' && (
              <>
                <img
                  height='10px'
                  width='10px'
                  src={not.avatar ? not.avatar : logo}
                  alt=''
                />
                <p>{not.senderName} sent you request </p>
                <button
                  onClick={() => {
                    accept(not.sender);
                    add(not.sender);
                  }}
                >
                  Accept
                </button>
              </>
            )}
            {not.type === 'accept' && (
              <>
                <img
                  height='10px'
                  width='10px'
                  src={not.avatar ? not.avatar : logo}
                  alt=''
                />
                <p>{not.senderName} accepted your request </p>
              </>
            )}
            {not.type === 'invite' && (
              <>
                <img
                  height='10px'
                  width='10px'
                  src={not.avatar ? not.avatar : logo}
                  alt=''
                />
                <p>{not.senderName} sent you a invite </p>
              </>
            )}
          </li>
        );
      })
    ) : (
      <p>You have no notifications yet</p>
    );

  return (
    <Fragment>
      <IconButton
        aria-owns={open ? 'simple-menu' : undefined}
        aria-haspopup='true'
        onClick={() => {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 5000);
        }}
      >
        {notificationsIcon}
      </IconButton>
      {open && (
        <div>
          <div className='arrow-up notif'></div>
          <div onClick={onMenuOpened} className='notif-dis'>
            {notificationsMarkup}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

export default connect(mapStateToProps, {
  accept,
  decline,
  markNotificationsRead,
})(NotificationPopup);
