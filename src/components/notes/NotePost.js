/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import api from '../../utils/api';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { unnotePost } from '../../actions/profile';
import nounPlus from '../../images/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';

const NotePost = ({ setAlert, unnotePost, notepost }) => {
  const { user, post, groupName, fullName, status, avatar, remark } = notepost;

  // const deny = async (user) => {
  //   try {
  //     await api.delete(`/profile/unnote/${user}`);
  //     setAlert('Unnote', 'success');
  //   } catch (err) {
  //     setAlert(err.response.data.msg, 'danger');
  //   }
  // };

  const unnote = (e) => {
    e.PreventDefault();
    unnotePost(post);
    setAlert('Unnote', 'success');
  };

  return (
    <div className='join-grp-flex'>
      <div className='display-pic-1'>
        <img className='display-pic-1' src={avatar ? avatar : logo} alt='no' />
      </div>
      <div className='flex-right'>
        <Link className='bold bold-1'>
          <p>{fullName && fullName}</p>
          <p>{groupName && groupName}</p>
        </Link>
        <p className='third-bold'>{status}</p>

        <p className='third-bold'>{remark}</p>
      </div>

      <div className='btn-bf'>
        {' '}
        <a onClick={unnote}>
          <img src={add} alt='' />
        </a>
      </div>

      <div className='btn-gf'>
        {' '}
        <a onClick={unnote}>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  );
};

export default connect(null, { setAlert, unnotePost })(NotePost);
