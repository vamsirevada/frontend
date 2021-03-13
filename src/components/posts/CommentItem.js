import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import { deleteComment } from '../../actions/post';
import logo from '../../images/dummyimage.jpg';
import { projectFirestore } from '../../firebase/config';

const CommentItem = ({
  postId,
  comment: { _id, text, fullName, groupName, user, date, avatar },
  auth,
  deleteComment,
}) => {
  const removeComment = () => {
    deleteComment(postId, _id);
    projectFirestore
      .collection('notifications')
      .where('uid', '==', postId)
      .where('type', '==', 'comment')
      .get()
      .then((i) => {
        i.forEach((d) => {
          d.ref.delete();
        });
      });
  };

  return (
    // <div className='post-some-grid c-1'>
    //   <div className='display-pic'>
    //     <img className='display-pic' src={avatar ? avatar : logo} alt='' />
    //   </div>
    //   <div className='postForm'>
    //     <div>
    //       <span className='d-1'>
    //         {firstName} {lastName}
    //       </span>{' '}
    //       {', '}
    //       <span className='d-2'>
    //         <Moment format='DD MMM YYYY, hh:mm a'>{date}</Moment>
    //       </span>
    //     </div>
    //     <div className='d-3'>
    //       <p>{text}</p>
    //     </div>

    //     <div>
    //       {!auth.loading && user === auth.user._id && (
    //         <button type='button' className='btn-blue' onClick={removeComment}>
    //           <img src={nounPlus} alt='' />
    //         </button>
    //       )}
    //     </div>
    //   </div>
    //   <hr className='Hori' />
    // </div>
    <div className='comment-box'>
      <div>
        <img className='comment-pic' src={avatar ? avatar : logo} alt='' />
      </div>
      <div className='cmt-1 list'>
        <div>
          <div>
            <span className='d-1'>
              {fullName && fullName}
              {groupName && groupName}
            </span>{' '}
            {', '}
            <span className='d-2'>
              <Moment format='DD MMM YYYY, hh:mm a'>{date}</Moment>
            </span>
          </div>
          <div className='d-3'>
            <p>{text}</p>
          </div>
        </div>
        <div>
          {!auth.loading && user === auth.user._id && (
            <button
              type='button'
              className='btn-blue btn-red'
              onClick={removeComment}
            >
              <img src={nounPlus} alt='' />
            </button>
          )}
        </div>
      </div>
      {/* <hr className='Hori' /> */}
    </div>
  );
};

CommentItem.propTypes = {
  profile: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
