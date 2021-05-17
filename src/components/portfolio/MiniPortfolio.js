import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../actions/project';
import Spinner from '../layout/Spinner';
import gps from '../../images/icons/noun_Location_3139654 copy.svg';
import logo from '../../images/dummyimage.jpg';
import { connect } from 'react-redux';

const MiniPortfolio = ({
  auth: { user },
  profile: { profile, loading },
  getProjects,
  project: { projects },
}) => {
  useEffect(() => {
    getProjects(user?._id);
  }, [getProjects, user?._id]);

  return (
    <>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <div className='left-container'>
          <div className='left-heading heading-1'>
            <img
              className='display-pic'
              src={profile?.avatar ? profile?.avatar : logo}
              alt=''
            />
            <h2 className='name name-f'>
              {profile?.user?.fullName && profile?.user?.fullName}
              {profile?.user?.groupName && profile?.user?.groupName}
            </h2>
            <p> {profile?.user?.userName}</p>
            <p className='status'> {profile?.status}</p>
            <p>
              <img className='resize' src={gps} alt='' />{' '}
              <span className='gray'> {profile?.location} </span>
            </p>
          </div>
          <hr className='hori' />

          <div className='about'>
            <h3>About :</h3>
            <p>{profile?.bio}</p>
          </div>

          <hr className='hori' />

          <div className='connect-info'>
            <div>
              <Link to={`/friends/${profile?.user?._id}`}>
                <p>
                  <span className='f-1'>{profile?.buddies.length}</span>
                  <br />
                  <span className='hover-bottom'>Connections</span>
                </p>
              </Link>
            </div>
            <div>
              <Link to={`/projectlist/${profile?.user?._id}`}>
                <p>
                  <span className='f-1'>
                    {projects.length > 0 || profile?.experience.length > 0
                      ? projects.length + profile?.experience.length
                      : '0'}
                  </span>
                  <br />
                  <span className='hover-bottom'>Projects</span>
                </p>
              </Link>
            </div>
          </div>
          <hr className='hori' />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(MiniPortfolio);
