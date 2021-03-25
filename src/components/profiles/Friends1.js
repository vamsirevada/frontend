/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Friend from './Friend';
import Spinner from '../layout/Spinner';
import { getProfileById, getBuddiesById } from '../../actions/profile';
import { getProjects } from '../../actions/project';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UseFirestore from '../addportfolio/UseFireStore';

const Friends1 = ({
  getProfileById,
  getProjects,
  getBuddiesById,
  profile: { profile1, buddies, loading },
  project: { projects },
  match,
}) => {
  const { docs } = UseFirestore('images');

  const remove = async (profileid) => {
    try {
      await api.delete(`/profile/buddy/${profileid}`);
      setAlert('Successfully removed', 'success');
      getBuddiesById(match.params.id);
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
  };

  useEffect(() => {
    getProfileById(match.params.id);
    getProjects(match.params.id);
    getBuddiesById(match.params.id);
  }, [getProfileById, getProjects, getBuddiesById, match.params.id]);

  return loading && profile1 === null ? (
    <Spinner />
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
                  <span className='f-1'>{buddies && buddies.length}</span>
                  <br /> Connections
                </p>
              </Link>
              <Link to={`/projectlist/${profile1?.user?._id}`}>
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
              <h1 className='name name-f'>Friends</h1>
            </div>
          </div>
          <hr className='hori' />
          {buddies.empty === null ? (
            <Spinner />
          ) : (
            <Fragment>
              {buddies.empty ? (
                <Fragment>
                  <h2> You have no buddies </h2>
                </Fragment>
              ) : (
                <Fragment>
                  {buddies.map((profile) => (
                    <Friend
                      key={profile?._id}
                      profile={profile}
                      remove={remove}
                      displayAdd={true}
                      docs={docs}
                    />
                  ))}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Friends1.propTypes = {
  getBuddiesById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProfileById,
  getProjects,
  getBuddiesById,
})(Friends1);
