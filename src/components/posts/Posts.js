import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuddyPosts, getOwnPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({
  profile: { profile },
  getBuddyPosts,
  getOwnPosts,
  id,
  post: { posts, oposts, loading },
}) => {
  console.log(id);
  const [own, setOwn] = useState(false);

  useEffect(() => {
    getBuddyPosts(id);
    getOwnPosts(id);
  }, [getBuddyPosts, getOwnPosts, id]);

  return (
    <>
      <button
        onClick={() => {
          setOwn(true);
        }}
      >
        Sort
      </button>
      {own ? (
        <Fragment>
          {oposts.map((post) => (
            <PostItem profile={profile} key={post._id} post={post} />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {posts.map((post) => (
            <PostItem profile={profile} key={post._id} post={post} />
          ))}
        </Fragment>
      )}
    </>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, { getBuddyPosts, getOwnPosts })(Posts);
