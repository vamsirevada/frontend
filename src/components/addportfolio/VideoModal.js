/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/dummyimage.jpg';
import backward from '../../images/Group 6054.svg';
import forward from '../../images/Group 6056.svg';
import cancel from '../../images/close.svg';
import Moment from 'react-moment';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import CommentForm from '../posts/CommentForm';
import {
  getRealtimeData,
  portfolioDisLike,
  portfolioLike,
} from '../../actions/portfolio';
import Spinner from '../layout/Spinner';

const VideoModal = ({
  auth,
  portfolio: { portfolio },
  profile: { avatar, user },
  displayVideo,
  value,
  dispVideo,
  videos,
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

  const abc = portfolio.likes.map((like) => like.user === auth?.user?._id);

  const xyz = abc.find((num) => num === true);

  const [displayLbtn, toogleLbtn] = useState(xyz);

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

  const unlike = (file) => {
    dispatch(portfolioDisLike(file.id, auth?.user?._id));
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
                        {videos[value].title}
                      </h2>
                      <p>
                        by <span className='blue'>{user.fullName}</span>
                        {', '}
                        <Moment format='DD MMM YY'>
                          {videos[value].createdAt.toDate()}
                        </Moment>{' '}
                        {', '}
                        <Moment format='hh:mm A'>
                          {videos[value].createdAt.toDate()}
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
                      decrement = videos.length - 1;
                    }
                    displayVideo(decrement);
                    dispatch(getRealtimeData(videos[decrement].id));
                  }}
                  className='prev'
                >
                  <img src={backward} alt='' />
                </div>
                <div className='post-pic-1'>
                  <video
                    controls
                    controlsList='nodownload'
                    src={dispVideo.videoUrl}
                    alt=''
                  />
                </div>
                <div
                  onClick={() => {
                    let increment = value + 1;
                    if (increment > videos.length - 1) {
                      increment = 0;
                    }
                    displayVideo(increment);
                    dispatch(getRealtimeData(videos[increment].id));
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
                  {displayLbtn ? (
                    <div>
                      <div
                        onClick={() => {
                          unlike(videos[value]);
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
                          like(videos[value]);
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
                    {portfolio.likes.length > 0 && portfolio.likes.length}
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

export default connect(mapStateToProps)(VideoModal);
