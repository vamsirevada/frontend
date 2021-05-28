/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import cancel from '../../images/close.svg';
import PersonalMessage from '../chat/PersonalMessage';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import SearchResults from './SearchResults';

const SearchPage = ({ getProfiles, profile: { profiles } }) => {
  const [start, setStart] = useState(false);
  const [input, setInput] = useState('');
  const [member, setMember] = useState(null);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const chatClose = () => {
    setStart(false);
  };

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

  const inputHandler = () => {
    setInput('');
  };

  const onClickHandler = (res) => {
    setStart(true);
    setMember(res);
  };

  let searchResultsContent = (
    <p className='no-search-results'>No Results found</p>
  );

  if (searchResults.length > 0) {
    searchResultsContent = searchResults.map((res, key) => (
      <SearchResults
        key={key}
        res={res}
        inputHandler={inputHandler}
        onClickHandler={onClickHandler}
      />
    ));
  }

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
            <div className='search-dis-header'>
              <div className='search-header'>
                <h2>
                  Search Result for <span className='blue'>'{input}'</span>
                </h2>
                <div className='flex-right'>
                  <Link
                    to='/profiles'
                    onClick={inputHandler}
                    className='search-seeall'
                  >
                    see all
                  </Link>
                  <img
                    className='closesearch'
                    src={cancel}
                    onClick={inputHandler}
                    alt=''
                  />
                </div>
              </div>
              <hr className='hori' />
              <div className='search-buddy-grid'>{searchResultsContent}</div>
            </div>
          </div>
        </div>
      )}
      {start && <PersonalMessage member={member} chatClose={chatClose} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(SearchPage);
