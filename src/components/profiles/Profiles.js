import React, { Fragment, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { SearchContext } from '../../context/search.context';
import UseFirestore from '../addportfolio/UseFireStore';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const { search } = useContext(SearchContext);
  const { docs } = UseFirestore('images');

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='c-list'>
            <div className='c-list-container c-1'>
              <div className='search-flex search-flex-1'>
                <div>
                  <h2 className='name name-f'>Search</h2>
                </div>
                <div className='search search-1'>
                  <p>
                    {' '}
                    <span className='f-1'> {search.length}</span> people found
                  </p>
                </div>
                {/* <div className='search search-1'>
                  <p>
                    {' '}
                    <span className='f-1'> 104</span> people found
                  </p>
                </div> */}
              </div>
              <hr className='hori' />

              {search.length > 0
                ? search.map((profile) => (
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      displayAdd={true}
                      docs={docs}
                    />
                  ))
                : profiles.length > 0 &&
                  profiles.map((profile) => (
                    <ProfileItem
                      key={profile._id}
                      profile={profile}
                      displayAdd={true}
                      docs={docs}
                    />
                  ))}
            </div>
            {/* <!--c-list container ends here--> */}
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
