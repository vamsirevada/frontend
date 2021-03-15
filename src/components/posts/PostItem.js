/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Moment from 'react-moment';
import path from '../../images/path.svg';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import logo from '../../images/dummyimage.jpg';
import PostType from './PostType';
import { projectFirestore } from '../../firebase/config';

const PostItem = ({
  auth,
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
    type,
    url,
  },
  addLike,
  removeLike,
  deletePost,
}) => {
  const abc = likes.map((like) => like.user === auth?.user?._id);

  const xyz = abc.find((num) => num === true);

  const [displayDot, toogleDot] = useState(false);
  const [displayLbtn, toogleLbtn] = useState(xyz);
  const [displayAddCmt, toogleAddCmt] = useState(false);
  const [displayComment, toogleComment] = useState(false);

  const onLike = (e) => {
    e.preventDefault();
    toogleLbtn(!displayLbtn);
  };

  const like = () => {
    addLike(_id);
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
    removeLike(_id);
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
          <Link to={`portfolio/${user?._id}`}>
            <div className='display-pic'>
              <img
                className='display-pic'
                src={user?.avatar ? user?.avatar : logo}
                alt=''
              />
            </div>
          </Link>

          <a className='name-lato'>
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
          </a>
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
                      <a onClick={(e) => deletePost(_id)}>Delete post</a>
                    </li>
                  </Fragment>
                </ul>
              </div>
            )}
          </Fragment>
        )}
      </div>

      {PostType(type) !== 'default' && (
        <div style={{ marginBottom: 10 }} className='post-description'>
          {PostType(type) === 'blog' ? (
            <div style={{ marginBottom: 10 }} className='post-blog'>
              <a> {text}</a>
              <br />
              <a href={url} target='_blank'>
                {url}
              </a>
            </div>
          ) : (
            <div className='post-description'>
              <p>{text}</p>
            </div>
          )}
        </div>
      )}
      {PostType(type) === 'default' && (
        <div style={{ marginBottom: 10 }} className='post-description'>
          <p>{text}</p>
        </div>
      )}
      {PostType(type) === 'photo' && (
        <img
          style={{ objectFit: 'contain' }}
          className='post-pic'
          src={url}
          alt=''
        />
      )}

      {PostType(type) === 'video' && (
        <video
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '350px',
            background: 'transparent',
          }}
          controls
          src={url}
          className='post-video'
        />
      )}
      {PostType(type) === 'audio' && (
        <audio className='post-audio' controls src={url} />
      )}

      {PostType(type) !== 'default' ? (
        <div className='flex-des'>
          <div className='pic-des-1'>
            <div onClick={(e) => onLike(e)} className='cursor'>
              {displayLbtn ? (
                <Fragment>
                  <div onClick={unlike}>
                    <img className='r-1' src={yheart} alt='' />
                    <span className='d-1'>Liked</span>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div onClick={like}>
                    <img className='r-1' src={heart} alt='' />
                    <span className='d-1'>Like</span>
                  </div>
                </Fragment>
              )}
            </div>
            <div
              onClick={() => toogleAddCmt(!displayAddCmt)}
              className='cursor'
            >
              <img className='r-1' src={com} alt='' />
              <span className='d-1'>Comment</span>
            </div>
          </div>
          <div className='des-right'>
            <a className='d-1'>
              <span className='f-1'>{likes.length > 0 && likes.length}</span>{' '}
              Likes
            </a>
            <Link
              to={`/posts/${_id}`}
              onClick={() => {
                toogleComment(!displayComment);
                toogleAddCmt(!displayAddCmt);
              }}
              className='d-1'
            >
              <span className='f-1'>
                {comments.length > 0 && comments.length}
              </span>{' '}
              Comment
            </Link>
          </div>
        </div>
      ) : (
        <div className='flex-des'>
          <div className='pic-des-1'>
            <div onClick={(e) => onLike(e)}>
              {displayLbtn ? (
                <Fragment>
                  <div onClick={unlike}>
                    <img className='r-1' src={yheart} alt='' />
                    <span className='d-1'>Liked</span>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div onClick={like}>
                    <img className='r-1' src={heart} alt='' />
                    <span className='d-1'>Like</span>
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
              Likes
            </a>
            <Link
              to={`/posts/${_id}`}
              onClick={() => {
                toogleComment(!displayComment);
                toogleAddCmt(!displayAddCmt);
              }}
              className='d-1'
            >
              <span className='f-1'>
                {comments.length > 0 && comments.length}
              </span>{' '}
              Comment
            </Link>
          </div>
        </div>
      )}
      {displayComment && (
        <div className='comments'>
          {comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} postId={_id} />
          ))}
        </div>
      )}

      {displayAddCmt && (
        <div>
          <CommentForm
            auth={auth}
            user={user}
            postId={_id}
            comments={comments}
          />
        </div>
      )}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
