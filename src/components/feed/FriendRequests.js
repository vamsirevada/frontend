import React, { useState, useEffect, Fragment } from 'react';
import api from '../../utils/api';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getCurrentProfile } from '../../actions/profile';
import FriendRequest from './FriendRequest';

const FriendRequests = ({ setAlert, getCurrentProfile }) => {
  const [reqProfiles, setReqProfiles] = useState({
    profiles: null,
    empty: null,
  });
  const getRequests = async () => {
    try {
      const res = await api.get(`/profile/buddyRequests`);
      let empty = true;
      if (res.data.length > 0) {
        empty = false;
      }
      setReqProfiles({
        profiles: res.data,
        empty,
      });
    } catch (err) {
      return (
        <div className='card-md buddy-card'>
          <h2> Problem Loading Buddy Requests </h2>
        </div>
      );
    }
  };
  const accept = async (profileid) => {
    try {
      const res = await api.put(`/profile/buddy/${profileid}`);

      setAlert('Buddy added', 'success');

      let empty = true;
      if (res.data.length > 0) {
        //eslint-disable-next-line
        empty = false;
      }
      // setRefreshBuddies(true);
      getCurrentProfile();

      getRequests();
    } catch (err) {
      if (err.response.data !== undefined) {
        setAlert(err.response.data.msg, 'danger');
      }
    }
  };
  const deny = async (profileid) => {
    try {
      await api.delete(`/profile/request/${profileid}`);

      setAlert('Request declined', 'success');
      getRequests();
      getCurrentProfile();
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <Fragment>
      <div id='join-grp'>
        <h5>Friend Requests</h5>
        {reqProfiles.empty === null ? (
          <h3>Loading</h3>
        ) : (
          <Fragment>
            {reqProfiles.empty ? (
              <Fragment>
                <h4> You have no requests </h4>
              </Fragment>
            ) : (
              <Fragment>
                {/* <h1 className='requests-title'>Requests</h1> */}
                {reqProfiles.profiles.map((profile) => (
                  <FriendRequest
                    key={profile._id}
                    profile={profile}
                    user={profile.user}
                    accept={accept}
                    deny={deny}
                  />
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default connect(null, { setAlert, getCurrentProfile })(FriendRequests);
