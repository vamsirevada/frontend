import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuddyPosts, getOwnPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const Posts = ({
  profile: { profile },
  auth,
  getBuddyPosts,
  getOwnPosts,
  id,
  post: { posts, oposts, loading },
}) => {
  useEffect(() => {
    getBuddyPosts(id);
    getOwnPosts(id);
  }, [getBuddyPosts, getOwnPosts, id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* {oposts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))} */}
      {posts.map((post) => (
        <PostItem profile={profile} key={post._id} post={post} />
      ))}
    </Fragment>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBuddyPosts, getOwnPosts })(Posts);
