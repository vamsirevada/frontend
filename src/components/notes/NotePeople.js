/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import api from '../../utils/api';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import nounPlus from '../../images/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';

const NotePeople = ({ setAlert, notepeople }) => {
  const { user, fullName, groupName, status, avatar, remark } = notepeople;

  const deny = async (user) => {
    try {
      await api.delete(`/profile/unnote/${user}`);
      setAlert('Unnote', 'success');
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
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
        <a onClick={() => deny(user)}>
          <img src={add} alt='' />
        </a>
      </div>

      <div className='btn-gf'>
        {' '}
        <a onClick={() => deny(user)}>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  );
};

export default connect(null, { setAlert })(NotePeople);
