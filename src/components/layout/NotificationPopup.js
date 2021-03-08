import React, { useEffect, useState, Fragment } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  getRealtimeNotifications,
  markNotificationsRead,
} from '../../actions/notification';
import logo from '../../images/dummyimage.jpg';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);

  const handleOpen = (e) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const onMenuOpened = () => {
    const unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
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
          <MenuItem key={not?.createdAt} onClick={handleClose}>
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
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement='top' title='notifications'>
        <IconButton
          ref={anchorRef}
          aria-owns={open ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
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
