import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NotePost from './NotePost';
import { getNotedPost } from '../../actions/profile';

const NotePosts = ({ profile: { postnote }, getNotedPost }) => {
  useEffect(() => {
    getNotedPost();
    //eslint-disable-next-line
  }, [getNotedPost]);

  const [show, setShow] = useState(true);
  return (
    <Fragment>
      <div id='join-grp'>
        <div className='note-people-head'>
          <h5>Noted Posts</h5>
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
            {postnote === null ? (
              <Fragment>
                <h4> No Notes </h4>
              </Fragment>
            ) : (
              <Fragment>
                {postnote?.map((notepost) => (
                  <NotePost key={notepost._id} notepost={notepost} />
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

export default connect(mapStateToProps, { getNotedPost })(NotePosts);
