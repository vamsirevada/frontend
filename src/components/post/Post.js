import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <Loader />
  ) : (
    <Fragment>
      <div id='single-post'>
        <div className='singlepost-container'>
          <div className='left'>
            <div>
              <Link to='/feed' className='btn-yellow'>
                Back
              </Link>
            </div>
          </div>
          <div className='center'>
            <div id='feed-main'>
              <div className='feed-main-container'>
                <PostItem params={true} key={post._id} post={post} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
