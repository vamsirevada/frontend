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
import medal from '../../images/icons/noun_Medal_22448.svg';
import bin from '../../images/icons/noun_bin_2832480.svg';
import {
  getRealtimeData,
  portfolioDisLike,
  portfolioLike,
  portfolioComment,
  portfolioUnComment,
} from '../../actions/portfolio';
import Loader from '../layout/Loader';
import { Fragment } from 'react';
import { projectFirestore } from '../../firebase/config';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PortfolioLikesPopup from './PortfolioLikesPopup';
import PortfolioAcknowledgePopup from './PortfolioAcknowledgePopup';
import { usePopper } from 'react-popper';
import api from '../../utils/api';

const VideoModal = ({
  auth,
  portfolio: { portfolio },
  profile: { avatar, user },
  displayVideo,
  value,
  dispVideo,
  videos,
  close,
  guest,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(false);
  const [titleedit, setTitleEdit] = useState(false);
  const [des, setDes] = useState('');
  const [ptitle, setPtitle] = useState('');
  const [users, setUsers] = useState([]);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [stringlength, setStringLength] = useState(0);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
  });

  const fetchData = async () => {
    return await api.get('/profile').then((data) => {
      setUsers(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const suggestions = users.map((user) =>
    user.user.fullName ? user.user.fullName : user.user.groupName
  );

  const close1 = () => {
    setOpen(false);
  };

  const hide = () => {
    setShow(false);
  };

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
      // stringlength: stringlength,
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
      fullName: auth?.user?.fullName
        ? auth?.user?.fullName
        : auth?.user?.groupName,
      likedUserAvatar: auth?.user?.avatar,
    };
    dispatch(portfolioLike(file.id, likeObj));
  };

  const unlike = (file) => {
    const unlikeObj = {
      user: auth?.user?._id,
      fullName: auth?.user?.fullName
        ? auth?.user?.fullName
        : auth?.user?.groupName,
      likedUserAvatar: auth?.user?.avatar,
    };
    dispatch(portfolioDisLike(file.id, unlikeObj));
    dispatch(getRealtimeData(file.id));
  };

  const comment = (file) => {
    const commentObj = {
      user: auth?.user?._id,
      fullName: auth?.user?.fullName
        ? auth?.user?.fullName
        : auth?.user?.groupName,
      commentedUserAvatar: auth?.user?.avatar,
      commentText: text,
      commentedTime: new Date(),
    };
    dispatch(portfolioComment(file.id, commentObj));
    setText('');
    dispatch(getRealtimeData(file.id));
  };

  const removeComment = (file) => {
    const uncommentObj = {
      user: auth?.user?._id,
      fullName: auth?.user?.fullName
        ? auth?.user?.fullName
        : auth?.user?.groupName,
      commentedUserAvatar: auth?.user?.avatar,
      commentText: text,
      commentedTime: new Date(),
    };

    dispatch(portfolioUnComment(file.id, uncommentObj));
    dispatch(getRealtimeData(file.id));
  };

  return (
    <>
      {show && <PortfolioLikesPopup hide={hide} likes={portfolio.likes} />}
      {open && (
        <PortfolioAcknowledgePopup
          auth={auth}
          file={videos[value]}
          close={close1}
        />
      )}
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
                          {auth?.user?._id === portfolio.userId && (
                            <div onClick={editTitleMode}>
                              <EditIcon />
                            </div>
                          )}
                        </div>
                      )}
                      <p>
                        by <span className='blue'>{user.fullName}</span>
                        {', '}
                        <Moment className='date' format='DD MMM YY'>
                          {portfolio?.createdAt &&
                            portfolio?.createdAt.toDate()}
                        </Moment>{' '}
                        {', '}
                        <Moment className='date' format='hh:mm A'>
                          {portfolio?.createdAt &&
                            portfolio?.createdAt.toDate()}
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
                    setTitleEdit(false);
                    setEdit(false);
                  }}
                  className='prev prev-1'
                >
                  <img src={backward} alt='' />
                </div>
                <div className='post-pic-1'>
                  <video
                    className='post-pic-1-video'
                    controls
                    controlsList='nodownload'
                    src={dispVideo.videoUrl}
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
                    setEdit(false);
                    setTitleEdit(false);
                  }}
                  className='prev prev-2'
                >
                  {' '}
                  <img src={forward} alt='' />
                </div>
              </div>

              <div className='des-comm-box'>
                {!guest && (
                  <div className='flex-des modal'>
                    <div className='flex-des-box'>
                      <div className='pic-des-1'>
                        <div>
                          {portfolio.likes &&
                          portfolio.likes
                            .map((x) => x.user === auth?.user?._id)
                            .find((x) => x === true) ? (
                            <div>
                              <div
                                onClick={() => {
                                  unlike(videos[value]);
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
                                  like(videos[value]);
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
                        {portfolio.likes && portfolio.likes.length > 0 && (
                          <a className='d-1'>
                            <span className='f-1'>
                              {portfolio.likes.length}
                            </span>{' '}
                            Appreciations
                          </a>
                        )}
                        {portfolio.comments && portfolio.comments.length > 0 && (
                          <a className='d-1'>
                            <span className='f-1'>
                              {portfolio.comments.length}
                            </span>{' '}
                            Comments
                          </a>
                        )}
                      </div>
                    </div>
                    <div
                      onClick={() => setOpen(true)}
                      className='acknowledge-box'
                    >
                      <img src={medal} alt='' />
                      Acknowledge
                    </div>
                  </div>
                )}
                <div className='acknowledged-box'>
                  <div>
                    {portfolio.acknowledgements && (
                      <div className='acknowledged-box-1'>
                        <h3>Acknowledged by</h3>
                        <div className='acknowledged-avatars'>
                          {portfolio.acknowledgements
                            .slice(0, 3)
                            .map((x, index) => (
                              <span key={index} className='acknowledged-avatar'>
                                <img src={x?.acknowledgedUserAvatar} alt='' />
                              </span>
                            ))}
                          {portfolio.acknowledgements.length > 3 && (
                            <span className='acknowledged-count'>
                              +{portfolio.acknowledgements.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {edit ? (
                  <div className='popup-description'>
                    <textarea
                      cols='15'
                      rows='2'
                      defaultValue={portfolio.description}
                      onChange={(e) => setDes(e.target.value)}
                      // ref={setReferenceElement}
                    />
                    {des !== '' && des.includes('@') && (
                      <ul
                        className={
                          des !== '' &&
                          des.includes('@') &&
                          'acknowledge-tooltip'
                        }
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                      >
                        {suggestions.map((x, index) => (
                          <Fragment key={index}>
                            <li
                              onClick={() => {
                                setDes(des.replace('@', '').concat(x));
                                setStringLength(x.length);
                              }}
                            >
                              {x}
                            </li>
                            <hr />
                          </Fragment>
                        ))}
                      </ul>
                    )}
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
                    {auth?.user?._id === portfolio.userId && (
                      <div onClick={changeEditMode}>
                        <EditIcon />
                      </div>
                    )}
                  </div>
                )}
                {portfolio.acknowledgements && (
                  <div className='comments'>
                    <div className='comment-box-heading'>
                      <h5>Testimonials</h5>
                    </div>
                    {portfolio.acknowledgements
                      .slice(0, viewAll ? portfolio.acknowledgements.length : 2)
                      .map((x, index) => (
                        <Fragment key={index}>
                          <div className='comment-box'>
                            <div>
                              <Link to={`portfolio/${x.user}`}>
                                <img
                                  className='comment-pic'
                                  src={
                                    x.acknowledgedUserAvatar
                                      ? x.acknowledgedUserAvatar
                                      : logo
                                  }
                                  alt=''
                                />
                              </Link>
                            </div>
                            <div className='cmt-1 list'>
                              <div>
                                <div>
                                  <Link to={`portfolio/${x?.user}`}>
                                    <span className='d-1'>
                                      {x?.fullName && x?.fullName}
                                    </span>{' '}
                                  </Link>
                                </div>
                                <div className='d-3'>
                                  <p>{x.acknowledgedComment}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className='Hori' />
                        </Fragment>
                      ))}
                  </div>
                )}
                {portfolio.acknowledgements &&
                  portfolio.acknowledgements.length > 2 && (
                    <div
                      className='load'
                      onClick={() => {
                        setViewAll(!viewAll);
                      }}
                    >
                      <div className='loadmore'>
                        {viewAll ? 'View Less' : 'View All'}
                      </div>
                    </div>
                  )}
                {!guest && (
                  <>
                    <div className='comment-box modal'>
                      <div>
                        <h3>Post Comment</h3>
                      </div>
                      <div className='cmt-1'>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            comment(videos[value]);
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
                            Post
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
                                        onClick={() =>
                                          removeComment(videos[value])
                                        }
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
                  </>
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

export default connect(mapStateToProps)(VideoModal);
