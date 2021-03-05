import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import {
  getRealtimeNotifications,
  markNotificationsRead,
} from '../../actions/notification';
import logo from '../../images/dummyimage.jpg';
import Menu from '@material-ui/core/Menu';
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
  const [viewAllNotify, setViewAllNotify] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(
      getRealtimeNotifications({
        uid_1: user?._id,
      })
    );
  }, [dispatch, user?._id]);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    console.log('clicked');
    const unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);

    console.log(unreadNotificationsIds);

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

  // const accept = async (profileid) => {
  //   try {
  //     const res = await axios.put(`api/profile/buddy/${profileid}`);
  //     setAlert('Buddy added', 'success');
  //     let empty = true;
  //     if (res.data.length > 0) {
  //       empty = false;
  //     }
  //     getCurrentProfile();
  //     getBuddyRequests();
  //   } catch (err) {
  //     if (err.response.data !== undefined) {
  //       setAlert(err.response.data.msg, 'danger');
  //     }
  //   }
  // };
  // const deny = async (profileid) => {
  //   try {
  //     await axios.delete(`api/profile/request/${profileid}`);
  //     setAlert('Request declined', 'success');
  //     getBuddyRequests();
  //     getCurrentProfile();
  //   } catch (err) {
  //     setAlert(err.response.data.msg, 'danger');
  //   }
  // };

  return (
    <Fragment>
      <Tooltip placement='top' title='notifications'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
