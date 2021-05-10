import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import bin from '../../images/icons/noun_bin_2832480.svg';
import { deleteComment } from '../../actions/post';
import logo from '../../images/dummyimage.jpg';
import { projectFirestore } from '../../firebase/config';
import { Link } from 'react-router-dom';

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
    <>
      <div className='comment-box'>
        <div>
          <Link to={`portfolio/${user}`}>
            <img className='comment-pic' src={avatar ? avatar : logo} alt='' />
          </Link>
        </div>
        <div className='cmt-1 list'>
          <div>
            <div>
              <Link to={`portfolio/${user}`}>
                <span className='d-1'>
                  {fullName && fullName}
                  {groupName && groupName}
                </span>{' '}
              </Link>
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
                <img src={bin} alt='' />
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className='Hori' />
    </>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
