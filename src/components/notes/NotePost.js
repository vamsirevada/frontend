/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
// import add from '../../images/noun_Add Friend_2987727 (2) 2.svg';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { unnotePost } from '../../actions/profile';
// import nounPlus from '../../images/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import noteimg from '../../images/icons/summarize-24px.svg';

const NotePost = ({ setAlert, unnotePost, notepost }) => {
  const { post, groupName, fullName, status, avatar, remark } = notepost;

  const unnote = (e) => {
    unnotePost(post);
    // setAlert('Unnote', 'success');
  };

  return (
    <div className='join-grp-flex  notepost'>
      <div className='display-pic-1'>
        <img className='display-pic-1' src={avatar ? avatar : logo} alt='no' />
      </div>
      <div className='flex-right'>
        <Link to={`posts/${post}`}>
          <div className='bold bold-1'>
            {fullName && <p> Posted By: {fullName}</p>}

            {groupName && <p> Posted By: {groupName}</p>}
          </div>
        </Link>
        <p className='third-bold'>{status}</p>

        <p className='third-bold'>Remark : {remark}</p>
      </div>

      <div className='btn-gf note'>
        {' '}
        <a href='#!' onClick={unnote}>
          <img src={noteimg} alt='' />
        </a>
        <span className='tooltiptext'>
          <div className='arrow-up'></div>
          unnote
        </span>
      </div>
    </div>
  );
};

export default connect(null, { setAlert, unnotePost })(NotePost);
