import React from 'react';
import Moment from 'react-moment';

const Project = ({
  experience: { project, description, title, company, location, from, to },
}) => {
  return (
    <div>
      <div>
        <h3>{project}</h3>
      </div>
      <div className='projectitem'>
        <div className='p-container'>
          <div className='project-head'>
            <p className='list list-1'>
              Project Status:{' '}
              <span className='list-4'>
                {' '}
                {to === null ? 'Active' : 'Completed'}
              </span>
            </p>

            <p className='list list-2'>
              Timeline:{' '}
              <span className='list-4'>
                {' '}
                <Moment format='MMM YYYY'>{from}</Moment>-{' '}
                {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
              </span>
            </p>
          </div>
          <div className='project-body'>
            <div className='project-body-container'>
              <div className='project-body-1'>
                <p className='list'>
                  Company : <span className='list-4'>{company}</span>
                </p>
                <p className='list'>
                  Designation : <span className='list-4'>{title}</span>
                </p>
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
      </div>
    </div>
  );
};

export default Project;
