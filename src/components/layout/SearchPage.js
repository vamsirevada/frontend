/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useHistory } from 'react-router-dom';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import UseFirestore from '../addportfolio/UseFireStore';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/dummyimage.jpg';
import mail from '../../images/chat.svg';
import { motion } from 'framer-motion';
import PersonalMessage from '../chat/PersonalMessage';

const SearchPage = ({ getProfiles }) => {
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
  }, [fetchData]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const chatClose = () => {
    setStart(false);
  };

  const { docs } = UseFirestore('images');

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
                }
              })
              .map((val, key) => {
                return (
                  <div key={key} className='connect-main'>
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
                            <span className='bold'>
                              {val.user.fullName && val.user.fullName}
                              {val.user.groupName && val.user.groupName}
                            </span>{' '}
                            <br />
                            <span className='second-bold'></span>{' '}
                            <span className='second-bold'>{val.status}</span>{' '}
                            <br />
                            <span className='second-bold'>{val.location}</span>
                            <br />
                            <span className='third-bold'>
                              Connections :{' '}
                              <span className='f-1'>{val.buddies.length}</span>
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
                        <div className='btn-g'>
                          {' '}
                          <a
                            onClick={() => {
                              setStart(true);
                              setUserUid(val?.user?._id);
                              setChatUserName(val?.user?.fullName);
                              setChatUserImage(val?.avatar);
                            }}
                            className='btn-blue g-1'
                          >
                            <img src={mail} alt='' />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='connect-right'>
                      {docs &&
                        docs
                          .filter(
                            (doc) =>
                              doc?.userId === val?.user?._id &&
                              doc?.type !== 'Audio' &&
                              doc?.type !== 'Blog'
                          )
                          .slice(0, 4)
                          .map((doc) => (
                            <div className='pic-1' key={doc.id}>
                              {doc.type === 'Video' ? (
                                <motion.video
                                  controls
                                  src={doc.url}
                                  alt='uploaded pic'
                                  initial={{
                                    opacity: 0,
                                    height: '100%',
                                    width: '100%',
                                  }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1 }}
                                />
                              ) : (
                                <motion.img
                                  src={doc.url}
                                  height='100%'
                                  width='100%'
                                  alt=''
                                />
                              )}
                            </div>
                          ))}
                    </div>
                  </div>
                );
              })}
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

export default connect(null, { getProfiles })(SearchPage);
