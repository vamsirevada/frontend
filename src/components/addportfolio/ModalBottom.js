/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  portfolioDisLike,
  portfolioLike,
  portfolioComment,
  portfolioUnComment,
  getRealtimeData,
} from '../../actions/portfolio';
import heart from '../../images/heart.svg';
import yheart from '../../images/liked.png';
import com from '../../images/noun_comment_767203 copy.svg';
import bin from '../../images/icons/noun_bin_2832480.svg';
import medal from '../../images/icons/noun_Medal_22448.svg';
import cancel from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { v4 as uuidv4 } from 'uuid';
import { projectFirestore } from '../../firebase/config';
import PortfolioLikesPopup from './PortfolioLikesPopup';
import PortfolioAcknowledgePopup from './PortfolioAcknowledgePopup';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';
import { getProfiles } from '../../actions/profile';
import { Fragment } from 'react';

const ModalBottom = ({
  auth,
  profile: { profiles },
  portfolio,
  getProfiles,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    text: '',
    des: '',
    stringlength: 0,
    users: [],
    edit: false,
    open: false,
    view: false,
    viewAll: false,
    viewAllComments: false,
    show: false,
  });
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
  });

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const suggestions = profiles.map((profile) =>
    profile.user.fullName ? profile.user.fullName : profile.user.groupName
  );

  const like = (file) => {
    const likeObj = {
      user: auth.user._id,
      fullName: auth.user.fullName ? auth.user.fullName : auth.user.groupName,
      likedUserAvatar: auth.user.avatar,
    };

    dispatch(portfolioLike(file.id, likeObj));
  };

  const unlike = (file) => {
    const unlikeObj = {
      user: auth.user._id,
      fullName: auth.user.fullName ? auth.user.fullName : auth.user.groupName,
      likedUserAvatar: auth.user.avatar,
    };
    dispatch(portfolioDisLike(file.id, unlikeObj));
  };

  const comment = (file) => {
    const commentObj = {
      Id: uuidv4(),
      user: auth.user._id,
      fullName: auth.user.fullName ? auth.user.fullName : auth.user.groupName,
      commentedUserAvatar: auth.user.avatar,
      commentText: data.text,
      commentedTime: new Date(),
    };
    dispatch(portfolioComment(file.id, commentObj));
    setData({
      ...data,
      text: '',
    });
  };

  const removeComment = (file, comment) => {
    dispatch(portfolioUnComment(file.id, comment));
  };

  const updateEditMode = () => {
    projectFirestore.collection('images').doc(portfolio.id).update({
      description: data.des,
      stringlength: data.stringlength,
    });
    setData({
      ...data,
      edit: false,
    });
    dispatch(getRealtimeData(portfolio.id));
  };

  const close = () => {
    setData({
      ...data,
      open: false,
    });
  };

  const hide = () => {
    setData({
      ...data,
      show: false,
    });
  };

  return (
    <>
      {data.show && <PortfolioLikesPopup hide={hide} likes={portfolio.likes} />}
      {data.open && (
        <PortfolioAcknowledgePopup auth={auth} file={portfolio} close={close} />
      )}
      <div className='des-comm-box'>
        <div className='flex-des modal'>
          <div className='flex-des-box'>
            <div className='pic-des-1'>
              {portfolio.likes &&
              portfolio.likes.length > 0 &&
              portfolio.likes
                .map((x) => x.user === auth?.user?._id)
                .find((x) => x === true) ? (
                <div>
                  <div
                    onClick={() => {
                      unlike(portfolio);
                    }}
                  >
                    <img className='r-1' src={yheart} alt='' />
                    <span className='d-1'>Apperciated</span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    like(portfolio);
                  }}
                >
                  <img className='r-1' src={heart} alt='' />
                  <span className='d-1'>Apperciate</span>
                </div>
              )}
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
                    setData({
                      ...data,
                      show: true,
                    });
                  }}
                  className='d-1'
                >
                  <span className='f-1'>{portfolio.likes.length}</span>{' '}
                  Appreciations
                </a>
              )}
              {portfolio.comments && portfolio.comments.length > 0 && (
                <a href='#post-comments' className='d-1'>
                  <span className='f-1'>{portfolio.comments.length}</span>{' '}
                  Comments
                </a>
              )}
            </div>
          </div>
          <div
            onClick={() =>
              setData({
                ...data,
                open: true,
              })
            }
            className='acknowledge-box'
          >
            <img src={medal} alt='' />
            Acknowledge
          </div>
        </div>
        {data.edit ? (
          <div className='popup-description'>
            <textarea
              cols='15'
              rows='2'
              defaultValue={portfolio.description}
              onChange={(e) =>
                setData({
                  ...data,
                  des: e.target.value,
                })
              }
              ref={setReferenceElement}
            />
            {data.des !== '' && data.des.includes('@') && (
              <ul
                className={
                  data.des !== '' &&
                  data.des.includes('@') &&
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
                        setData({
                          ...data,
                          des: data.des.concat(x).replace('@', ''),
                          stringlength: x.length,
                        });
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
              <div
                onClick={() =>
                  setData({
                    ...data,
                    edit: false,
                  })
                }
              >
                <CloseIcon color='secondary' />
              </div>
            </div>
          </div>
        ) : (
          <div className='popup-description'>
            <p>{portfolio.description}</p>
            {auth?.user?._id === portfolio.userId && (
              <div
                onClick={() =>
                  setData({
                    ...data,
                    edit: true,
                  })
                }
              >
                <EditIcon className='edit-icon' />
              </div>
            )}
          </div>
        )}
        {portfolio.acknowledgements && portfolio.acknowledgements.length > 0 && (
          <div>
            {data.view ? (
              <div className='comments'>
                <div className='comment-box-heading'>
                  <h5>Acknowledged by</h5>
                  <span
                    className='ack-cross'
                    onClick={() =>
                      setData({
                        ...data,
                        view: false,
                      })
                    }
                  >
                    <img src={cancel} alt='' />
                  </span>
                </div>
                {portfolio.acknowledgements.map((x, index) => (
                  <div key={index} className='comment-box'>
                    <Link target='_blank' to={`/portfolio/${x.user}`}>
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
                  {portfolio.acknowledgements.slice(0, 3).map((x, index) => (
                    <Link
                      target='_blank'
                      to={`/portfolio/${x.user}`}
                      key={index}
                      className='acknowledged-avatar'
                    >
                      <img src={x?.acknowledgedUserAvatar} alt='' />
                    </Link>
                  ))}
                  {portfolio.acknowledgements.length > 3 && (
                    <span
                      onClick={() =>
                        setData({
                          ...data,
                          view: true,
                        })
                      }
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
                .slice(0, data.viewAll ? portfolio.acknowledgements.length : 2)
                .map((x, index) => (
                  <div key={index}>
                    <div className='comment-box'>
                      <Link target='_blank' to={`/portfolio/${x.user}`}>
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
                          <span className='d-1'>{x.acknowledgedText}</span>
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
                    setData({
                      ...data,
                      viewAll: !data.viewAll,
                    });
                  }}
                >
                  <div className='loadmore'>
                    {data.viewAll ? 'View Less' : 'View All'}
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
              .slice(0, data.viewAllComments ? portfolio.comments.length : 3)
              .map((comment, index) => (
                <div key={index}>
                  <div className='comment-box'>
                    <Link target='_blank' to={`/portfolio/${comment?.user}`}>
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
                          to={`/portfolio/${comment?.user}`}
                          className='d-1'
                        >
                          {comment?.fullName && comment?.fullName}
                        </Link>{' '}
                        <div className='d-3'>
                          <p>{comment?.commentText}</p>
                        </div>
                      </div>
                      <div>
                        {comment?.user === auth?.user?._id && (
                          <button
                            type='button'
                            className='btn-blue btn-red'
                            onClick={() =>
                              removeComment(
                                portfolio,
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
                  setData({
                    ...data,
                    viewAllComments: !data.viewAllComments,
                  });
                }}
              >
                <div className='loadmore'>
                  {data.viewAllComments ? 'View Less' : 'View All'}
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
                comment(portfolio);
              }}
            >
              <input
                type='text'
                name='comment'
                placeholder='Write a Comment...'
                value={data.text}
                onChange={(e) =>
                  setData({
                    ...data,
                    text: e.target.value,
                  })
                }
              />
              <button type='submit' className='btn-blue'>
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(ModalBottom);
