import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getCurrentProfile } from '../../actions/profile';
import NotePeople from './NotePeople';

const NotePeoples = ({ setAlert, profile }) => {
  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);
  // const { peoplenote } = profile;
  // console.log(peoplenote);

  // const [reqProfiles, setReqProfiles] = useState({
  //   profiles: null,
  //   empty: null,
  // });
  // const getRequests = async () => {
  //   try {
  //     // const res = await axios.get(`api/profile/notedpeople`);

  //     const res = profile.peoplenote;

  //     console.log(res);

  //     let empty = true;
  //     if (res.data.length > 0) {
  //       empty = false;
  //     }

  //     setReqProfiles({
  //       profiles: res.data,
  //       empty,
  //     });
  //   } catch (err) {
  //     return (
  //       <div className='card-md buddy-card'>
  //         <h2> Problem Loading Noted People</h2>
  //       </div>
  //     );
  //   }
  // };

  // const accept = async (profileid) => {
  //   try {
  //     const res = await axios.put(`api/profile/buddy/${profileid}`);

  //     setAlert('Buddy added', 'success');

  //     let empty = true;
  //     if (res.data.length > 0) {
  //       //eslint-disable-next-line
  //       empty = false;
  //     }

  //     // setRefreshBuddies(true);
  //     getCurrentProfile();

  //     getRequests();
  //   } catch (err) {
  //     if (err.response.data !== undefined) {
  //       setAlert(err.response.data.msg, 'danger');
  //     }
  //   }
  // };
  // const deny = async (profileid) => {
  //   try {
  //     await axios.delete(`api/profile/request/${profileid}`);

  //     setAlert('Request declined', 'success');
  //     getRequests();
  //     getCurrentProfile();
  //   } catch (err) {
  //     setAlert(err.response.data.msg, 'danger');
  //   }
  // };

  // useEffect(() => {
  //   getRequests();
  // }, []);

  // console.log(reqProfiles.profiles);
  // const { peoplenote } = profile;
  // const xyz = peoplenote;
  // const output = xyz.map((xyz) => xyz.remark);
  // console.log(output);
  return (
    <Fragment>
      <div id='join-grp'>
        <h5>Noted People</h5>
        {
          // reqProfiles.empty === null ? (
          //   <h3>Loading</h3>
          profile?.peoplenote === null ? (
            <h3>Loading</h3>
          ) : (
            <Fragment>
              {
                // reqProfiles.empty ? (
                profile?.peoplenote === null ? (
                  <Fragment>
                    <h4> You haven't noted People </h4>
                  </Fragment>
                ) : (
                  <Fragment>
                    {/* <h1 className='requests-title'>Requests</h1> */}
                    {profile?.peoplenote?.map(
                      (notepeople) => (
                        <NotePeople
                          key={notepeople._id}
                          notepeople={notepeople}
                          // user={profile.user}
                          // remark={output}
                          // accept={accept}
                          // deny={deny}
                        />
                      )
                      // console.log('123')
                    )}
                    {/* {reqProfiles.profiles.map((profile) => (
                  <NotePeople
                    key={profile._id}
                    profile={profile}
                    user={profile.user}
                    // remark={output}
                    // accept={accept}
                    // deny={deny}
                  />
                ))} */}
                  </Fragment>
                )
              }
            </Fragment>
          )
        }
      </div>
    </Fragment>
  );
};

export default connect(null, { setAlert })(NotePeoples);
