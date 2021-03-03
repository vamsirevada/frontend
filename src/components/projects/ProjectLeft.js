import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
// import loc from '../../images/icons/noun_Location_3139654.svg';
import logo from '../../images/dummyimage.jpg';

const ProjectLeft = ({ singleproject, loading }) => {
  return loading && singleproject === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {singleproject !== null ? (
        <Fragment>
          <div className='left-container'>
            <div className='left-heading heading-1 p'>
              <img
                className='display-pic'
                src={singleproject?.avatar ? singleproject?.avatar : logo}
                alt=''
              />
              <h2 className='name name-f'>
                {/* {profile.user.fullName && profile.user.fullName}
                {profile.user.groupName && profile.user.groupName} */}
                {singleproject.projectname && singleproject.projectname}
              </h2>
              {/* <p> {profile.user.userName}</p> */}
              {/* <p> {profile.status}</p> */}
              {/* <p>
                <img className='resize' src={loc} alt='' />{' '}
                <span className='gray'> {project.location} </span>
              </p> */}
            </div>

            <div className='about'>
              <h3>Admin :</h3>
              <p>
                {' '}
                <span className='gray'> {singleproject.creator} </span>
              </p>
            </div>
            <hr className='hori' />
            <div className='about'>
              <h3>Location :</h3>
              <p>
                {' '}
                <span className='gray'> {singleproject.location} </span>
              </p>
            </div>
            <hr className='hori' />

            <div className='about'>
              <h3>Project description :</h3>
              <p>{singleproject.description}</p>
            </div>

            <hr className='hori' />

            {/* <div className='connect-info'>
              <div>
                <Link to='/friends'>
                  <p className='border-1'>
                    <span className='f-1'>{profile.buddies.length}</span>
                    <br /> Connections
                  </p>
                </Link>
              </div>
              <div>
                <Link to={`/projects/${profile.user._id}`}>
                  <p>
                    <span className='f-1'>
                      {profile.experience && profile.experience.length}
                    </span>
                    <br /> Projects Completed{' '}
                  </p>
                </Link>
              </div>
            </div> */}
            <hr className='hori' />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Spinner />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProjectLeft;
