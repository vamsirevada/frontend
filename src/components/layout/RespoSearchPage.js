/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useHistory } from 'react-router-dom';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import logo from '../../images/dummyimage.jpg';
import nounPlus from '../../images/noun_Plus_2310779.svg';
import mail from '../../images/chat.svg';
import PersonalMessage from '../chat/PersonalMessage';

const RespoSearchPage = ({ closeRespoBar, getProfiles }) => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
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
    getProfiles();
  }, [getProfiles]);

  const chatClose = () => {
    setStart(false);
  };

  return (
    <>
      <div className='respo-search-bar'>
        <div className='resposearch active '>
          <input
            type='text'
            value={input}
            className='search-btn'
            placeholder='Search Profiles...'
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <img src={nounPlus} onClick={closeRespoBar} alt='search' />
        </div>
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
                } else {
                  return null;
                }
              })
              .map((val, key) => {
                return (
                  <div className='connect-main'>
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
                            <span className='second-bold'>
                              {/* {user?.userName && user?.userName} */}
                            </span>{' '}
                            {/* <br /> */}
                            <span className='second-bold'>
                              {val.status}
                            </span>{' '}
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
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(RespoSearchPage);
