import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/dummyimage.jpg';

const PortfolioRightBuddies = ({
  item: { _id, avatar, user, status, location, buddies },
}) => {
  return (
    <div className='connect-left'>
      <div className='connect-left-top'>
        <div
          style={{
            background: `url(${
              avatar ? avatar : logo
            }) no-repeat center center/cover`,
          }}
          className='display-pic'
        ></div>
        <div className='flex-c'>
          <p>
            <span className='bold'>
              {user?.fullName && user?.fullName}
              {user?.groupName && user?.groupName}
            </span>{' '}
            {/* <br /> */}
            {/* <span className='second-bold'>
          {user?.userName && user?.userName}
        </span>{' '} */}
            <br />
            <span className='second-bold'>{status}</span> <br />
            <span className='second-bold'>{location}</span>
            <br />
            <span className='third-bold'>
              Connections : <span className='f-1'>{buddies.length}</span>
            </span>
          </p>
        </div>
      </div>

      <div className='connect-left-bottom'>
        <div className='btn-b'>
          {' '}
          <Link to={`/portfolio/${user?._id}`} className='btn-blue'>
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PortfolioRightBuddies;
