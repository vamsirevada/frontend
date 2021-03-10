import React, { useEffect, useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  getRealtimeNotifications,
  markNotificationsRead,
} from '../../actions/notification';
import logo from '../../images/dummyimage.jpg';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

const NotificationPopup = ({
  auth: { user },
  notification: { notifications },
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
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === 'like' ? 'liked' : 'commented on';
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon =
          not.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <li style={{ listStyle: 'none' }} key={not?.createdAt}>
            {icon}
            <img
              height='10px'
              width='10px'
              src={not.avatar ? not.avatar : logo}
              alt=''
            />
            <p>
              {not.sender} {verb} your post{' '}
            </p>
          </li>
        );
      })
    ) : (
      <MenuItem>You have no notifications yet</MenuItem>
    );

  return (
    <Fragment>
      <IconButton
        aria-owns={open ? 'simple-menu' : undefined}
        aria-haspopup='true'
        onClick={() => {
          setOpen(true);
          // setTimeout(() => {
          //   setOpen(false);
          // }, 5000);
        }}
      >
        {notificationsIcon}
      </IconButton>
      {open && <div onClick={onMenuOpened}>{notificationsMarkup}</div>}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  NotificationPopup
);
