import React from 'react';
import { Link } from 'react-router-dom';
import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import nounPlus from '../../images/noun_Plus_2310779.svg';

const FriendRequest = ({ profile, user, accept, deny }) => {
  const { _id, status } = profile;
  const { fullName, groupName } = user;
  return (
    <div className='join-grp-flex'>
      <div className='display-pic-1'></div>
      <div className='flex-right'>
        <Link to={`/portfolio/${user._id}`} className='bold bold-1'>
          <p>{fullName && fullName}</p>
          <p>{groupName && groupName}</p>
        </Link>
        {/* <p className='third-bold'>{userName}</p> */}
        <p className='third-bold'>{status}</p>
      </div>

      <div className='btn-bf'>
        {' '}
        <a href='#!' onClick={() => accept(_id)}>
          <img src={add} alt='' />
        </a>
      </div>

      <div className='btn-gf'>
        {' '}
        <a href='#!' onClick={() => deny(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  );
};

export default FriendRequest;
