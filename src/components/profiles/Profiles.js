import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import UseFirestore from '../addportfolio/UseFireStore';
import Loader from '../layout/Loader';

const Profiles = ({ getProfiles, profile: { profile, profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const { docs } = UseFirestore('images');
  const newprofiles = profiles.filter(
    (x) => x?.user?._id !== profile?.user?._id
  );

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className='c-list'>
            <div className='c-list-container c-1'>
              <div className='search-flex search-flex-1'>
                <div>
                  <h2 className='name name-f'>Profiles</h2>
                </div>
                <div className='search search-1'>
                  <p>
                    {' '}
                    <span className='f-1'> {newprofiles.length}</span> Profiles
                    List
                  </p>
                </div>
              </div>
              <hr className='hori' />
              {newprofiles.length > 0 &&
                newprofiles.map((item) => (
                  <ProfileItem
                    key={item._id}
                    item={item}
                    displayAdd={true}
                    docs={docs}
                  />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
