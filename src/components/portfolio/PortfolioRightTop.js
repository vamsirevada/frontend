import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioRightTop = ({
  type,
  profile: {
    user: { _id },
    buddies,
  },
  projects,
}) => {
  return (
    <div className='main-grid-top'>
      <div className='profile-info-box p-black'>
        <Link to={`/friends/${_id}`}>
          <p className='border-1'>
            <span className='f-1'>{buddies && buddies.length}</span>
            <span className='b-1'>
              <br /> Connections
            </span>
          </p>
        </Link>
        <Link to={`/projectlist/${_id}`}>
          <p>
            <span className='f-1'>{projects && projects.length}</span>
            <span classname='b-1'>
              <br /> Projects{' '}
            </span>
          </p>
        </Link>
      </div>

      <div className='mutual-frds'>
        {type !== 'edit' && (
          <div className='prof-heading-flex'>
            <Link to={'/addfiles'}>
              <h4>
                <span className='bg-1 addtoportfolio'>Add to Portfolio</span>
              </h4>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioRightTop;
