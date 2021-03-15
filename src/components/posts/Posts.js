import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBuddyPosts, getOwnPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ getBuddyPosts, getOwnPosts, post: { posts, oposts } }) => {
  const [own, setOwn] = useState(false);
  const [all, setAll] = useState(true);

  const onChange1 = () => {
    setOwn(true);
    setAll(false);
  };

  const onChange2 = () => {
    setAll(true);
    setOwn(false);
  };

  useEffect(() => {
    getBuddyPosts();
    getOwnPosts();
  }, [getBuddyPosts, getOwnPosts]);

  return (
    <>
      <div className='sort-feed'>
        <div className='sort-post'>
          <button
            onClick={onChange2}
            className={
              all
                ? 'right left-top left-right-bottom'
                : 'left left-top left-right-bottom'
            }
          >
            All Posts
          </button>
          <button
            onClick={onChange1}
            className={
              own
                ? 'right right-top right-left-bottom'
                : 'left right-top right-left-bottom'
            }
          >
            Your Posts
          </button>
        </div>
      </div>

      {own ? (
        <div className='posts'>
          <Fragment>
            {oposts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </Fragment>
        </div>
      ) : (
        <div className='posts'>
          <Fragment>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </Fragment>
        </div>
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
