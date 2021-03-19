import React, { Fragment, useState } from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { notePost } from '../../actions/profile';
import Moment from 'react-moment';
import logo from '../../images/dummyimage.jpg';
import poster from '../../images/play.jpg';
import PostType from '../posts/PostType';

const NotePostPopUp = ({
  show,
  close,
  id,
  text,
  fullName,
  userName,
  groupName,
  date,
  user,
  type,
  url,
  note,
  notePost,
}) => {
  const [formData, setFormData] = useState({
    remark: '',
  });

  const { remark } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    notePost(id, formData);
    note();
  };

  return (
    <>
      {show && (
        <Fragment>
          <div className='memberpopupscreen note'>
            <div className='memberpopup add'>
              <div className='mem-heading add'>
                <h3>Note Post</h3>
                <a href='#!' className='member-cross' onClick={close}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>

              <div className='body add note'>
                <div className='noteform'>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                      <label htmlFor='remark'>Note Remark :</label>
                      <br />
                      <input
                        type='text'
                        name='remark'
                        className='remark'
                        value={remark}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='prof-flex-btn'>
                      <button className='btn-blue note' type='submit'>
                        Note
                      </button>
                    </div>
                  </form>
                </div>
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
                    {/* <a
                      style={{
                        display: userName === auth.user.userName ? '' : 'none',
                      }}
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
                                <a onClick={(e) => deletePost(_id)}>
                                  Delete post
                                </a>
                              </li>
                            </ul>
                          </div>
                        )}
                      </Fragment>
                    )} */}
                  </div>

                  {PostType(type) === 'default' && (
                    <div
                      style={{ marginBottom: 10 }}
                      className='post-description'
                    >
                      <p>{text}</p>
                    </div>
                  )}
                  {PostType(type) === 'photo' && (
                    <>
                      <p
                        style={{ marginBottom: 10 }}
                        className='post-description'
                      >
                        {text}
                      </p>
                      <img
                        style={{ objectFit: 'contain' }}
                        className='post-pic'
                        src={url}
                        alt=''
                      />
                    </>
                  )}

                  {PostType(type) === 'video' && (
                    <>
                      <p
                        style={{ marginBottom: 10 }}
                        className='post-description'
                      >
                        {text}
                      </p>
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
                    </>
                  )}
                  {PostType(type) === 'audio' && (
                    <>
                      <p
                        style={{ marginBottom: 10 }}
                        className='post-description'
                      >
                        {text}
                      </p>
                      <video
                        poster={poster}
                        className='post-audio'
                        controls
                        src={url}
                      />
                    </>
                  )}
                </div>
              </div>
              {/* <div
                onClick={() => {
                  note();
                }}
              >
                <img className='r-1' src={noteimg} alt='' />
                <span className='d-1'>Note Post</span>
              </div> */}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default connect(null, { getProfiles, notePost })(NotePostPopUp);
