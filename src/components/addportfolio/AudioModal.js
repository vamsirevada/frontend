/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
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
import Loader from '../layout/Loader';
import { Fragment } from 'react';
import poster from '../../images/poster.png';
import { projectFirestore } from '../../firebase/config';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const AudioModal = ({
  auth,
  portfolio: { portfolio },
  profile: { avatar, user },
  displayAudio,
  value,
  dispAudio,
  audios,
  close,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(false);
  const [titleedit, setTitleEdit] = useState(false);
  const [des, setDes] = useState('');
  const [ptitle, setPtitle] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  });

  const changeEditMode = () => {
    setEdit(true);
  };

  const editTitleMode = () => {
    setTitleEdit(true);
  };

  const editTitleModeClose = () => {
    setTitleEdit(false);
  };

  const cancelEditMode = () => {
    setEdit(false);
  };

  const updateEditMode = () => {
    projectFirestore.collection('images').doc(portfolio.id).update({
      description: des,
    });
    setEdit(false);
    dispatch(getRealtimeData(portfolio.id));
  };

  const updateTitle = () => {
    projectFirestore.collection('images').doc(portfolio.id).update({
      title: ptitle,
    });
    setTitleEdit(false);
    dispatch(getRealtimeData(portfolio.id));
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
    dispatch(getRealtimeData(file.id));
  };

  const removeComment = () => {
    console.log('removed');
  };

  return (
    <>
      {loading ? (
        <div className='post-pop-up'>
          <Loader />
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
                      {titleedit ? (
                        <div className='popup-title'>
                          <input
                            type='text'
                            defaultValue={portfolio.title}
                            onChange={(e) => setPtitle(e.target.value)}
                          />
                          <div className='popup-editbutton'>
                            <div onClick={updateTitle}>
                              <CheckIcon color='primary' />
                            </div>
                            <div onClick={editTitleModeClose}>
                              <CloseIcon color='secondary' />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className='popup-title'>
                          <h2 className='modal-title w-100'>
                            {portfolio.title}
                          </h2>
                          <div onClick={editTitleMode}>
                            <EditIcon />
                          </div>
                        </div>
                      )}
                      <p>
                        by <span className='blue'>{user.fullName}</span>
                        {', '}
                        <Moment format='DD MMM YY'>
                          {portfolio.createdAt.toDate()}
                        </Moment>{' '}
                        {', '}
                        <Moment format='hh:mm A'>
                          {portfolio.createdAt.toDate()}
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
                      decrement = audios.length - 1;
                    }
                    displayAudio(decrement);
                    dispatch(getRealtimeData(audios[decrement].id));
                    setTitleEdit(false);
                    setEdit(false);
                  }}
                  className='prev'
                >
                  <img src={backward} alt='' />
                </div>
                <div className='post-pic-1'>
                  <video
                    controls
                    controlsList='nodownload'
                    poster={poster}
                    src={dispAudio.audioUrl}
                    alt=''
                  />
                </div>
                <div
                  onClick={() => {
                    let increment = value + 1;
                    if (increment > audios.length - 1) {
                      increment = 0;
                    }
                    displayAudio(increment);
                    dispatch(getRealtimeData(audios[increment].id));
                    setTitleEdit(false);
                    setEdit(false);
                  }}
                  className='prev'
                >
                  {' '}
                  <img src={forward} alt='' />
                </div>
              </div>
              <div className='des-comm-box'>
                <div className='flex-des'>
                  <div className='pic-des-1'>
                    <div>
                      {portfolio.likes &&
                      portfolio.likes
                        .map((x) => x.user === auth?.user?._id)
                        .find((x) => x === true) ? (
                        <div>
                          <div
                            onClick={() => {
                              unlike(audios[value]);
                            }}
                          >
                            <img className='r-1' src={yheart} alt='' />
                            <span className='d-1'>Apperciated</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            onClick={() => {
                              like(audios[value]);
                            }}
                          >
                            <img className='r-1' src={heart} alt='' />
                            <span className='d-1'>Apperciate</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div>
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
                {edit ? (
                  <div className='popup-description'>
                    <textarea
                      cols='15'
                      rows='2'
                      defaultValue={portfolio.description}
                      onChange={(e) => setDes(e.target.value)}
                    />
                    <div className='popup-editbutton'>
                      <div onClick={updateEditMode}>
                        <CheckIcon color='primary' />
                      </div>
                      <div onClick={cancelEditMode}>
                        <CloseIcon color='secondary' />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='popup-description'>
                    <p>{portfolio.description}</p>
                    <div onClick={changeEditMode}>
                      <EditIcon />
                    </div>
                  </div>
                )}
                <hr className='Hori' />
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
                        comment(audios[value]);
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
                <hr className='Hori' />
                {portfolio.comments && portfolio.comments.length > 0 && (
                  <div className='comments'>
                    <div className='comment-box-heading'>
                      <h5>Comments</h5>
                    </div>
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
                              </div>
                              <div className='d-3'>
                                <p>{comment.commentText}</p>
                              </div>
                            </div>
                            <div>
                              {!auth.loading &&
                                comment?.user === auth.user._id && (
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
              </div>
            </div>
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

export default connect(mapStateToProps)(AudioModal);
