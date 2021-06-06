/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import { getBuddiesById, getProfiles } from '../../actions/profile';
import { getProjects } from '../../actions/project';
import { getRealtimeConversations } from '../../actions/chat';
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/dummyimage.jpg';
import background from '../../images/Rectangle.png';
import ChatRight from './ChatRight';
import ResponsiveChatPopup from './ResponsiveChatPopup';
import close from '../../images/icons/noun_Plus_2310779.svg';
import ChatSearchResults from './ChatSearchResults';
import ChatItem from './ChatItem';

const ChatPage = ({
  auth,
  getProfiles,
  getBuddiesById,
  getProjects,
  profile: { profiles, buddies },
  project: { projects },
  chat: { messages, conversations },
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [viewAll, setViewAll] = useState(false);
  const [viewAllChats, setViewAllChats] = useState(false);
  const [viewAllProjects, setViewAllProjects] = useState(false);
  const [chatProfile, setChatProfile] = useState('');
  const [chatStarted, setChatStarted] = useState(false);

  useEffect(() => {
    getProfiles();
    getBuddiesById(auth?.user?._id);
    getProjects(auth?.user?._id);
  }, [getProfiles, getBuddiesById, getProjects, auth?.user?._id]);

  const searchResults = profiles.filter((val) => {
    if (input === '') {
      return null;
    } else if (
      (val?.user?.fullName &&
        val?.user?.fullName.toLowerCase().includes(input.toLowerCase())) ||
      (val?.user?.userName &&
        val?.user?.userName.toLowerCase().includes(input.toLowerCase())) ||
      (val?.user?.groupName &&
        val?.user?.groupName.toLowerCase().includes(input.toLowerCase())) ||
      (val?.bio && val?.bio.toLowerCase().includes(input.toLowerCase())) ||
      (val?.status && val?.status.toLowerCase().includes(input.toLowerCase()))
    ) {
      return val;
    } else {
      return null;
    }
  });

  const chatClose = () => {
    setChatStarted(false);
  };

  const clearSearch = () => {
    setInput('');
  };

  const messagesCount = messages.filter(
    (msg) => msg.user_uid_2 === auth?.user?._id && msg.isView === false
  );

  const xyz = messages.filter(
    (x) => x.user_uid_1 === auth?.user?._id || x.user_uid_2 === auth?.user?._id
  );

  const result = xyz.map((res) => res.user_uid_2);

  const result1 = xyz.map((res) => res.user_uid_1);

  const abc = [...new Set(result)];

  const def = [...new Set(result1)];

  const chats =
    profiles &&
    profiles.length > 0 &&
    profiles.filter((buddy) => {
      return (
        (abc.includes(buddy.user._id) && buddy.user._id !== auth?.user?._id) ||
        (def.includes(buddy.user._id) && buddy.user._id !== auth?.user?._id)
      );
    });

  const onClickHandler = (res) => {
    setChatStarted(true);
    setChatProfile(res);
    clearSearch();
    dispatch(
      getRealtimeConversations({
        uid_1: auth?.user?._id,
        uid_2: res?.projectname ? res?._id : res?.user?._id,
      })
    );
  };

  return (
    <div id='full-chat'>
      <div id='fullchat-left'>
        <div className='fullchat-lefttop'>
          <div className='fullchat-lefttop-container'>
            <div
              style={{
                background: `url(${
                  auth?.user?.avatar ? auth?.user?.avatar : logo
                }) no-repeat center center/cover`,
              }}
              className='display-pic'
            ></div>
            <div>
              <input
                type='text'
                value={input}
                name='search'
                placeholder='Search People & Groups'
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className='fullchat-leftcontainer'>
          <div className='fullchat-leftbody'>
            {input !== '' ? (
              <div className='chats'>
                <div className='chats-heading'>
                  <h3>
                    Search Results for{'    '}
                    <span className='blue'>'{input}'</span>
                  </h3>
                  <img
                    src={close}
                    className='clearSearch'
                    onClick={clearSearch}
                    alt=''
                  />
                </div>
                <ChatSearchResults
                  searchResults={searchResults}
                  onClickHandler={onClickHandler}
                />
              </div>
            ) : (
              <div className='chats'>
                <div className='chats-heading'>
                  <h3>
                    Chats <span className='blue'>({chats.length})</span>
                  </h3>
                  {chats.length > 3 && (
                    <a
                      onClick={() => {
                        setViewAllChats(!viewAllChats);
                      }}
                      className='blue'
                    >
                      See More
                    </a>
                  )}
                </div>
                {chats &&
                  chats
                    .slice(0, viewAllChats ? chats.length : 3)
                    .map((profile, index) => (
                      <ChatItem
                        key={index}
                        val={profile}
                        onClickHandler={onClickHandler}
                        messagesCount={messagesCount}
                      />
                    ))}
                <div className='chats-heading'>
                  <h3>
                    Contacts <span className='blue'>({buddies.length})</span>
                  </h3>
                  {buddies.length > 3 && (
                    <a
                      onClick={() => {
                        setViewAll(!viewAll);
                      }}
                      className='blue'
                    >
                      See More
                    </a>
                  )}
                </div>
                {buddies &&
                  buddies
                    .slice(0, viewAll ? buddies.length : 3)
                    .map((profile, index) => (
                      <ChatItem
                        key={index}
                        val={profile}
                        onClickHandler={onClickHandler}
                      />
                    ))}
                <div className='chats-heading'>
                  <h3>
                    ProjectGroups{' '}
                    <span className='blue'>({projects.length})</span>
                  </h3>
                  {projects.length > 3 && (
                    <a
                      onClick={() => {
                        setViewAllProjects(!viewAllProjects);
                      }}
                      className='blue'
                    >
                      See More
                    </a>
                  )}
                </div>
                {projects &&
                  projects
                    .slice(0, viewAllProjects ? projects.length : 3)
                    .map((project) => (
                      <ChatItem
                        key={project?._id}
                        val={project}
                        onClickHandler={onClickHandler}
                      />
                    ))}
              </div>
            )}
          </div>
        </div>
        {chatStarted && (
          <ResponsiveChatPopup
            auth={auth}
            chatClose={chatClose}
            chatProfile={chatProfile}
            conversations={conversations}
          />
        )}
      </div>

      {chatStarted ? (
        <ChatRight
          conversations={conversations}
          auth={auth}
          chatProfile={chatProfile}
          setChatStarted={setChatStarted}
        />
      ) : (
        <section
          id='fullchat-right'
          style={{ background: `url(${background})` }}
        >
          <p
            style={{
              textAlign: 'center',
              marginTop: '30%',
            }}
          >
            You Can Start Conversation with your Friends Here
          </p>
        </section>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chat: state.chat,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProfiles,
  getBuddiesById,
  getProjects,
})(ChatPage);
