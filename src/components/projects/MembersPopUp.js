import React, { Fragment, useState } from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { Link, useParams } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { usePopper } from 'react-popper';

import {
  makeAdmin,
  removeAdmin,
  makeModerator,
  removeModerator,
} from '../../actions/project';
import { connect } from 'react-redux';

const MembersPopUp = ({
  open,
  close,
  members,
  makeAdmin,
  removeAdmin,
  makeModerator,
  removeModerator,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const params = useParams();

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top-start',
  });

  const handleClick = (e) => {
    if (e.target.classList.contains('memberpopup')) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {open && (
        <Fragment>
          <div
            className='memberpopupscreen'
            onClick={(e) => {
              if (e.target.classList.contains('memberpopupscreen')) {
                close();
                setIsOpen(false);
              }
            }}
          >
            <div className='memberpopup' onClick={handleClick}>
              <div className='mem-heading'>
                <h3>Project Members</h3>
                <a href='#!' className='member-cross' onClick={close}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>
              {members.length > 0 ? (
                <>
                  <Fragment>
                    {members.map((member, index) => (
                      <div key={index} className='member-body'>
                        <div
                          style={{
                            background: `url(${
                              member.avatar ? member.avatar : logo
                            }) no-repeat center center/cover`,
                          }}
                          className='dp'
                        ></div>
                        <div className='flex-column-1'>
                          <div className='chat-name'>
                            <Link to={`/portfolio/${member.user}`}>
                              {member.fullName && member.fullName}
                            </Link>
                            <Link to={`/portfolio/${member.user}`}>
                              {member.groupName && member.groupName}
                            </Link>
                          </div>
                          <div className='chat-body'>
                            <p>{member.status}</p>
                          </div>
                        </div>
                        <div ref={setReferenceElement}>
                          <div
                            style={{
                              display: member.status !== 'Admin' ? '' : 'none',
                            }}
                            className='member-button'
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setId(member.user);
                            }}
                          >
                            <MoreHorizIcon />
                          </div>
                        </div>
                      </div>
                    ))}
                    <ul
                      className={isOpen ? 'tooltip' : 'tooltip-hidden'}
                      ref={setPopperElement}
                      style={styles.popper}
                      {...attributes.popper}
                    >
                      <li
                        onClick={() => {
                          makeAdmin(params.id, id);
                          setIsOpen(false);
                        }}
                      >
                        Make Admin
                      </li>
                      <li
                        onClick={() => {
                          makeModerator(params.id, id);
                          setIsOpen(false);
                        }}
                      >
                        Make Moderator
                      </li>
                      <li
                        onClick={() => {
                          removeAdmin(params.id, id);
                          setIsOpen(false);
                        }}
                      >
                        Remove Admin
                      </li>
                      <li
                        onClick={() => {
                          removeModerator(params.id, id);
                          setIsOpen(false);
                        }}
                      >
                        Remove Moderator
                      </li>
                    </ul>
                  </Fragment>
                </>
              ) : (
                <p>Add Members</p>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default connect(null, {
  makeAdmin,
  removeAdmin,
  makeModerator,
  removeModerator,
})(MembersPopUp);
