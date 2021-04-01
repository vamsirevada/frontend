import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../actions/notification';
import {
  accept,
  decline,
  acceptProjectInvite,
  declineProjectInvite,
} from '../../actions/profile';
import logo from '../../images/dummyimage.jpg';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import { projectFirestore } from '../../firebase/config';
import { grey } from '@material-ui/core/colors';

const NotificationPopup = ({
  auth: { user },
  notification: { notifications },
  accept,
  decline,
  markNotificationsRead,
}) => {
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
          <div>
            <div className='notif-element' key={not?.createdAt}>
              {not.type === 'like' && (
                <>
                  <img
                    height='10px'
                    width='10px'
                    src={not.avatar ? not.avatar : logo}
                    alt=''
                  />
                  <p>
                    <span className='notif-bold'>{not.senderName}</span> liked
                    your post{' '}
                  </p>
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
                  <p>
                    <span className='notif-bold'>{not.senderName}</span>{' '}
                    commented on your post{' '}
                  </p>
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
                  <div className='notify-width'>
                    <p>
                      <span className='notif-bold'>{not.senderName}</span> sent
                      you request{' '}
                    </p>
                    <div className='notify-button'>
                      <button
                        onClick={() => {
                          accept(not.sender);
                          add(not.sender);
                        }}
                        className='nb-blue'
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          accept(not.sender);
                          add(not.sender);
                        }}
                        className='nb-white'
                      >
                        Decline
                      </button>
                    </div>
                  </div>
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
                  <p>
                    <span className='notif-bold'>{not.senderName}</span>{' '}
                    accepted your request{' '}
                  </p>
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
                  <p>
                    <span className='notif-bold'>{not.senderName}</span> sent
                    you a invite{' '}
                  </p>
                </>
              )}
            </div>
            <hr className='Hori' />
          </div>
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
            <div className='notify-ribbon'>
              <h4>Notifications</h4>
              <div className='notify-ribbon-right'>
                <p className='notify-cate'>All</p>
                <p className='notify-cate'>NoticeBoard</p>
                <p className='notify-cate'>Project</p>
              </div>
            </div>
            {notificationsMarkup}
            <div className='notify-seeall'>
              <h4>See all</h4>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  notification: state.notification,
});

export default connect(mapStateToProps, {
  accept,
  decline,
  acceptProjectInvite,
  declineProjectInvite,
  markNotificationsRead,
})(NotificationPopup);
