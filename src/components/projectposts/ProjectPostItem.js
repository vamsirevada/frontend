/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addProjectLike,
  removeProjectLike,
  deleteProjectPost,
} from '../../actions/projectpost';
import Moment from 'react-moment';
import path from '../../images/path.svg';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import CommentForm from '../posts/CommentForm';
import CommentItem from '../posts/CommentItem';
import logo from '../../images/dummyimage.jpg';
import PostType from '../posts/PostType';
import { projectFirestore } from '../../firebase/config';

const ProjectPostItem = ({
  auth,
  singleproject,
  post: {
    _id,
    text,
    fullName,
    userName,
    groupName,
    likes,
    comments,
    date,
    user,
    project,
    type,
    url,
    link,
  },
  addProjectLike,
  removeProjectLike,
  deleteProjectPost,
  params,
}) => {
  const abc = likes.map((like) => like.user === auth?.user?._id);

  const xyz = abc.find((num) => num === true);

  const [displayDot, toogleDot] = useState(false);
  const [displayLbtn, toogleLbtn] = useState(xyz);
  const [displayAddCmt, toogleAddCmt] = useState(false);

  const onLike = (e) => {
    e.preventDefault();
    toogleLbtn(!displayLbtn);
  };

  const like = () => {
    addProjectLike(_id);
    projectFirestore.collection('notifications').add({
      sender: auth?.user?._id,
      senderName: auth?.user?.userName,
      avatar: auth?.user?.avatar,
      receiver: user?._id,
      uid: _id,
      type: 'like',
      read: false,
      createdAt: new Date(),
    });
  };

  const unlike = () => {
    removeProjectLike(_id);
    projectFirestore
      .collection('notifications')
      .where('sender', '==', auth?.user?.userName)
      .where('type', '==', 'like')
      .get()
      .then((i) => {
        i.forEach((d) => {
          d.ref.delete();
        });
      });
  };

  return (
    <div className='post'>
      <div className='post-heading'>
        <div className='flex'>
          <div className='display-pic'>
            <img
              className='display-pic'
              src={user?.avatar ? user?.avatar : logo}
              alt=''
            />
          </div>

          <div className='name-lato'>
            {' '}
            <Link to={`portfolio/${user?._id}`}>
              {fullName && fullName} {groupName && groupName} <br />
            </Link>{' '}
            <span className='date-lato'>
              <span className='f-1'>
                <Moment format='hh:mm A'>{date}</Moment>
                {', '}
                <Moment format='DD MMM YY'>{date}</Moment>
              </span>
            </span>
          </div>
        </div>
        <a
          style={{ display: userName === auth.user.userName ? '' : 'none' }}
          onClick={() => toogleDot(!displayDot)}
          className='three-dots'
        >
          <img src={path} className='resize' alt='' />
        </a>
        {displayDot && (
          <Fragment>
            {userName === auth.user.userName && (
              <div className='no-post-dis' id='post-dis'>
                <ul>
                  <Fragment>
                    <li>
                      <a onClick={(e) => deleteProjectPost(_id)}>Delete post</a>
                    </li>
                  </Fragment>
                </ul>
              </div>
            )}
          </Fragment>
        )}
      </div>
      {PostType(type) === 'default' && (
        <div style={{ marginBottom: 10 }} className='post-description'>
          <p>{text}</p>
        </div>
      )}
      {PostType(type) === 'Picture' && (
        <>
          <p style={{ marginBottom: 10 }} className='post-description'>
            {text}
          </p>
          {link && (
            <a
              className='blog-url'
              target='_blank'
              href={link}
              style={{ marginBottom: 10 }}
            >
              {link}
            </a>
          )}
          <img
            style={{ objectFit: 'contain' }}
            className='post-pic'
            src={url}
            alt=''
          />
        </>
      )}
      {PostType(type) === 'Video' && (
        <>
          <p style={{ marginBottom: 10 }} className='post-description'>
            {text}
          </p>
          {link && (
            <a
              className='blog-url'
              target='_blank'
              href={link}
              style={{ marginBottom: 10 }}
            >
              {link}
            </a>
          )}
          <div className='post-video'>
            <video
              className='post-video'
              controls
              controlsList='nodownload'
              src={url}
            />
          </div>
        </>
      )}
      {PostType(type) === 'Audio' && (
        <>
          <p style={{ marginBottom: 10 }} className='post-description'>
            {text}
          </p>
          {link && (
            <a
              className='blog-url'
              target='_blank'
              href={link}
              style={{ marginBottom: 10 }}
            >
              {link}
            </a>
          )}
          <audio
            controls
            controlsList='nodownload'
            className='post-audio'
            src={url}
          ></audio>
        </>
      )}
      {PostType(type) === 'Blog' && (
        <>
          <p className='post-description' style={{ marginBottom: 10 }}>
            {text}
          </p>
          <a
            className='blog-url'
            target='_blank'
            href={link}
            style={{ marginBottom: 10 }}
          >
            {link}
          </a>
        </>
      )}

      <div className='flex-des'>
        <div className='pic-des-1'>
          <div onClick={(e) => onLike(e)}>
            {displayLbtn ? (
              <Fragment>
                <div onClick={unlike}>
                  <img className='r-1' src={yheart} alt='' />
                  <span className='d-1'>Apperciated</span>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div onClick={like}>
                  <img className='r-1' src={heart} alt='' />
                  <span className='d-1'>Apperciate</span>
                </div>
              </Fragment>
            )}
          </div>
          <div onClick={() => toogleAddCmt(!displayAddCmt)}>
            <img className='r-1' src={com} alt='' />
            <span className='d-1'>Comment</span>
          </div>
        </div>
        <div className='des-right'>
          <a className='d-1'>
            <span className='f-1'>{likes.length > 0 && likes.length}</span>{' '}
            Appreciations
          </a>
          <a className='d-1'>
            <span className='f-1'>
              {comments.length > 0 && comments.length}
            </span>{' '}
            Comment
          </a>
        </div>
      </div>
      {comments.length > 0 && (
        <div className='comments'>
          {params ? (
            <>
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={_id} />
              ))}
            </>
          ) : (
            <>
              {comments.slice(0, 3).map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={_id} />
              ))}
              {comments.length > 3 && (
                <div className='load'>
                  <Link
                    to={`/project/${singleproject?._id}/posts/${_id}`}
                    className='loadmore'
                  >
                    Load more
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {displayAddCmt && <CommentForm auth={auth} user={user} postId={_id} />}
    </div>
  );
};

ProjectPostItem.propTypes = {
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addProjectLike: PropTypes.func.isRequired,
  removeProjectLike: PropTypes.func.isRequired,
  deleteProjectPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addProjectLike,
  removeProjectLike,
  deleteProjectPost,
})(ProjectPostItem);
