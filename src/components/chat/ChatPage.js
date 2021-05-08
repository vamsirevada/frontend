/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useState } from 'react';
import { getBuddiesById, getProfiles } from '../../actions/profile';
import { getProjects } from '../../actions/project';
import { getRealtimeConversations } from '../../actions/chat';
import { connect, useDispatch } from 'react-redux';
import logo from '../../images/dummyimage.jpg';
import api from '../../utils/api';
import emoji from '../../images/emoji.svg';
import path from '../../images/path.svg';
import videocall from '../../images/videocall.png';
import background from '../../images/Rectangle.png';
import ChatRight from './ChatRight';
import ResponsiveChatPopup from './ResponsiveChatPopup';

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
  const [users, setUsers] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [viewAllChats, setViewAllChats] = useState(false);
  const [viewAllProjects, setViewAllProjects] = useState(false);
  const [chatProfile, setChatProfile] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUserImage, setChatUserImage] = useState(logo);
  const [userUid, setUserUid] = useState(null);

  const fetchData = async () => {
    return await api.get('/profile').then((data) => {
      setUsers(data.data);
    });
  };

  useEffect(() => {
    getProfiles();
    getBuddiesById(auth?.user?._id);
    getProjects(auth?.user?._id);
    fetchData();
  }, [getProfiles, getBuddiesById, getProjects, auth?.user?._id]);

  const chatClose = () => {
    setChatStarted(false);
  };

  const messagesCount = messages.filter(
    (msg) => msg.user_uid_2 === auth?.user?._id && msg.isView === false
  );

  const xyz = messages.filter(
    (x) => x.user_uid_1 === auth?.user?._id || x.user_uid_2 === auth?.user?._id
  );

  // const final = xyz.map(({ user_uid_1, user_uid_2 }) => ({
  //   user_uid_1,
  //   user_uid_2,
  // }));

  const result = xyz.map((res) => res.user_uid_2);
  const result1 = xyz.map((res) => res.user_uid_1);

  const abc = result.filter((item, key) => {
    return result.indexOf(item) === key;
  });

  const def = result1.filter((item, key) => {
    return result1.indexOf(item) === key;
  });

  const chats =
    profiles &&
    profiles.length > 0 &&
    profiles.filter((buddy) => {
      return (
        (abc.includes(buddy.user._id) && buddy.user._id !== auth?.user?._id) ||
        (def.includes(buddy.user._id) && buddy.user._id !== auth?.user?._id)
      );
    });

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
            <div className='chats'>
              {input !== '' ? (
                <>
                  <div className='chats-heading'>
                    <h3>Profiles</h3>
                  </div>
                  {users
                    .filter((val) => {
                      if (
                        (val.user.fullName &&
                          val.user.fullName
                            .toLowerCase()
                            .includes(input.toLowerCase())) ||
                        val.user.userName
                          .toLowerCase()
                          .includes(input.toLowerCase()) ||
                        (val.user.groupName &&
                          val.user.groupName
                            .toLowerCase()
                            .includes(input.toLowerCase())) ||
                        val.bio.toLowerCase().includes(input.toLowerCase()) ||
                        val.status.toLowerCase().includes(input.toLowerCase())
                      ) {
                        return val;
                      } else {
                        return null;
                      }
                    })
                    .map((val, key) => {
                      return (
                        <Fragment key={key}>
                          <div
                            onClick={() => {
                              setChatProfile(val);
                              setChatStarted(true);
                              setUserUid(val?.user?._id);
                              setChatUserImage(val?.avatar);
                              dispatch(
                                getRealtimeConversations({
                                  uid_1: auth?.user?._id,
                                  uid_2: val?.user?._id,
                                })
                              );
                            }}
                            className='fullchat-chatgrid'
                          >
                            <div
                              style={{
                                background: `url(${
                                  val?.avatar ? val?.avatar : logo
                                }) no-repeat center center/cover`,
                              }}
                              className='dp'
                            >
                              {val?.user?.activityStatus === 'online' && (
                                <span className='dp-dot'></span>
                              )}
                            </div>
                            <div className='flex-column-1'>
                              <div className='chat-name'>
                                <a>
                                  {val?.user?.fullName && val?.user?.fullName}
                                </a>
                                <a>
                                  {val?.user?.groupName && val?.user?.groupName}
                                </a>
                              </div>
                              <div className='chat-body'>
                                <p>{val.status}</p>
                              </div>
                            </div>
                          </div>
                          <hr className='hori-2' />
                        </Fragment>
                      );
                    })}
                </>
              ) : (
                <>
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
                        <Fragment key={index}>
                          <div
                            onClick={() => {
                              setChatProfile(profile);
                              setChatStarted(true);
                              setUserUid(profile?.user?._id);
                              setChatUserImage(profile?.avatar);
                              dispatch(
                                getRealtimeConversations({
                                  uid_1: auth?.user?._id,
                                  uid_2: profile?.user?._id,
                                })
                              );
                            }}
                            className='fullchat-chatgrid'
                          >
                            <div
                              style={{
                                background: `url(${
                                  profile?.avatar ? profile?.avatar : logo
                                }) no-repeat center center/cover`,
                              }}
                              className='dp'
                            >
                              {profile?.user?.activityStatus === 'online' && (
                                <span className='dp-dot'></span>
                              )}
                            </div>
                            <div className='flex-row-1'>
                              <div className='flex-column-1'>
                                <div className='chat-name'>
                                  <a>
                                    {profile?.user?.fullName &&
                                      profile?.user?.fullName}
                                  </a>
                                  <a>
                                    {profile?.user?.groupName &&
                                      profile?.user?.groupName}
                                  </a>
                                </div>
                                <div className='chat-body'>
                                  <p>{profile.status}</p>
                                </div>
                              </div>
                              {messagesCount.filter(
                                (msg) => msg.user_uid_1 === profile?.user?._id
                              ).length > 0 && (
                                <div className='message-count-icon'>
                                  <span className='message-count'>
                                    {
                                      messagesCount.filter(
                                        (msg) =>
                                          msg.user_uid_1 === profile?.user?._id
                                      ).length
                                    }
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <hr className='hori-2' />
                        </Fragment>
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
                        <Fragment key={index}>
                          <div
                            onClick={() => {
                              setChatProfile(profile);
                              setChatStarted(true);
                              setUserUid(profile?.user?._id);
                              setChatUserImage(profile?.avatar);
                              dispatch(
                                getRealtimeConversations({
                                  uid_1: auth?.user?._id,
                                  uid_2: profile?.user?._id,
                                })
                              );
                            }}
                            className='fullchat-chatgrid'
                          >
                            <div
                              style={{
                                background: `url(${
                                  profile?.avatar ? profile?.avatar : logo
                                }) no-repeat center center/cover`,
                              }}
                              className='dp'
                            >
                              {profile?.user?.activityStatus === 'online' && (
                                <span className='dp-dot'></span>
                              )}
                            </div>
                            <div className='flex-row-1'>
                              <div className='flex-column-1'>
                                <div className='chat-name'>
                                  <a>
                                    {profile?.user?.fullName &&
                                      profile?.user?.fullName}
                                  </a>
                                  <a>
                                    {profile?.user?.groupName &&
                                      profile?.user?.groupName}
                                  </a>
                                </div>
                                <div className='chat-body'>
                                  <p>{profile.status}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className='hori-2' />
                        </Fragment>
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
                        <Fragment key={project?._id}>
                          <div
                            onClick={() => {
                              setChatProfile(project);
                              setChatStarted(true);
                              setUserUid(project?._id);
                              setChatUserImage(project?.avatar);
                              dispatch(
                                getRealtimeConversations({
                                  uid_1: auth?.user?._id,
                                  uid_2: project?._id,
                                })
                              );
                            }}
                            className='fullchat-chatgrid'
                          >
                            <div
                              style={{
                                background: `url(${
                                  project?.avatar ? project?.avatar : logo
                                }) no-repeat center center/cover`,
                              }}
                              className='dp'
                            ></div>
                            <div className='flex-column-1'>
                              <div className='chat-name'>
                                <a>{project?.projectname}</a>
                              </div>
                              <div className='chat-body'>
                                <p>{project?.location}</p>
                              </div>
                            </div>
                          </div>
                          <hr className='hori-2' />
                        </Fragment>
                      ))}
                </>
              )}
            </div>
          </div>
        </div>
        {chatStarted && (
          <ResponsiveChatPopup
            chatClose={chatClose}
            userUid={userUid}
            chatUserImage={chatUserImage}
            chatProfile={chatProfile}
            conversations={conversations}
          />
        )}
      </div>
      {chatStarted ? (
        <Fragment>
          <ChatRight
            conversations={conversations}
            auth={auth}
            chatProfile={chatProfile}
            chatUserImage={chatUserImage}
            userUid={userUid}
          />
        </Fragment>
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
