/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment, useEffect, useContext } from 'react';
import api from '../../utils/api';
import maskGroup from '../../images/maskGroup.svg';
import searchIcon from '../../images/searchIcon.svg';
import home from '../../images/Home.svg';
import chat from '../../images/chat.svg';
import NotificationPopup from './NotificationPopup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Link, useHistory } from 'react-router-dom';
import { SearchContext } from '../../context/search.context';
import { ProfileContext } from '../../context/profile/profile.context';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import { grey } from '@material-ui/core/colors';
import logo from '../../images/dummyimage.jpg';

const Navbar = ({ logout }) => {
  const history = useHistory();
  const [displayMenu, toogleMenu] = useState(false);
  const [feedActive, toogleFeedActive] = useState(false);
  const [portActive, tooglePortActive] = useState(false);
  const [nbActive, toogleNbActive] = useState(false);
  const [chatActive, toogleChatActive] = useState(false);
  const { Addsearch, clearSearch } = useContext(SearchContext);
  const { img, setImg } = useContext(ProfileContext);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
    _onsearch();
  };

  useEffect(() => {
    const getProfilepic = async () => {
      const res = await api.get('/profile/me');
      setImg(res.data?.avatar);
    };
    getProfilepic();
  }, [setImg]);

  const _onsearch = async () => {
    clearSearch();
    const response = await api.get(`/search?title=${value}`);
    if (response) {
      Addsearch(response?.data);
    } else {
      Addsearch([]);
    }
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
          <a>
            <img src={maskGroup} alt='Vanity' />
          </a>
        </div>

        <div className='container'>
          <div className='logo-box'></div>

          <div className='nav-icons'>
            <div className='search active'>
              <input
                type='text'
                onChange={(e) => onChange(e)}
                className='search-btn'
                placeholder='search'
              />
              <br />
              <img
                onClick={() => {
                  history.push('/profiles');
                }}
                src={searchIcon}
                alt='search'
              />
            </div>

            <div
              className={feedActive ? 'tab active' : 'tab'}
              onClick={toggleF}
            >
              <Link className='icon' to='/feed'>
                <img src={home} className='white' alt='portfolio' />
                <p>Feed</p>
              </Link>
            </div>
            <div
              className={portActive ? 'tab active unique' : 'tab unique'}
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
                nbActive ? 'tab active unique notice' : 'tab unique not'
              }
              onClick={toggleNb}
            >
              <Link className='icon notice' to='/noticeboard'>
                <small
                  style={{
                    fontSize: 12,
                  }}
                  color='action'
                  className='noticeboard'
                >
                  NB
                </small>
                <p>NoticeBoard</p>
              </Link>
            </div>
            <div
              className={chatActive ? 'tab active unique chat' : 'tab'}
              onClick={toggleC}
            >
              <Link to='/chats' className='chat icon'>
                <img src={chat} className='white chat' alt='chat' />
                <p>Chat</p>
              </Link>
            </div>
            <NotificationPopup />
            <div>
              <img
                className='dis'
                src={img ? img : logo}
                onClick={() => {
                  toogleMenu(true);
                  setTimeout(() => {
                    toogleMenu(false);
                  }, 5000);
                }}
                alt=''
              />

              {displayMenu && (
                <Fragment>
                  <div className='arrow-up'></div>
                  <ul className='no-dis' id='dis-dd'>
                    <li>
                      <Link to='/profile'> View Profile</Link>
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

export default connect(null, { logout })(Navbar);
