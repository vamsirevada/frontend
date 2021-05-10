import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import { connect } from 'react-redux';
import Friend from './Friend';
import { getBuddies } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import UseFirestore from '../addportfolio/UseFireStore';

const Friends = ({ getBuddies, profile: { buddies } }) => {
  const { docs } = UseFirestore('images');

  const remove = async (profileid) => {
    try {
      await api.delete(`/profile/buddy/${profileid}`);
      setAlert('Successfully removed', 'success');
      getBuddies();
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
  };

  useEffect(() => {
    getBuddies();
  }, [getBuddies]);
  return (
    <div className='c-list'>
      <div className='c-list-container c-1'>
        <div className='search-flex search-flex-1'>
          <div>
            <h1 className='name name-f'>Friends</h1>
          </div>
        </div>
        <hr className='hori' />
        {buddies.empty === null ? (
          <h3>Loading </h3>
        ) : (
          <Fragment>
            {buddies.empty ? (
              <Fragment>
                <h2 className='none'> None </h2>
              </Fragment>
            ) : (
              <Fragment>
                {buddies.map((profile) => (
                  <Friend
                    key={profile._id}
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
  );
};

Friends.propTypes = {
  getBuddies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getBuddies })(Friends);
