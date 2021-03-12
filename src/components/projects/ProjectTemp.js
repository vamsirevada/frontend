import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProjectTemp = ({
  // experience: { project, description, title, company, location, from, to },
  profile,
  user,
  project: { _id, projectname, location, description, creator, date, members },
}) => {
  const member = members.filter((e) => e.user === profile?.user?._id);

  const isCommonMember = members.filter((e) => e.user === user?._id);
  return (
    <div>
      <div>{/* <h3>{projectname}</h3> */}</div>
      <div className='projectitem'>
        <div className='p-container'>
          <div className='project-head'>
            <p className='list list-1'>
              Project Name: <span className='list-4'> {' ' + projectname}</span>
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
            {isCommonMember.length !== 0 && (
              <Link to={`/project/${_id}`}>
                <button className='list list-1 b'>
                  <span className='list-4'> View Project</span>
                </button>
              </Link>
            )}
          </div>
          <div className='project-body'>
            <div className='project-body-container'>
              <div className='project-body-1'>
                <p className='list'>
                  Created By : <span className='list-4'>{creator}</span>
                </p>

                <p className='list'>
                  Designation :{' '}
                  <span className='list-4'> {member && member[0]?.status}</span>
                </p>

                <p className='list'>
                  Location: <span className='list-4'>{location}</span>
                </p>
                <p className='list'>
                  Started on:{' '}
                  <span className='list-4'>
                    {' '}
                    <Moment format='DD MMM YYYY'>{date}</Moment>{' '}
                    {/* {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>} */}
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

export default ProjectTemp;
