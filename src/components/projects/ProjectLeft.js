import React, { Fragment } from 'react';
import Spinner from '../layout/Spinner';
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
                {singleproject.projectname && singleproject.projectname}
              </h2>
            </div>

            <div className='about project'>
              <h3>Admin :</h3>
              <p>
                {' '}
                <span className='gray'> {singleproject.creator} </span>
              </p>
            </div>
            <hr className='hori project' />
            <div className='about'>
              <h3>Location :</h3>
              <p>
                {' '}
                <span className='gray'> {singleproject.location} </span>
              </p>
            </div>
            <hr className='hori project' />

            <div className='about'>
              <h3>Project description :</h3>
              <p>{singleproject.description}</p>
            </div>

            <hr className='hori project' />
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
