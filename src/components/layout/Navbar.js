/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, Fragment, useEffect, useContext } from 'react';
import axios from 'axios';
import maskGroup from '../../images/maskGroup.svg';
import searchIcon from '../../images/searchIcon.svg';
import home from '../../images/Home.svg';
import chat from '../../images/chat.svg';
import notify from '../../images/noun_notification_887294.svg';
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
  const [displayNotify, toogleNotify] = useState(false);
  const [feedActive, toogleFeedActive] = useState(false);
  const [portActive, tooglePortActive] = useState(false);
  const [chatActive, toogleChatActive] = useState(false);
  const { Addsearch, clearSearch } = useContext(SearchContext);
  const { img, setImg } = useContext(ProfileContext);

  useEffect(() => {
    getProfilepic();
  });

  const _onsearch = async (value) => {
    clearSearch();
    const response = await axios.get(`api/search?title=${value}`);
    console.log(response, 'responseresponseresponse');
    if (response) {
      Addsearch(response?.data);
    } else {
      Addsearch([]);
    }
  };
  const getProfilepic = async () => {
    const res = await axios.get('/api/profile/me');
    setImg(res.data?.avatar);
  };

  const toggleF = async () => {
    toogleFeedActive(!feedActive);
    tooglePortActive(false);
    toogleChatActive(false);
  };
  const toggleP = async () => {
    toogleFeedActive(false);
    tooglePortActive(!portActive);
    toogleChatActive(false);
  };
  const toggleC = async () => {
    toogleFeedActive(false);
    tooglePortActive(false);
    toogleChatActive(!chatActive);
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
                onChange={(e) => {
                  setTimeout(() => {
                    _onsearch(e.target.value);
                  }, 500);
                }}
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
            {/* <div className='tab'>
              <Link to='/profiles' className='calendar icon'>
                <img src={all} alt='allProfile' />
                <p>Profiles</p>
              </Link>
            </div> */}
            <div
              className={chatActive ? 'tab active' : 'tab'}
              onClick={toggleC}
            >
              <Link to='/chats' className='chat icon'>
                <img src={chat} className='white' alt='chat' />
                <p>Chat</p>
              </Link>
            </div>
            <div className='icon'>
              <img
                src={notify}
                onClick={() => {
                  toogleNotify(true);
                  setTimeout(() => {
                    toogleMenu(false);
                  }, 5000);
                }}
                className='notif'
                alt='notify'
              />
              {displayNotify && <NotificationPopup />}
            </div>
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
                      <a onClick={logout} className='signOut' type='button'>
                        Log out
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
