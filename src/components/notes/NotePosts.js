import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import NotePost from './NotePost';
import { getNotedPost } from '../../actions/profile';

const NotePosts = ({ profile: { postnote }, getNotedPost }) => {
  useEffect(() => {
    getNotedPost();
    //eslint-disable-next-line
  }, [getNotedPost]);
  return (
    <Fragment>
      <div id='join-grp'>
        <h5>Noted Posts</h5>
        {postnote === null ? (
          <h3>Loading</h3>
        ) : (
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
