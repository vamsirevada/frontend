/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { notePost, unnotePost } from '../../actions/profile';
import Moment from 'react-moment';
import path from '../../images/path.svg';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import logo from '../../images/dummyimage.jpg';
import noteimg from '../../images/icons/summarize-24px.svg';
import PostType from './PostType';
import { projectFirestore } from '../../firebase/config';
import NotePostPopUp from './NotePostPopUp';
import LikesPopup from './LikesPopup';

const PostItem = ({
  auth,
  profile: { profile },
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
    link,
  },
  addLike,
  removeLike,
  deletePost,
  unnotePost,
  params,
}) => {
  const abc = likes.map((like) => like.user === auth?.user?._id);
  const xyz = abc.find((num) => num === true);

  const postnoted = profile?.postnote.map((e) => e.post === _id);

  const rei = postnoted.find((num) => num === true);

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [displayDot, toogleDot] = useState(false);
  const [displayLbtn, toogleLbtn] = useState(xyz);
  const [displayNbtn, toogleNbtn] = useState(rei);
  const [displayAddCmt, toogleAddCmt] = useState(false);

  const onLike = (e) => {
    e.preventDefault();
    toogleLbtn(!displayLbtn);
  };

  const note = () => {
    toogleNbtn(!displayNbtn);
  };
  const unnote = () => {
    unnotePost(_id);
    toogleNbtn(!displayNbtn);
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

  const close = () => {
    setShow(false);
  };

  const hide = () => {
    setOpen(false);
  };

  return (
    <>
      <NotePostPopUp
        show={show}
        close={close}
        id={_id}
        text={text}
        fullName={fullName}
        username={userName}
        groupName={groupName}
        date={date}
        user={user}
        type={type}
        url={url}
        note={note}
      />
      {open && <LikesPopup hide={hide} likes={likes} />}
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
                    <li>
                      <a onClick={() => deletePost(_id)}>Delete post</a>
                    </li>
                  </ul>
                </div>
              )}
            </Fragment>
          )}
        </div>

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
                id='video'
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
              className='post-audio'
              controls
              controlsList='nodownload'
              src={url}
            ></audio>
          </>
        )}

        {PostType(type) === 'default' && (
          <>
            <p className='post-description' style={{ marginBottom: 10 }}>
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
            <div>
              {displayNbtn ? (
                <Fragment>
                  <div onClick={unnote}>
                    <img className='r-1 unnote' src={noteimg} alt='' />
                    <span className='d-1'>Unnote Post</span>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    <img className='r-1 note' src={noteimg} alt='' />
                    <span className='d-1'>Note Post</span>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
          <div className='des-right'>
            {likes.length > 0 && (
              <a
                onClick={() => {
                  setOpen(true);
                }}
                className='d-1'
              >
                <span className='f-1'>{likes.length}</span> Appreciations
              </a>
            )}
            {comments.length > 0 && (
              <a className='d-1'>
                <span className='f-1'>{comments.length}</span> Comments
              </a>
            )}
          </div>
        </div>
        {comments.length > 0 && (
          <div className='comments'>
            {params ? (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={_id}
                  />
                ))}
              </>
            ) : (
              <>
                {comments.slice(0, 3).map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={_id}
                  />
                ))}
                {comments.length > 3 && (
                  <div className='load'>
                    <Link to={`/posts/${_id}`} className='loadmore'>
                      Load more
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {displayAddCmt && (
          <div>
            <CommentForm auth={auth} user={user} postId={_id} />
          </div>
        )}
      </div>
    </>
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
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  notePost,
  unnotePost,
  deletePost,
})(PostItem);
