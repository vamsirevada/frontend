import React, { Fragment, useEffect } from 'react';
import ProjectTemp from './ProjectTemp';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import { getProjects } from '../../actions/project';
// import briefcase from '../../images/icons/nounBriefcase.svg';

const ProjectList = ({
  match,
  getProfileById,
  getProjects,
  profile: { profile, loading },
  project: { projects },
  auth: { user },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getProjects(match.params.id);
  }, [getProfileById, getProjects, match.params.id]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='c-list'>
        <div className='c-list-container c-1'>
          <div className='c-list-head'>
            <div className='flex'>
              <div className='display-pic'>
                <img className='display-pic' src={profile.avatar} alt='' />
              </div>
              <h2 className='name name-f'>
                {profile?.user.fullName && profile?.user.fullName}
              </h2>
              <h2 className='name name-f'>
                {profile?.user.groupName && profile?.user.groupName}
              </h2>
            </div>
            <div>
              <p className='blue'>{profile?.status && profile?.status}</p>
            </div>
            <div>
              <p>
                {/* <img className='resize' src={loc} alt='' />{' '} */}
                <span className='gray'>
                  {' '}
                  {profile?.location && profile?.location}
                </span>
              </p>
            </div>

            <div className='profile-info-box'>
              <Link to={`/friends/${profile?.user._id}`}>
                <p className='border-1'>
                  <span className='f-1'>
                    {profile?.buddies && profile?.buddies.length}
                  </span>
                  <br /> Connections
                </p>
              </Link>
              <Link to={`/projectlist/${profile?.user._id}`}>
                <p>
                  <span className='f-1'>
                    {/* {profile?.experience && profile?.experience.length} */}
                    {projects && projects.length}
                  </span>
                  <br /> Projects{' '}
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
              {projects.length > 0 ? (
                <Fragment>
                  {projects.length > 0 && (
                    <div>
                      {projects.length > 0 ? (
                        <Fragment>
                          {projects.map((project) => (
                            <ProjectTemp
                              key={project._id}
                              project={project}
                              profile={profile}
                              user={user}
                            />
                          ))}
                        </Fragment>
                      ) : (
                        <h4> No Projects</h4>
                      )}
                    </div>
                  )}
                </Fragment>
              ) : (
                <p style={{ textAlign: 'center' }}>None </p>
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
