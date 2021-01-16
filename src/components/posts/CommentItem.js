import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import nounPlus from "../../images/icons/noun_Plus_2310779.svg";
import { deleteComment } from "../../actions/post";
import logo from "../../images/dummyimage.jpg";

const CommentItem = ({
  postId,
  comment: { _id, text, firstName, lastName, user, date, avatar },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post-some-grid c-1">
      <div className="display-pic">
        <img
          className="display-pic"
          src={avatar ? avatar : logo}
          alt=""
        />
      </div>
      <div className="postForm">
        <div>
          <span className="d-1">
            {firstName} {lastName}
          </span>{" "}
          {", "}
          <span className="d-2">
            <Moment format="DD MMM YYYY, hh:mm a">{date}</Moment>
          </span>
        </div>
        <div className="d-3">
          <p>{text}</p>
        </div>

        <div>
          {!auth.loading && user === auth.user._id && (
            <button
              type="button"
              className="btn-blue"
              onClick={() => deleteComment(postId, _id)}
            >
              <img src={nounPlus} alt="" />
            </button>
          )}
        </div>
      </div>
      <hr className="Hori" />
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
