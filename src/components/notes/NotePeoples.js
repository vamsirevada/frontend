import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import NotePeople from './NotePeople';
import { getNotedPeople } from '../../actions/profile';

const NotePeoples = ({ profile: { peoplenote }, getNotedPeople }) => {
  useEffect(() => {
    getNotedPeople();
    //eslint-disable-next-line
  }, [getNotedPeople]);
  return (
    <Fragment>
      <div id='join-grp'>
        <h5>Noted People</h5>
        {peoplenote === null ? (
          <h3>Loading</h3>
        ) : (
          <Fragment>
            {peoplenote === null ? (
              <Fragment>
                <h4> You haven't noted People </h4>
              </Fragment>
            ) : (
              <Fragment>
                {peoplenote?.map((notepeople) => (
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

export default connect(mapStateToProps, { getNotedPeople })(NotePeoples);
