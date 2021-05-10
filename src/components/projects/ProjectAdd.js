/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import MembersPopup from './MembersPopUp';
import AddPopUp from './AddPopUp';

const ProjectAdd = ({ singleproject }) => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setShow(false);
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <>
      <MembersPopup
        open={open}
        close={close}
        members={singleproject?.members}
      />
      <AddPopUp show={show} hide={hide} />
      <div className='main-grid-top project'>
        <div className='profile-project-box'>
          <a
            onClick={() => {
              setOpen(true);
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
              <a
                onClick={() => {
                  setShow(true);
                }}
              >
                <h4>
                  <span className='bg-1'>Add Member</span>
                </h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectAdd;
