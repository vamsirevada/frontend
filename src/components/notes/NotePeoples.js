import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NotePeople from './NotePeople';
import { getNotedPeople } from '../../actions/profile';

const NotePeoples = ({ profile: { peoplenote }, getNotedPeople }) => {
  useEffect(() => {
    getNotedPeople();
    //eslint-disable-next-line
  }, [getNotedPeople]);

  const [show, setShow] = useState(true);
  return (
    <Fragment>
      <div id='join-grp'>
        <div className='note-people-head'>
          <h5>Noted People</h5>
          <div className='note-head-btn'>
            <a href='#!' onClick={() => setShow(false)}>
              Hide
            </a>
            <span className='note-line'>|</span>
            <a href='#!' onClick={() => setShow(true)}>
              Show
            </a>
          </div>
        </div>

        {show && (
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
