import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import plane from '../../images/noun_paper plane_367806 copy.svg';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <Fragment>
      <form
        className='comment-box'
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
