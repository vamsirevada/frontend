import React, { Fragment, useEffect } from 'react';
import ProjectTemp from './ProjectTemp';
import ExpTemp from './ExpTemp';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import { getProjects } from '../../actions/project';
import Loader from '../layout/Loader';

const ProjectList = ({
  match,
  getProfileById,
  getProjects,
  profile: { profile1, loading },
  project: { projects },
  auth: { user },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getProjects(match.params.id);
  }, [getProfileById, getProjects, match.params.id]);
  return loading && profile1 === null ? (
    <Loader />
  ) : (
    <Fragment>
      <div className='c-list'>
        <div className='c-list-container c-1'>
          <div className='c-list-head'>
            <div className='flex'>
              <div className='display-pic'>
                <img className='display-pic' src={profile1?.avatar} alt='' />
              </div>
              <h2 className='name name-f'>
                {profile1?.user?.fullName && profile1?.user?.fullName}
              </h2>
              <h2 className='name name-f'>
                {profile1?.user?.groupName && profile1?.user?.groupName}
              </h2>
            </div>
            <div>
              <p className='blue'>{profile1?.status && profile1?.status}</p>
            </div>
            <div>
              <p>
                {/* <img className='resize' src={loc} alt='' />{' '} */}
                <span className='gray'>
                  {' '}
                  {profile1?.location && profile1?.location}
                </span>
              </p>
            </div>

            <div className='profile-info-box'>
              <Link to={`/friends/${profile1?.user?._id}`}>
                <p className='border-1'>
                  <span className='f-1'>
                    {profile1?.buddies && profile1?.buddies.length}
                  </span>
                  <span className='b-1'>
                    <br /> Connections
                  </span>
                </p>
              </Link>
              <Link to={`/projectlist/${profile1?.user?._id}`}>
                <p>
                  <span className='f-1'>
                    {/* {profile?.experience && profile?.experience.length} */}
                    {projects.length > 0 || profile1?.experience.length > 0
                      ? projects.length + profile1?.experience.length
                      : '0'}
                  </span>
                  <span className='b-1'>
                    <br /> Projects
                  </span>
                </p>
              </Link>
            </div>
          </div>
          <div className='search-flex search-flex-1'>
            <div>
              <h1 className='name name-f'>Projects List</h1>
            </div>
          </div>
          <hr className='hori' />
          <div className='project'>
            <div className='project-container'>
              {projects.length > 0 && (
                <Fragment>
                  {projects.map((project) => (
                    <ProjectTemp
                      key={project._id}
                      project={project}
                      profile={profile1}
                      user={user}
                    />
                  ))}
                </Fragment>
              )}

              {profile1?.experience.length > 0 && (
                <Fragment>
                  {profile1?.experience.map((experience) => (
                    <ExpTemp
                      key={experience._id}
                      experience={experience}
                      profile={profile1}
                      user={user}
                    />
                  ))}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, getProjects })(
  ProjectList
);
