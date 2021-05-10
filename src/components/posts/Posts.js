import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, getBuddyPosts, getOwnPosts } from '../../actions/post';
import PostItem from './PostItem';
import WelcomePostItem from './WelcomePostItem';

const Posts = ({
  auth: { user },
  getPosts,
  getBuddyPosts,
  getOwnPosts,
  post: { posts, oposts, bposts },
}) => {
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
    getPosts();
    getBuddyPosts();
    getOwnPosts();
  }, [getPosts, getBuddyPosts, getOwnPosts]);

  const welcomeposts =
    posts && posts.filter((x) => x?.user?._id === '6076bfee8caddc177e448d94');

  const abc = welcomeposts.map((x) => x.user?._id === user?._id);

  const xyz = abc.find((num) => num === true);

  return (
    <>
      <div className='sort-feed'>
        <div className='sort-post'>
          <button
            onClick={onChange2}
            className={
              all
                ? 'right-s left-top left-right-bottom'
                : 'left-s left-top left-right-bottom'
            }
          >
            All Posts
          </button>
          <button
            onClick={onChange1}
            className={
              own
                ? 'right-s right-top right-left-bottom'
                : 'left-s right-top right-left-bottom'
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
          {!xyz && (
            <Fragment>
              {welcomeposts.map((post) => (
                <WelcomePostItem key={post._id} post={post} />
              ))}
            </Fragment>
          )}

          <Fragment>
            {bposts.map((post) => (
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
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  getBuddyPosts,
  getOwnPosts,
})(Posts);
