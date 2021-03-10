import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import plane from '../../images/noun_paper plane_367806 copy.svg';
import { projectFirestore } from '../../firebase/config';

const CommentForm = ({ auth, user, postId, addComment, comments }) => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(postId, { text });
    projectFirestore.collection('notifications').add({
      sender: auth?.user?._id,
      senderName: auth?.user?.userName,
      avatar: auth?.user?.avatar,
      receiver: user?._id,
      uid: postId,
      comment: text,
      type: 'comment',
      read: false,
      createdAt: new Date(),
    });
    setText('');
  };

  return (
    <Fragment>
      <form className='comment-box' onSubmit={onSubmit}>
        <div>
          <input
            className='cmt-1'
            type='text'
            name='comment'
            placeholder='Write a Comment...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type='submit' className='btn-blue'>
          <img src={plane} alt='' />
        </button>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  comments: state.post.post.comments,
});

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addComment })(CommentForm);
