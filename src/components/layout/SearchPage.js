/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/dummyimage.jpg';
import mail from '../../images/mail.svg';
import PersonalMessage from '../chat/PersonalMessage';
import CRequest from '../profiles/CRequest';
import Tooltip from '@material-ui/core/Tooltip';

const SearchPage = () => {
  const history = useHistory();
  const [start, setStart] = useState(false);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [chatUserName, setChatUserName] = useState('');
  const [chatUserImage, setChatUserImage] = useState(logo);
  const [userUid, setUserUid] = useState(null);

  const fetchData = async () => {
    return await api.get('/profile').then((data) => {
      setUsers(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chatClose = () => {
    setStart(false);
  };

  return (
    <>
      <div className='search active'>
        <input
          type='text'
          value={input}
          className='search-btn'
          placeholder='Search Profiles...'
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <img src={searchIcon} alt='search' />
      </div>
      {input !== '' && (
        <div className='search-dis' data-aos='fade-in'>
          <div className='search-dis-container'>
            <div>
              <div className='search-header'>
                <h2>
                  Search Result for <span className='blue'>'{input}'</span>
                </h2>
                <div
                  onClick={() => {
                    setInput('');
                    history.push('/profiles');
                  }}
                  className='search-seeall'
                >
                  see all
                </div>
              </div>
              <hr className='hori' />

              <div className='search-buddy-grid'>
                {users
                  .filter((val) => {
                    if (input === '') {
                      return null;
                    } else if (
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
                      <div key={key} className='buddy-grid'>
                        <div className='connect-left'>
                          <div className='connect-left-top'>
                            <div
                              style={{
                                background: `url(${
                                  val.avatar ? val.avatar : logo
                                }) no-repeat center center/cover`,
                              }}
                              className='display-pic'
                            ></div>
                            <div className='flex-c'>
                              <p>
                                <span
                                  onClick={() => {
                                    setInput('');
                                    history.push(
                                      `/portfolio/${val?.user?._id}`
                                    );
                                  }}
                                  className='bold'
                                >
                                  {val.user.fullName && val.user.fullName}
                                  {val.user.groupName && val.user.groupName}
                                </span>{' '}
                                <br />
                                <span className='second-bold'></span>{' '}
                                <span className='second-bold'>
                                  {val.status}
                                </span>{' '}
                                <br />
                                <span className='second-bold'>
                                  {val.location}
                                </span>
                                <br />
                                <span className='third-bold'>
                                  Connections :{' '}
                                  <span className='f-1'>
                                    {val.buddies.length}
                                  </span>
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className='connect-left-bottom'>
                            <div className='btn-b'>
                              {' '}
                              <a
                                onClick={() => {
                                  setInput('');
                                  history.push(`/portfolio/${val?.user?._id}`);
                                }}
                                className='btn-blue'
                              >
                                Portfolio
                              </a>
                            </div>
                            <CRequest item={val} />
                            <div className='btn-g'>
                              <Tooltip title='Chat' placement='top'>
                                <a
                                  onClick={() => {
                                    setStart(true);
                                    setUserUid(val?.user?._id);
                                    setChatUserName(val?.user?.fullName);
                                    setChatUserImage(val?.avatar);
                                  }}
                                  className='btn-blue g-1'
                                >
                                  <img className='g-1' src={mail} alt='' />
                                </a>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              className='search-cross'
              onClick={() => {
                setInput('');
              }}
            >
              x
            </div>
          </div>
        </div>
      )}
      {start ? (
        <PersonalMessage
          userUid={userUid}
          chatUserName={chatUserName}
          chatUserImage={chatUserImage}
          chatClose={chatClose}
        />
      ) : null}
    </>
  );
};

export default SearchPage;
