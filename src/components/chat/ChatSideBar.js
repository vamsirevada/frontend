import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getBuddiesById } from '../../actions/profile';
import { getRealtimeConversations } from '../../actions/chat';
import ChatPopup from './ChatPopup';
import ActiveDot from '../../images/activedot.png';
import searchIcon from '../../images/searchIcon1.svg';
import ActivePopUpClose from '../../images/activepopupclose.png';
import logo from '../../images/dummyimage.jpg';

const ChatSideBar = ({
  auth: { user },
  profile: { buddies },
  getBuddiesById,
  chat: { conversations },
}) => {
  const dispatch = useDispatch();
  const [chatProfile, setChatProfile] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUserImage, setChatUserImage] = useState(logo);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    getBuddiesById(user?._id);
  }, [getBuddiesById, user?._id]);

  return (
    <>
      <button
        className='open-button'
        onClick={() =>
          (document.getElementById('myForm').style.display = 'block')
        }
      >
        Active People ({buddies.length}){'   '} <img src={ActiveDot} alt='as' />
      </button>
      <div className='chat-popup' id='myForm'>
        <form className='chat-container'>
          <div className='flex-1'>
            <h4>Recently Active</h4>
            <button
              type='button'
              className='drop-btn'
              onClick={() =>
                (document.getElementById('myForm').style.display = 'none')
              }
            >
              <img src={ActivePopUpClose} alt='' />
            </button>
          </div>
          {buddies &&
            buddies.map((buddy, index) => (
              <div
                onClick={() => {
                  setChatProfile(buddy);
                  setChatUserImage(buddy?.avatar);
                  setUserUid(buddy?.user?._id);
                  setChatStarted(true);
                  dispatch(
                    getRealtimeConversations({
                      uid_1: user?._id,
                      uid_2: buddy?.user?._id,
                    })
                  );
                }}
                key={index}
                className='flex'
              >
                <div
                  style={{
                    background: `url(${buddy?.avatar}) no-repeat center center/cover`,
                  }}
                  className='dp'
                ></div>
                <p>{buddy?.user?.fullName}</p>
              </div>
            ))}
          <div className='chat-search'>
            <input
              type='text'
              name='search'
              // value={value}
              // onChange={(e) => onChange(e)}
              className='search-btn'
              placeholder='search'
            />
            {/* <br /> */}
            <img src={searchIcon} alt='search' />
          </div>
        </form>
      </div>
      {chatStarted ? (
        <ChatPopup
          userUid={userUid}
          chatUserImage={chatUserImage}
          chatProfile={chatProfile}
          conversations={conversations}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
});

export default connect(mapStateToProps, { getBuddiesById })(ChatSideBar);
