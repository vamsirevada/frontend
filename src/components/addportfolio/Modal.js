/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import logo from '../../images/dummyimage.jpg';
import backward from '../../images/Group 6054.svg';
import forward from '../../images/Group 6056.svg';
import cancel from '../../images/close.svg';
import Moment from 'react-moment';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import CommentForm from '../posts/CommentForm';
import { connect, useDispatch } from 'react-redux';
import {
  getRealtimeData,
  portfolioDisLike,
  portfolioLike,
} from '../../actions/portfolio';
import Spinner from '../layout/Spinner';

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

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  });

  // const abc = portfolio.likes.map((like) => like.user === auth?.user?._id);

  // console.log(abc);

  // const xyz = abc.find((num) => num === true);

  const [displayLbtn, toogleLbtn] = useState(false);

  const comments = [];

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
                <div onClick={() => toogleAddCmt(!displayAddCmt)}>
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
                    {comments.length > 0 && comments.length}
                  </span>{' '}
                  Comment
                </a>
              </div>
            </div>
            {displayAddCmt && (
              <div>
                <CommentForm comments={comments} />
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
