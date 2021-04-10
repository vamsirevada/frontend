import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ExpTemp = ({
  // experience: { project, description, title, company, location, from, to },
  profile,
  user,
  experience: { _id, project, title, company, location, description, from, to },
}) => {
  return (
    <div>
      <div className='projectitem'>
        <div className='p-container'>
          <div className='project-head'>
            <p className='list list-1'>
              Project Name: <span className='list-4'> {' ' + project}</span>
            </p>

            {/* <p className='list list-2'>
              Timeline:{' '}
              <span className='list-4'>
                {' '}
                <Moment format='DD MMM YYYY'>{date}</Moment>-{' '}
                {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
              </span>
            </p> */}
            {/* <p className='list list-1'>
                Project Status:{' '}
                <span className='list-4'>
                  {' '}
                  {to === null ? 'Active' : 'Completed'}
                </span>
              </p>  */}
          </div>
          <div className='project-body'>
            <div className='project-body-container'>
              <div className='project-body-1'>
                <p className='list'>
                  Company : <span className='list-4'>{company}</span>
                </p>

                <p className='list'>
                  Designation : <span className='list-4'> {title}</span>
                </p>

                <p className='list'>
                  Location: <span className='list-4'>{location}</span>
                </p>
                <p className='list'>
                  Started on:{' '}
                  <span className='list-4'>
                    {' '}
                    <Moment format='DD MMM YYYY'>{from}</Moment>
                    {' - '}
                    {to === null ? (
                      'Now'
                    ) : (
                      <Moment format='MMM YYYY'>{to}</Moment>
                    )}
                  </span>
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

export default ExpTemp;
