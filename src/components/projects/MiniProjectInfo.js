/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from '../../images/dummyimage.jpg';

const ProjectAdd = ({ singleproject }) => {
  return (
    <>
      <div className='main-grid-top project miniProjectInfo'>
        <div className='profile-project-box'>
          <div className='left-heading heading-1 p'>
            <img
              className='display-pic'
              src={singleproject?.avatar ? singleproject?.avatar : logo}
              alt=''
            />
            <h4 className='name name-f'>
              {singleproject.projectname && singleproject.projectname}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectAdd;
