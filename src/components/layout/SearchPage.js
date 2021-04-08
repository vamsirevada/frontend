import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Link, useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import logo from '../../images/dummyimage.jpg';
import connections from '../../images/noun_Friend_2987728.svg';

const SearchPage = () => {
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
  }, [fetchData]);

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
      <div className='search-dis'>
        {input !== '' && (
          <div className='search-ribbon'>
            <h4>Search Results</h4>
          </div>
        )}
        {users
          .filter((val) => {
            if (input === '') {
              return null;
            } else if (
              (val.user.fullName &&
                val.user.fullName
                  .toLowerCase()
                  .includes(input.toLowerCase())) ||
              val.user.userName.toLowerCase().includes(input.toLowerCase()) ||
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
              <div
                className='search-element'
                key={key}
                onClick={() => {
                  setInput('');
                  history.push(`/portfolio/${val?.user?._id}`);
                }}
              >
                <div className='search-element-main'>
                  <img
                    className='search-result-avatar'
                    src={val.avatar ? val.avatar : logo}
                    alt=''
                  />
                  <div className='search-result-name'>
                    <p>
                      <span className='search-bold'>
                        {val.user.fullName && val.user.fullName}
                        {val.user.groupName && val.user.groupName}
                      </span>
                    </p>
                    <p>
                      <span>{val.status}</span>
                    </p>
                  </div>
                </div>
                <div className='search-result-connections'>
                  <img src={connections} alt='' />
                  <span>{val.buddies.length}</span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchPage;
