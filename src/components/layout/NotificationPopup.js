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
  acceptProjectInvite,
  declineProjectInvite,
  markNotificationsRead,
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');

  const xyz = notifications.filter((not) => not.sender !== not.receiver);

  const add = (id) => {
    remove(id);
    projectFirestore.collection('notifications').add({
      sender: user?._id,
      senderName: user?.fullName ? user?.fullName : user?.groupName,
      avatar: user?.avatar,
      receiver: id,
      type: 'accept',
      read: false,
      createdAt: new Date(),
    });
  };

  const add1 = (id) => {
    remove1(id);
    projectFirestore.collection('notifications').add({
      sender: user?._id,
      senderName: user?.fullName ? user?.fullName : user?.groupName,
      avatar: user?.avatar,
      receiver: id,
      type: 'project_accept',
      read: false,
      createdAt: new Date(),
    });
  };

  const remove = (id) => {
    projectFirestore
      .collection('notifications')
      .where('senderUserId', '==', id)
      .where('type', '==', 'request')
      .get()
      .then((i) => {
        i.forEach((d) => {
          d.ref.delete();
        });
      });
  };

  const remove1 = (id) => {
    projectFirestore
      .collection('notifications')
      .where('sender', '==', id)
      .where('type', '==', 'invite')
      .get()
      .then((i) => {
        i.forEach((d) => {
          d.ref.delete();
        });
      });
  };

  const onMenuOpened = () => {
    const unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.id);
    markNotificationsRead(unreadNotificationsIds);
  };

  let notificationsIcon;

  if (xyz && xyz.length > 0) {
    xyz.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
          <Badge badgeContent={xyz.filter((not) => not.read === false).length}>
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
    xyz && xyz.length > 0 ? (
      xyz.map((not, index) => {
        return (
          <div key={index}>
            <div className='notif-element'>
              {not.type === 'like' && (
                <>
                  <img src={not.avatar ? not.avatar : logo} alt='' />
                  <p>
                    <span className='notif-bold'>{not.senderName}</span>{' '}
                    appreciated your post{' '}
                  </p>
                </>
              )}
              {not.type === 'comment' && (
                <>
                  <img src={not.avatar ? not.avatar : logo} alt='' />
                  <p>
                    <span className='notif-bold'>{not.senderName}</span>{' '}
                    commented on your post{' '}
                  </p>
                </>
              )}
              {not.type === 'request' && (
                <>
                  <img src={not.avatar ? not.avatar : logo} alt='' />
                  <div className='notify-width'>
                    <p>
                      <span className='notif-bold'>{not.senderName}</span> sent
                      you request{' '}
                    </p>
                    <div className='notify-button'>
                      <button
                        onClick={() => {
                          accept(not.sender);
                          add(not.senderUserId);
                        }}
                        className='nb-blue'
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          decline(not.sender);
                          remove(not.senderUserId);
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
                  <img src={not.avatar ? not.avatar : logo} alt='' />
                  <p>
                    <span className='notif-bold'>{not.senderName}</span>{' '}
                    accepted your request{' '}
                  </p>
                </>
              )}
              {not.type === 'invite' && (
                <>
                  <img src={not.avatar ? not.avatar : logo} alt='' />
                  <div className='project-notification'>
                    <p className='notify-width'>
                      <span className='notif-bold'>{not.senderName}</span> sent
                      you a invite{' '}
                    </p>
                    <div className='project-invite'>
                      <form
                        className='project-invite-form'
                        onSubmit={(e) => {
                          e.preventDefault();
                          acceptProjectInvite(not.sender, { status });
                          setStatus('');
                          add1(not.sender);
                        }}
                      >
                        <div>
                          <input
                            type='text'
                            placeholder='write a status...'
                            name='status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          />
                        </div>
                        <div>
                          <button className='proj-btn-blue' type='submit'>
                            Accept
                          </button>
                        </div>
                      </form>
                      <div>
                        <button
                          className='proj-btn-white'
                          onClick={() => {
                            declineProjectInvite(not.sender);
                            remove1(not.sender);
                          }}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <hr className='Hori' />
          </div>
        );
      })
    ) : (
      <div className='no-notification'>
        <p>You have no notifications yet</p>
      </div>
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
      {open && (
        <div
          className='notificationpopup-full'
          onClick={(e) => {
            if (e.target.classList.contains('notificationpopup-full')) {
              setOpen(false);
            }
          }}
        >
          <div className='arrow-up notif'></div>
          <div onClick={onMenuOpened} className='notif-dis'>
            <div className='notify-ribbon'>
              <h4>Notifications</h4>
              {/* <div className='notify-ribbon-right'>
                <p className='notify-cate'>All</p>
                <p className='notify-cate'>NoticeBoard</p>
                <p className='notify-cate'>Project</p>
              </div> */}
            </div>
            {notificationsMarkup}
            {/* <div className='notify-seeall'>
              <h4>All Caught Up</h4>
            </div> */}
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
