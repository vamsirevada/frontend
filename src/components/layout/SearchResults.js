/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import CRequest from '../profiles/CRequest';
import logo from '../../images/dummyimage.jpg';
import mail from '../../images/mail.svg';
import Tooltip from '@material-ui/core/Tooltip';

const SearchResults = ({ res, inputHandler, onClickHandler }) => {
  const onStartChatHandler = () => {
    onClickHandler(res);
  };

  return (
    <div className='buddy-grid'>
      <div className='connect-left'>
        <div className='connect-left-top'>
          <div
            style={{
              background: `url(${
                res?.avatar ? res?.avatar : logo
              }) no-repeat center center/cover`,
            }}
            className='display-pic'
          ></div>
          <div className='flex-c'>
            <p>
              <Link
                to={`/portfolio/${res?.user?._id}`}
                onClick={inputHandler}
                className='bold'
              >
                {res?.user?.fullName && res?.user?.fullName}
                {res?.user?.groupName && res?.user?.groupName}
              </Link>{' '}
              <br />
              <span className='second-bold'></span>{' '}
              <span className='second-bold'>{res?.status}</span> <br />
              <span className='second-bold'>{res?.location}</span>
              <br />
              <span className='third-bold'>
                Connections : <span className='f-1'>{res?.buddies.length}</span>
              </span>
            </p>
          </div>
        </div>
        <div className='connect-left-bottom'>
          <div className='btn-b'>
            {' '}
            <Link
              to={`/portfolio/${res?.user?._id}`}
              onClick={inputHandler}
              className='btn-blue'
            >
              Portfolio
            </Link>
          </div>
          <CRequest item={res} />
          <div className='btn-g'>
            <Tooltip title='Chat' placement='top'>
              <a onClick={onStartChatHandler} className='btn-blue g-1'>
                <img className='g-1' src={mail} alt='' />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
