import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link, useHistory } from 'react-router-dom';
import { getProfiles } from '../../actions/profile';
import { connect } from 'react-redux';
import UseFirestore from '../addportfolio/UseFireStore';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/dummyimage.jpg';
import connections from '../../images/noun_Friend_2987728.svg';
import noteimg from '../../images/icons/summarize-24px.svg';
import { motion } from 'framer-motion';

const SearchPage = ({
  profile: { profile, profiles, loading },
  getProfiles,
}) => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    return await api.get('/profile').then((data) => {
      setUsers(data.data);
    });
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [fetchData]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const { docs } = UseFirestore('images');
  const newprofiles = profiles.filter(
    (x) => x?.user?._id !== profile?.user?._id
  );

  const documents =
    docs &&
    docs.filter(
      (doc) =>
        doc?.userId === profile?.user?._id &&
        doc?.type !== 'Audio' &&
        doc?.type !== 'Blog'
    );

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

            {/* <div
              onClick={() => {
                setInput('');
                history.push('/profiles');
              }}
              className='search-seeall'
            >
              <h4>See all</h4>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(SearchPage);
