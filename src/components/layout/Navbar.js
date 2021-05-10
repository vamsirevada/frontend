/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment, useEffect } from 'react';
import store from '../../store';
import maskGroup from '../../images/maskGroup.svg';
import home from '../../images/Home.svg';
import chat from '../../images/chat.svg';
import NotificationPopup from './NotificationPopup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Link } from 'react-router-dom';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import { grey } from '@material-ui/core/colors';
import logo from '../../images/dummyimage.jpg';
import { getRealtimeNotifications } from '../../actions/notification';
import SearchPage from './SearchPage';
import RespoSearchPage from './RespoSearchPage';
import searchIcon from '../../images/searchIcon.svg';
import { getAllConversations } from '../../actions/chat';
import Badge from '@material-ui/core/Badge';

const Navbar = ({
  auth: { user },
  profile: { profile },
  chat: { messages },
  logout,
}) => {
  const [displayMenu, toogleMenu] = useState(false);
  const [RSearch, setRSearch] = useState(false);
  const [feedActive, toogleFeedActive] = useState(false);
  const [portActive, tooglePortActive] = useState(false);
  const [nbActive, toogleNbActive] = useState(false);
  const [chatActive, toogleChatActive] = useState(false);

  useEffect(() => {
    if (user?._id) {
      store.dispatch(
        getRealtimeNotifications({
          uid_1: user?._id,
        })
      );
      store.dispatch(getAllConversations(user?._id));
    }
  }, [user?._id]);

  const xyz =
    messages &&
    messages.filter(
      (msg) => msg.user_uid_2 === user?._id && msg.isView === false
    );

  const closeRespoBar = () => {
    setRSearch(false);
  };

  const toggleF = async () => {
    toogleFeedActive(!feedActive);
    tooglePortActive(false);
    toogleNbActive(false);
    toogleChatActive(false);
  };
  const toggleP = async () => {
    toogleFeedActive(false);
    tooglePortActive(!portActive);
    toogleNbActive(false);
    toogleChatActive(false);
  };

  const toggleC = async () => {
    toogleFeedActive(false);
    tooglePortActive(false);
    toogleNbActive(false);
    toogleChatActive(!chatActive);
  };

  const toggleNb = async () => {
    toogleFeedActive(false);
    tooglePortActive(false);
    toogleNbActive(!nbActive);
    toogleChatActive(false);
  };

  return (
    <Fragment>
      <div className='navbar'>
        <div className='s-logo'>
          <Link to='/feed'>
            <img src={maskGroup} alt='Vanity' />
          </Link>
        </div>

        <div
          className={
            feedActive || portActive || nbActive || chatActive
              ? 'container ipad'
              : 'container'
          }
        >
          <div
            className={
              feedActive || portActive || nbActive || chatActive
                ? 'logo-box ipad'
                : 'logo-box'
            }
          ></div>

          <div className='nav-icons'>
            <SearchPage />
            <div className='responsive-search'>
              <a href='#!'>
                <img
                  onClick={() => {
                    setRSearch(!RSearch);
                  }}
                  src={searchIcon}
                  alt='portfolio'
                />
              </a>
            </div>
            {RSearch && (
              <Fragment>
                <RespoSearchPage closeRespoBar={closeRespoBar} />
              </Fragment>
            )}
            <div
              className={feedActive ? 'tab active' : 'tab classnamefeed'}
              onClick={toggleF}
            >
              <Link className='icon' to='/feed'>
                <img src={home} className='white' alt='portfolio' />
                <p>Home</p>
              </Link>
            </div>
            <div
              className={
                portActive
                  ? 'tab active unique'
                  : 'tab unique classnameportfolio '
              }
              onClick={toggleP}
            >
              <Link className='icon' to='/portfolio'>
                <ArtTrackIcon
                  style={{
                    fontSize: 32,
                    color: grey[600],
                    verticalAlign: 'top',
                  }}
                  color='action'
                />
                <p>Portfolio</p>
              </Link>
            </div>
            <div
              className={
                nbActive
                  ? 'tab active unique notice'
                  : 'tab unique not classnamenoticeboard'
              }
              onClick={toggleNb}
            >
              <Link className='icon notice' to='/noticeboard'>
                <small
                  style={{
                    fontSize: 12,
                  }}
                  color='action'
                  className='nb-nav'
                >
                  NB
                </small>
                <p>NoticeBoard</p>
              </Link>
            </div>
            <Badge className='message-count-label' badgeContent={xyz.length}>
              <div
                className={
                  chatActive ? 'tab active unique chat' : 'tab classnamechat'
                }
                onClick={toggleC}
              >
                <Link to='/chats' className='chat icon'>
                  <img src={chat} className='white chat' alt='chat' />
                  <p>Chat</p>
                </Link>
              </div>
            </Badge>
            <NotificationPopup />
            <div>
              <img
                className='dis'
                src={profile?.avatar ? profile?.avatar : logo}
                onClick={() => {
                  toogleMenu(true);
                }}
                alt=''
              />
              {displayMenu && (
                <Fragment>
                  <div
                    className='dp-popup-demo-tour'
                    onClick={(e) => {
                      if (e.target.classList.contains('dp-popup-demo-tour')) {
                        toogleMenu(false);
                      }
                    }}
                  >
                    <div className='arrow-up'></div>
                    <ul
                      className='no-dis'
                      id='dis-dd'
                      onClick={(e) => {
                        toogleMenu(false);
                      }}
                    >
                      <li>
                        <Link to='/profile'>View Profile</Link>
                      </li>
                      <li>
                        <Link to='/invite'> Invite Friends</Link>
                      </li>
                      <li>
                        <Link to='/create-project'> Create Project</Link>
                      </li>
                      <li>
                        <a onClick={logout} className='signOut' type='button'>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
  profile: state.profile,
});

export default connect(mapStateToProps, { logout })(Navbar);
