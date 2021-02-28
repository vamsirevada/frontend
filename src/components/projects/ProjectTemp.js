import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProjectTemp = ({
  // experience: { project, description, title, company, location, from, to },
  project: {
    _id,
    projectname,
    location,
    description,
    user: { userName },
    date,
  },
}) => {
  return (
    <div>
      <div>{/* <h3>{projectname}</h3> */}</div>
      <div className='projectitem'>
        <Link to={`/project/${_id}`}>
          <div className='p-container'>
            <div className='project-head'>
              <p className='list list-1'>
                Project Name:{' '}
                <span className='list-4'>
                  {' '}
                  <h3>{projectname}</h3>
                </span>
              </p>

              <p className='list list-2'>
                Timeline:{' '}
                <span className='list-4'>
                  {' '}
                  <Moment format='DD MMM YYYY'>{date}</Moment>-{' '}
                  {/* {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>} */}
                </span>
              </p>
              <p className='list list-1'>
                Project Status:{' '}
                <span className='list-4'>
                  {' '}
                  {/* {to === null ? 'Active' : 'Completed'} */}
                </span>
              </p>
            </div>
            <div className='project-body'>
              <div className='project-body-container'>
                <div className='project-body-1'>
                  <p className='list'>
                    Creator : <span className='list-4'>{userName}</span>
                  </p>
                  {/* <p className='list'>
                  Designation : <span className='list-4'>{title}</span>
                </p> */}
                  <p className='list'>
                    Location: <span className='list-4'>{location}</span>
                  </p>
                </div>

                <div>
                  <p className='list-5'>
                    Description: <br />
                    <span className='list-4'>{description}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProjectTemp;
