import React, {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { Link, useParams } from 'react-router-dom';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeAdmin } from '../../actions/project';

const MembersPopUp = forwardRef(({ members }, ref) => {
  const [boxIsOpen, setBoxIsOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [userid, setUserId] = useState('');
  const params = useParams();

  const handleOpen = () => {
    setBoxIsOpen(true);
  };

  const handleClose = () => {
    setBoxIsOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => handleOpen(),
      close: () => handleClose(),
    };
  });

  const remove = () => {
    console.log('remove');
  };

  return (
    <>
      {boxIsOpen && (
        <Fragment>
          <div className='memberpopupscreen'>
            <div className='memberpopup'>
              <div className='mem-heading'>
                <h3>Project Members</h3>
                <a href='#!' className='member-cross' onClick={handleClose}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>
              {members.length > 0 ? (
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
                      <div
                        style={{
                          display: member.status !== 'Admin' ? '' : 'none',
                        }}
                        className='member-button'
                        onClick={() => {
                          setOpen(!isOpen);
                          setUserId(member.user);
                        }}
                      >
                        <MoreHorizIcon />
                      </div>
                    </div>
                  ))}
                  {isOpen && (
                    <ul>
                      <li
                        onClick={() => {
                          makeAdmin(params.id, userid);
                        }}
                      >
                        Make Admin
                      </li>
                      <li>Make Moderator</li>
                    </ul>
                  )}
                </Fragment>
              ) : (
                <p>Add Members</p>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
});

export default MembersPopUp;
