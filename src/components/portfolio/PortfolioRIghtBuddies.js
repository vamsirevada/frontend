import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/dummyimage.jpg';
import UseFireStore from '../addportfolio/UseFireStore';
import { motion } from 'framer-motion';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const PortfolioRightBuddies = ({
  item: { _id, avatar, user, status, location, buddies },
}) => {
  const { docs } = UseFireStore('images');

  const documents =
    docs &&
    docs.filter(
      (doc) =>
        doc?.userId === user?._id &&
        doc?.type !== 'Audio' &&
        doc?.type !== 'Blog'
    );

  return (
    <>
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
      <div className='connect-right'>
        {documents &&
          documents.slice(0, 2).map((x) => (
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
        {documents.length > 0 && (
          <Link to={`/portfolio/${user?._id}`}>
            <ArrowForwardIosIcon />
          </Link>
        )}
      </div>
    </>
  );
};

export default PortfolioRightBuddies;
