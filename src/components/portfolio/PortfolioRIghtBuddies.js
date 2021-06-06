/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/dummyimage.jpg';
import mail from '../../images/mail.svg';
import UseFireStore from '../addportfolio/UseFireStore';
import { motion } from 'framer-motion';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Tooltip from '@material-ui/core/Tooltip';
import CRequest from '../profiles/CRequest';
import PersonalMessage from '../chat/PersonalMessage';

const PortfolioRightBuddies = ({ item }) => {
  const [start, setStart] = useState(false);
  const { docs } = UseFireStore('images');

  const chatClose = () => {
    setStart(false);
  };

  const documents =
    docs &&
    docs.filter(
      (doc) =>
        doc?.userId === item?.user?._id &&
        doc?.type !== 'Audio' &&
        doc?.type !== 'Blog'
    );

  return (
    <>
      <div className='connect-container'>
        <div className='connect-main'>
          <div className='connect-left'>
            <div className='connect-left-top'>
              <div
                style={{
                  background: `url(${
                    item?.avatar ? item?.avatar : logo
                  }) no-repeat center center/cover`,
                }}
                className='display-pic'
              ></div>
              <div className='flex-c'>
                <p>
                  <span className='bold'>
                    {item?.user?.fullName && item?.user?.fullName}
                    {item?.user?.groupName && item?.user?.groupName}
                  </span>{' '}
                  <br />
                  <span className='second-bold'>{item?.status}</span> <br />
                  <span className='second-bold'>{item?.location}</span>
                  <br />
                  <span className='third-bold'>
                    Connections :{' '}
                    <span className='f-1'>{item?.buddies.length}</span>
                  </span>
                </p>
              </div>
            </div>

            <div className='connect-left-bottom'>
              <div className='btn-b'>
                {' '}
                <Link to={`/portfolio/${item?.user?._id}`} className='btn-blue'>
                  View Portfolio
                </Link>
              </div>
              <CRequest item={item} />
              <div className='btn-g'>
                <Tooltip title='Chat' placement='top'>
                  <a
                    onClick={() => {
                      setStart(true);
                    }}
                    className='btn-blue g-1'
                  >
                    <img src={mail} alt='' />
                  </a>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className='connect-right'>
            {documents &&
              documents.slice(0, 3).map((x) => (
                <div key={x.id} className='pic-1'>
                  {x.type === 'Video' ? (
                    <motion.video
                      controls
                      src={x.url}
                      alt='uploaded pic'
                      initial={{
                        opacity: 0,
                        height: '100%',
                        width: '100%',
                      }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    />
                  ) : (
                    <motion.img src={x.url} height='100%' width='100%' alt='' />
                  )}
                </div>
              ))}
          </div>
        </div>
        <div>
          {documents.length > 0 && (
            <Link to={`/portfolio/${item?.user?._id}`}>
              <Tooltip title='View Portfolio' placement='top'>
                <ArrowForwardIosIcon />
              </Tooltip>
            </Link>
          )}
        </div>
      </div>
      {start && <PersonalMessage member={item} chatClose={chatClose} />}
    </>
  );
};

export default PortfolioRightBuddies;
