/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/dummyimage.jpg';
import backward from '../../images/Group 6054.svg';
import forward from '../../images/Group 6056.svg';
import cancel from '../../images/close.svg';
import Moment from 'react-moment';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import plane from '../../images/noun_paper plane_367806 copy.svg';
import bin from '../../images/icons/noun_bin_2832480.svg';
import {
  getRealtimeData,
  portfolioDisLike,
  portfolioLike,
  portfolioComment,
} from '../../actions/portfolio';
import Spinner from '../layout/Spinner';
import { Fragment } from 'react';

const Modal = ({
  auth,
  portfolio: { portfolio },
  profile: { avatar, user },
  displayImage,
  value,
  dispImage,
  images,
  close,
}) => {
  const dispatch = useDispatch();
  const [displayAddCmt, toogleAddCmt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  });

  const [displayLbtn, toogleLbtn] = useState(false);

  const onLike = (e) => {
    e.preventDefault();
    toogleLbtn(!displayLbtn);
  };

  const like = (file) => {
    const likeObj = {
      user: auth?.user?._id,
      fullName: auth?.user?.fullName,
      likedUserAvatar: auth?.user?.avatar,
    };
    dispatch(portfolioLike(file.id, likeObj));
  };

  const unlike = (file, likes) => {
    dispatch(portfolioDisLike(file.id, likes, auth?.user?._id));
  };

  const comment = (file) => {
    const commentObj = {
      user: auth?.user?._id,
      fullName: auth?.user?.fullName,
      commentedUserAvatar: auth?.user?.avatar,
      commentText: text,
      commentedTime: new Date(),
    };
    dispatch(portfolioComment(file.id, commentObj));
    setText('');
  };

  const removeComment = () => {
    console.log('removed');
  };

  return (
    <>
      {loading ? (
        <div className='post-pop-up'>
          <Spinner />
        </div>
      ) : (
        <div className='post-pop-up'>
          <div className='post-pop-up-container'>
            <div>
              <div className='flex'>
                <div className='flex-left'>
                  <div className='flex-1'>
                    <div
                      className='display-pic'
                      style={{
                        background: `url(${
                          avatar ? avatar : logo
                        }) no-repeat center center/cover`,
                      }}
                    ></div>
                    <div className='lh-title'>
                      <h2 className='modal-title w-100'>
                        {images[value].title}
                      </h2>
                      <p>
                        by <span className='blue'>{user.fullName}</span>
                        {', '}
                        <Moment format='DD MMM YY'>
                          {images[value].createdAt.toDate()}
                        </Moment>{' '}
                        {', '}
                        <Moment format='hh:mm A'>
                          {images[value].createdAt.toDate()}
                        </Moment>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex-right'>
                  <img src={cancel} onClick={close} alt='' />
                </div>
              </div>
              <hr className='hori' />
            </div>
            <div className='main-post-container'>
              <div className='main-post-top'>
                <div
                  onClick={() => {
                    let decrement = value - 1;
                    if (decrement < 0) {
                      decrement = images.length - 1;
                    }
                    displayImage(decrement);
                    dispatch(getRealtimeData(images[decrement].id));
                  }}
                  className='prev'
                >
                  <img src={backward} alt='' />
                </div>
                <div className='post-pic-1'>
                  <img src={dispImage.imageUrl} alt='' />
                </div>
                <div
                  onClick={() => {
                    let increment = value + 1;
                    if (increment > images.length - 1) {
                      increment = 0;
                    }
                    displayImage(increment);
                    dispatch(getRealtimeData(images[increment].id));
                  }}
                  className='prev'
                >
                  {' '}
                  <img src={forward} alt='' />
                </div>
              </div>
            </div>
            <div className='flex-des'>
              <div className='pic-des-1'>
                <div onClick={(e) => onLike(e)}>
                  {portfolio.likes.includes(auth?.user?._id) ? (
                    <div>
                      <div
                        onClick={() => {
                          unlike(images[value]);
                        }}
                      >
                        <img className='r-1' src={yheart} alt='' />
                        <span className='d-1'>Liked</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        onClick={() => {
                          like(images[value]);
                        }}
                      >
                        <img className='r-1' src={heart} alt='' />
                        <span className='d-1'>Like</span>
                      </div>
                    </>
                  )}
                </div>
                <div
                  onClick={() => {
                    toogleAddCmt(!displayAddCmt);
                  }}
                >
                  <img className='r-1' src={com} alt='' />
                  <span className='d-1'>Comment</span>
                </div>
              </div>
              <div className='des-right'>
                <a className='d-1'>
                  <span className='f-1'>
                    {portfolio.likes &&
                      portfolio.likes.length > 0 &&
                      portfolio.likes.length}
                  </span>{' '}
                  Likes
                </a>
                <a className='d-1'>
                  <span className='f-1'>
                    {portfolio.comments &&
                      portfolio.comments.length > 0 &&
                      portfolio.comments.length}
                  </span>{' '}
                  Comment
                </a>
              </div>
            </div>
            {portfolio.comments && portfolio.comments.length > 0 && (
              <div className='comments'>
                {portfolio.comments.map((comment, index) => (
                  <Fragment key={index}>
                    <div className='comment-box'>
                      <div>
                        <Link to={`portfolio/${comment?.user}`}>
                          <img
                            className='comment-pic'
                            src={
                              comment?.commentedUserAvatar
                                ? comment?.commentedUserAvatar
                                : logo
                            }
                            alt=''
                          />
                        </Link>
                      </div>
                      <div className='cmt-1 list'>
                        <div>
                          <div>
                            <Link to={`portfolio/${comment?.user}`}>
                              <span className='d-1'>
                                {comment?.fullName && comment?.fullName}
                              </span>{' '}
                            </Link>

                            {/* <span className='d-2'>
                              <Moment format='DD MMM YYYY, hh:mm a'>
                                {comment.commentedTime}
                              </Moment>
                            </span> */}
                          </div>
                          <div className='d-3'>
                            <p>{comment.commentText}</p>
                          </div>
                        </div>
                        <div>
                          {!auth.loading && comment?.user === auth.user._id && (
                            <button
                              type='button'
                              className='btn-blue btn-red'
                              onClick={removeComment}
                            >
                              <img src={bin} alt='' />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className='Hori' />
                  </Fragment>
                ))}
              </div>
            )}
            {displayAddCmt && (
              <div className='comment-box'>
                <div>
                  <img
                    className='comment-pic'
                    src={auth?.user?.avatar}
                    alt=''
                  />
                </div>
                <div className='cmt-1'>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      comment(images[value]);
                    }}
                  >
                    <input
                      type='text'
                      name='comment'
                      placeholder='Write a Comment...'
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />

                    <button type='submit' className='btn-blue'>
                      <img src={plane} alt='' />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  portfolio: state.portfolio,
});

export default connect(mapStateToProps)(Modal);
