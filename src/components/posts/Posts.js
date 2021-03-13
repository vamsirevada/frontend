import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuddyPosts, getOwnPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ getBuddyPosts, getOwnPosts, post: { posts, oposts } }) => {
  const [own, setOwn] = useState(false);

  useEffect(() => {
    getBuddyPosts();
    getOwnPosts();
  }, [getBuddyPosts, getOwnPosts]);

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
            <PostItem key={post._id} post={post} />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </Fragment>
      )}
    </>
  );
};

Posts.propTypes = {
  getBuddyPosts: PropTypes.func.isRequired,
  getOwnPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getBuddyPosts, getOwnPosts })(Posts);
