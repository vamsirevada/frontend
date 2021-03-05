import React, {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { Link } from 'react-router-dom';

const MembersPopUp = forwardRef(({ members }, ref) => {
  const [boxIsOpen, setBoxIsOpen] = useState(false);

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
                    <Fragment key={index}>
                      <div className='member-body'>
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
                            {/* <div className="bubble">
                            <p>2</p>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
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
