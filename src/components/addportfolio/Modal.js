/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/dummyimage.jpg';
import backward from '../../images/Group 6054.svg';
import forward from '../../images/Group 6056.svg';
import cancel from '../../images/icons/noun_Plus_2310779.svg';
import closebutton from '../../images/close.svg';
import Moment from 'react-moment';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import bin from '../../images/icons/noun_bin_2832480.svg';
import medal from '../../images/icons/noun_Medal_22448.svg';
import {
  getRealtimeData,
  portfolioDisLike,
  portfolioLike,
  portfolioComment,
  portfolioUnComment,
} from '../../actions/portfolio';
import Loader from '../layout/Loader';
import { projectFirestore } from '../../firebase/config';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import PortfolioLikesPopup from './PortfolioLikesPopup';
import PortfolioAcknowledgePopup from './PortfolioAcknowledgePopup';
import { usePopper } from 'react-popper';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// import firebase from 'firebase/app';

const Modal = ({
  auth,
  portfolio: { portfolio },
  profile: { avatar, user },
  displayImage,
  value,
  dispImage,
  images,
  close,
  guest,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [viewAllComments, setViewAllComments] = useState(false);
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [edit, setEdit] = useState(false);
  const [titleedit, setTitleEdit] = useState(false);
  // const [tedit, setTEdit] = useState(false);
  // const [tcomment, setTComment] = useState('');
  // console.log(tcomment);
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

  // const editTCommentMode = () => {
  //   setTEdit(true);
  //   // projectFirestore
  //   //   .collection('images')
  //   //   .doc(portfolio.id)
  //   //   .update({
  //   //     acknowledgements: firebase.firestore.FieldValue.arrayUnion({
  //   //       edit: true,
  //   //     }),
  //   //   })
  //   //   .then((data) => console.log(data));
  //   // dispatch(getRealtimeData(portfolio.id));
  // };

  const editTitleModeClose = () => {
    setTitleEdit(false);
  };

  const cancelEditMode = () => {
    setEdit(false);
  };

  const updateEditMode = () => {
    projectFirestore.collection('images').doc(portfolio.id).update({
      description: des,
      stringlength: stringlength,
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
  };

  const comment = (file) => {
    const commentObj = {
      Id: uuidv4(),
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
  };

  const removeComment = (file, comment) => {
    dispatch(portfolioUnComment(file.id, comment));
  };

  return (
    <>
      {show && <PortfolioLikesPopup hide={hide} likes={portfolio.likes} />}
      {open && (
        <PortfolioAcknowledgePopup
          auth={auth}
          file={images[value]}
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
                              <EditIcon className='edit-icon' />
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
                  <img src={closebutton} onClick={close} alt='' />
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
                    setTitleEdit(false);
                    setEdit(false);
                  }}
                  className='prev prev-1'
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
                    setTitleEdit(false);
                    setEdit(false);
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
                          portfolio.likes.length > 0 &&
                          portfolio.likes
                            .map((x) => x.user === auth?.user?._id)
                            .find((x) => x === true) ? (
                            <div>
                              <div
                                onClick={() => {
                                  unlike(images[value]);
                                }}
                              >
                                <img className='r-1' src={yheart} alt='' />
                                <span className='d-1'>Apperciated</span>
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                like(images[value]);
                              }}
                            >
                              <img className='r-1' src={heart} alt='' />
                              <span className='d-1'>Apperciate</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <img className='r-1' src={com} alt='' />
                          <a href='#comment-box-modal' className='d-1'>
                            Comment
                          </a>
                        </div>
                      </div>
                      <div className='des-right'>
                        {portfolio.likes && portfolio.likes.length > 0 && (
                          <a
                            onClick={() => {
                              setShow(true);
                            }}
                            className='d-1'
                          >
                            <span className='f-1'>
                              {portfolio.likes.length}
                            </span>{' '}
                            Appreciations
                          </a>
                        )}
                        {portfolio.comments && portfolio.comments.length > 0 && (
                          <a href='#post-comments' className='d-1'>
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

                {edit ? (
                  <div className='popup-description'>
                    <textarea
                      cols='15'
                      rows='2'
                      defaultValue={portfolio.description}
                      onChange={(e) => setDes(e.target.value)}
                      ref={setReferenceElement}
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
                          <div key={index}>
                            <li
                              onClick={() => {
                                setDes(des.replace('@', '').concat(x));
                                setStringLength(x.length);
                              }}
                            >
                              {x}
                            </li>
                            <hr />
                          </div>
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
                        <EditIcon className='edit-icon' />
                      </div>
                    )}
                  </div>
                )}
                {!guest && (
                  <>
                    {portfolio.acknowledgements &&
                      portfolio.acknowledgements.length > 0 && (
                        <div>
                          {view ? (
                            <div className='comments'>
                              <div className='comment-box-heading'>
                                <h5>Acknowledged by</h5>
                                <span
                                  className='ack-cross'
                                  onClick={() => setView(false)}
                                >
                                  <img src={cancel} alt='' />
                                </span>
                              </div>
                              {portfolio.acknowledgements.map((x, index) => (
                                <div key={index} className='comment-box'>
                                  <Link
                                    target='_blank'
                                    to={`/portfolio/${x.user}`}
                                  >
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
                                  <div className='cmt-1 list'>
                                    <Link
                                      target='_blank'
                                      to={`/portfolio/${x.user}`}
                                      className='d-1'
                                    >
                                      {x?.fullName && x?.fullName}
                                    </Link>{' '}
                                    <p className='d-3'>{x.acknowledgedText}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className='acknowledged-box'>
                              <h3>Acknowledged by</h3>
                              <div className='acknowledged-avatars'>
                                {portfolio.acknowledgements
                                  .slice(0, 3)
                                  .map((x, index) => (
                                    <Link
                                      target='_blank'
                                      to={`/portfolio/${x.user}`}
                                      key={index}
                                      className='acknowledged-avatar'
                                    >
                                      <img
                                        src={x?.acknowledgedUserAvatar}
                                        alt=''
                                      />
                                    </Link>
                                  ))}
                                {portfolio.acknowledgements.length > 3 && (
                                  <span
                                    onClick={() => setView(true)}
                                    className='acknowledged-count'
                                  >
                                    +{portfolio.acknowledgements.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          <div className='comments'>
                            <div className='comment-box-heading'>
                              <h5>Testimonials</h5>
                            </div>
                            {portfolio.acknowledgements
                              .slice(
                                0,
                                viewAll ? portfolio.acknowledgements.length : 2
                              )
                              .map((x, index) => (
                                <div key={index}>
                                  <div className='comment-box'>
                                    <Link
                                      target='_blank'
                                      to={`/portfolio/${x.user}`}
                                    >
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
                                    <div className='cmt-1 list'>
                                      <div>
                                        <Link
                                          target='_blank'
                                          to={`/portfolio/${x.user}`}
                                          className='d-1'
                                        >
                                          {x?.fullName && x?.fullName},{' '}
                                        </Link>{' '}
                                        <span className='d-1'>
                                          {x.acknowledgedText}
                                        </span>
                                        {/* {tedit ? (
                                          <div className='d-3'>
                                            <textarea
                                              name='tedit'
                                              cols='80'
                                              rows='2'
                                              defaultValue={
                                                x.acknowledgedComment
                                              }
                                              onChange={(e) =>
                                                setTComment(e.target.value)
                                              }
                                            ></textarea>
                                            <CloseIcon
                                              color='secondary'
                                              className='close-icon'
                                              onClick={() => setTEdit(false)}
                                            />
                                          </div>
                                        ) : ( */}
                                        <div className='d-3'>
                                          <p>{x.acknowledgedComment}</p>
                                        </div>
                                        {/* )} */}
                                      </div>
                                      {/* <div>
                                        {!tedit && (
                                          <EditIcon
                                            onClick={editTCommentMode}
                                            className='edit-icon'
                                          />
                                        )}
                                        <button
                                          type='button'
                                          className='btn-blue btn-red'
                                          // onClick={() => removeComment(images[value])}
                                        >
                                          <img src={bin} alt='' />
                                        </button>
                                      </div> */}
                                    </div>
                                  </div>
                                  <hr className='Hori' />
                                </div>
                              ))}
                            {portfolio.acknowledgements.length > 2 && (
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
                          </div>
                        </div>
                      )}

                    {portfolio.comments && portfolio.comments.length > 0 && (
                      <div id='post-comments' className='comments'>
                        <div className='comment-box-heading'>
                          <h5>Comments</h5>
                        </div>
                        {portfolio.comments
                          .slice(
                            0,
                            viewAllComments ? portfolio.comments.length : 3
                          )
                          .map((comment, index) => (
                            <div key={index}>
                              <div className='comment-box'>
                                <Link
                                  target='_blank'
                                  to={`/portfolio/${comment.user}`}
                                >
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
                                <div className='cmt-1 list'>
                                  <div>
                                    <Link
                                      target='_blank'
                                      to={`/portfolio/${comment.user}`}
                                      className='d-1'
                                    >
                                      {comment?.fullName && comment?.fullName}
                                    </Link>{' '}
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
                                            removeComment(
                                              images[value],
                                              comment
                                              // comment.Id
                                            )
                                          }
                                        >
                                          <img src={bin} alt='' />
                                        </button>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <hr className='Hori' />
                            </div>
                          ))}
                        {portfolio.comments.length > 3 && (
                          <div
                            className='load'
                            onClick={() => {
                              setViewAllComments(!viewAllComments);
                            }}
                          >
                            <div className='loadmore'>
                              {viewAllComments ? 'View Less' : 'View All'}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div id='comment-box-modal' className='comment-box modal'>
                      <div>
                        <h3>Post Comment</h3>
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
                            Post
                          </button>
                        </form>
                      </div>
                    </div>
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

export default connect(mapStateToProps)(Modal);
