import React from 'react';
import { Link } from 'react-router-dom';
import MemberPopUp from './MembersPopUp';
import AddPopUp from './AddPopUp';

const ProjectAdd = ({ singleproject }) => {
  const modalRef = React.useRef();

  return (
    <>
      <MemberPopUp ref={modalRef} members={singleproject?.members} />
      <AddPopUp ref={modalRef} />
      <div className='main-grid-top'>
        <div className='profile-project-box'>
          <a
            href='#!'
            onClick={() => {
              modalRef.current.open();
            }}
          >
            <p className='border-1 pro'>
              Members:{' '}
              <span className='f-1'>
                {singleproject.members && singleproject.members.length}
              </span>
            </p>
          </a>
          <div className='mutual-frds'>
            <div className='prof-heading-flex'>
              <div></div>
              <Link
                onClick={() => {
                  modalRef.current.open();
                }}
              >
                <h4>
                  <span className='bg-1'>Add Member</span>
                </h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectAdd;
