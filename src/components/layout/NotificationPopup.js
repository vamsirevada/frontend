import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { getBuddyRequests, getCurrentProfile } from '../../actions/profile';
// import { getBuddyPosts, getOwnPosts } from '../../actions/post';
import logo from '../../images/dummyimage.jpg';
import { projectFirestore } from '../../firebase/config';

const NotificationPopup = ({
  auth,
  requests,
  setAlert,
  getCurrentProfile,
  getBuddyRequests,
  post: {
    posts,
    oposts: [{ likes }],
  },
}) => {
  console.log(likes);

  useEffect(() => {
    getBuddyRequests();
    //eslint-disable-next-line
  }, []);

  const notifications = requests
    .slice(0, 3)
    .concat(likes.slice(0, 3))
    .concat(posts.slice(0, 3));

  console.log(notifications);

  const [viewAllNotify, setViewAllNotify] = useState(false);

  const accept = async (profileid) => {
    try {
      const res = await axios.put(`api/profile/buddy/${profileid}`);
      setAlert('Buddy added', 'success');
      let empty = true;
      if (res.data.length > 0) {
        empty = false;
      }
      getCurrentProfile();
      getBuddyRequests();
    } catch (err) {
      if (err.response.data !== undefined) {
        setAlert(err.response.data.msg, 'danger');
      }
    }
  };
  const deny = async (profileid) => {
    try {
      await axios.delete(`api/profile/request/${profileid}`);
      setAlert('Request declined', 'success');
      getBuddyRequests();
      getCurrentProfile();
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
  };

  return (
    <Fragment>
      <div className='arrow-middle'></div>
      <ul className='notif-dis' id='dis-dd'>
        {notifications.map((notify, index) => (
          <li key={index} className='join-grp-flex'>
            <img
              src={notify.buddies ? notify?.avatar : notify?.user?.avatar}
              alt=''
            />
            <div className='flex-right'>
              <Link>
                <p>This is test</p>
              </Link>
            </div>
          </li>
        ))}
        {/* <li>
          {requests.map((request) => (
            <div key={request._id} className='join-grp-flex'>
              <img src={request?.avatar ? request?.avatar : logo} alt='' />
              <div className='flex-right'>
                <Link to={`/portfolio/${request?.user?._id}`}>
                  <p>{request?.user?.fullName} has sent a connection request</p>
                </Link>
                <p className='third-bold'>{request?.status}</p>
                <div>
                  {' '}
                  <button onClick={() => accept(request?._id)}>Confirm</button>
                </div>
                <span>
                  <div>
                    {' '}
                    <button onClick={() => deny(request?._id)}>Delete</button>
                  </div>
                </span>
              </div>
            </div>
          ))}
        </li>
        <li>
          {posts.slice(0, 3).map((post) => (
            <div key={post._id} className='join-grp-flex'>
              <img src={post?.user?.avatar} alt='' />
              <p>
                <strong>{post?.fullName}</strong> is posted a New Post
              </p>
              <span>
                <p>{post?.text}</p>
              </span>
            </div>
          ))}
        </li>
        <li>
          {likes.slice(0, 3).map((like) => (
            <div key={like._id} className='join-grp-flex'>
              <img
                src={like?.avatar && like?.avatar ? like?.avatar : logo}
                alt=''
              />
              <p>
                <strong>{like?.fullName} liked your post</strong>
              </p>
            </div>
          ))}
        </li> */}
        <div
          onClick={() => {
            setViewAllNotify(!viewAllNotify);
            console.log('object');
          }}
          style={{ textAlign: 'center', color: '#5d67cc', cursor: 'pointer' }}
        >
          See All
        </div>
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  requests: state.profile.requests,
  post: state.post,
  oposts: state.post.oposts,
});

export default connect(mapStateToProps, {
  setAlert,
  getCurrentProfile,
  getBuddyRequests,
})(NotificationPopup);
