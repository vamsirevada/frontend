/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import nounPlus from '../../images/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';

const NotePeople = ({ notepeople }) => {
  const { fullName, status, avatar, remark } = notepeople;

  return (
    <div className='join-grp-flex'>
      <div className='display-pic-1'>
        <img className='display-pic-1' src={avatar ? avatar : logo} alt='no' />
      </div>
      <div className='flex-right'>
        <Link
          // to={`/portfolio/${user._id}`}
          className='bold bold-1'
        >
          <p>{fullName && fullName}</p>
          {/* <p>{groupName && groupName}</p> */}
          {/* <p>{user && user}</p> */}
        </Link>
        <p className='third-bold'>{status}</p>

        <p className='third-bold'>{remark}</p>
      </div>

      {/* <div className='btn-bf'>
        {' '}
        <a onClick={() => accept(_id)}>
          <img src={add} alt='' />
        </a>
      </div>

      <div className='btn-gf'>
        {' '}
        <a onClick={() => deny(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      </div> */}
    </div>
  );
};

export default NotePeople;
