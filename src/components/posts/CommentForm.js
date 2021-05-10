import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import plane from '../../images/noun_paper plane_367806 copy.svg';
import { projectFirestore } from '../../firebase/config';

const CommentForm = ({ auth, user, postId, addComment }) => {
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
      <div className='comment-box'>
        <div>
          <img className='comment-pic' src={auth?.user?.avatar} alt='' />
        </div>
        <div className='cmt-1'>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              name='comment'
              placeholder='Write a Comment...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type='submit' className='btn-blue'>
              <img src={plane} alt='' />
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
