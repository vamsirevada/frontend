/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import sendbutton from '../../images/sendbutton.svg';
import { updateMessage } from '../../actions/chat';
import { projectFirestore } from '../../firebase/config';
import logo from '../../images/dummyimage.jpg';

const PersonalMessage = ({ auth: { user }, member, chatClose }) => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const msgObj = {
      user_uid_1: user?._id,
      user_uid_2: member?.user?._id,
      formValue,
    };
    if (formValue !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        setFormValue('');
        projectFirestore.collection('notifications').add({
          sender: user?._id,
          senderName: user?.userName,
          avatar: user?.avatar,
          receiver: member?.user?._id,
          type: 'chat',
          read: false,
          createdAt: new Date(),
        });
      });
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.classList.contains('personalmessagepopupscreen')) {
          chatClose();
        }
      }}
      className='personalmessagepopupscreen'
    >
      <div className='personalmessagepopup'>
        <div className='personalmessagepopup-header'>
          <div className='personalmessagepopup-heading'>
            <span
              style={{
                background: `url(${
                  member?.avatar ? member?.avatar : logo
                }) no-repeat center center/cover`,
              }}
              className='dp-1'
            >
              {member?.user?.activityStatus === 'online' && (
                <span className='dp-1-dot'></span>
              )}
            </span>
            <div>
              <h4>
                {member?.user?.fullName
                  ? member?.user?.fullName
                  : member?.user?.groupName}
              </h4>
              {member?.user?.activityStatus === 'online' && (
                <small>Active Now</small>
              )}
            </div>
          </div>
          <div onClick={chatClose} className='personalmessagepopup-cross'>
            x
          </div>
        </div>

        <form className='form-container-2'>
          <div className='form-grid'>
            <div className='form-flex-left'>
              <input
                type='text'
                name='typemessage'
                value={formValue}
                placeholder='Type your Message'
                onChange={(e) => setFormValue(e.target.value)}
              />
            </div>
            <div className='form-flex-right'>
              <a type='submit'>
                <img src={sendbutton} onClick={sendMessage} alt='' />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(PersonalMessage);
