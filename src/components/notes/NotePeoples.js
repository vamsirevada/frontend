import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { getCurrentProfile } from '../../actions/profile';
import NotePeople from './NotePeople';

const NotePeoples = ({ setAlert, getCurrentProfile, profile }) => {
  console.log(profile);

  return (
    <Fragment>
      <div id='join-grp'>
        <h5>Noted People</h5>
        {profile?.peoplenote === null ? (
          <h3>Loading</h3>
        ) : (
          <Fragment>
            {profile?.peoplenote === null ? (
              <Fragment>
                <h4> You haven't noted People </h4>
              </Fragment>
            ) : (
              <Fragment>
                {profile?.peoplenote?.map((notepeople) => (
                  <NotePeople key={notepeople._id} notepeople={notepeople} />
                ))}
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { setAlert })(NotePeoples);
