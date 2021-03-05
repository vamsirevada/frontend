import React from 'react';
import logo from '../../images/dummyimage.jpg';
import { connect } from 'react-redux';
import { sendProjectInvite } from '../../actions/project';
import { Link } from 'react-router-dom';

const MemberInvite = ({
  profile: { _id, user, avatar, status },
  project_id,
  sendProjectInvite,
}) => {
  const sendInvite = async () => {
    await sendProjectInvite(project_id, _id);
  };

  const onClick = () => {
    sendInvite();
  };
  return (
    <div className='member-body add'>
      <div
        style={{
          background: `url(${
            avatar ? avatar : logo
          }) no-repeat center center/cover`,
        }}
        className='dp'
      ></div>
      <div className='flex-column-1'>
        <div className='chat-name'>
          <Link to={`/portfolio/${user?._id}`}>
            {user?.fullName && user?.fullName}
          </Link>
          <Link to={`/portfolio/${user?._id}`}>
            {user?.groupName && user?.groupName}
          </Link>
        </div>
        <div className='chat-body'>
          <p>{status}</p>
        </div>
      </div>
      <div className='member-button'>
        <button className='bg-1' onClick={() => onClick()}>
          Invite
        </button>
      </div>
    </div>
  );
};

export default connect(null, { sendProjectInvite })(MemberInvite);
