import React, { Fragment, useEffect } from 'react';
import Project from './Project';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import Loader from '../layout/Loader';

const Projects = ({ match, getProfileById, profile: { profile, loading } }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return loading && profile === null ? (
    <Loader />
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
                  <span className='b-1'>
                    <br /> Connections
                  </span>
                </p>
              </Link>
              <Link to={`/projects/${profile?.user._id}`}>
                <p>
                  <span className='f-1'>
                    {profile?.experience && profile?.experience.length}
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
              <h1 className='name name-f'>Projects</h1>
            </div>
          </div>
          <hr className='hori' />
          <div className='project'>
            <div className='project-container'>
              {profile?.experience.length > 0 ? (
                <Fragment>
                  {profile?.experience.length > 0 && (
                    <div>
                      {profile?.experience.length > 0 ? (
                        <Fragment>
                          {profile?.experience.map((experience) => (
                            <Project
                              key={experience._id}
                              experience={experience}
                            />
                          ))}
                        </Fragment>
                      ) : (
                        <h4> No experience credientials</h4>
                      )}
                    </div>
                  )}
                </Fragment>
              ) : (
                <h3 style={{ textAlign: 'center' }}>None </h3>
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
});

export default connect(mapStateToProps, { getProfileById })(Projects);
