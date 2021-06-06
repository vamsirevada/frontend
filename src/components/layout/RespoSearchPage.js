/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import nounPlus from '../../images/noun_Plus_2310779.svg';
import PersonalMessage from '../chat/PersonalMessage';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import RespoSearchResults from './RespoSearchResults';

const RespoSearchPage = ({
  getProfiles,
  profile: { profiles },
  closeRespoBar,
}) => {
  const [input, setInput] = useState('');
  const [start, setStart] = useState(false);
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
    <div className='connect-main'>
      <p className='no-search-results'>No Results found</p>
    </div>
  );

  if (searchResults.length > 0) {
    searchResultsContent = searchResults.map((res, key) => (
      <RespoSearchResults
        key={key}
        res={res}
        inputHandler={inputHandler}
        onClickHandler={onClickHandler}
      />
    ));
  }

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
              <Link
                to='/profiles'
                onClick={() => {
                  setInput('');
                }}
                className='search-seeall'
              >
                see all
              </Link>
            </div>
            <hr className='hori' />
            {searchResultsContent}
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

export default connect(mapStateToProps, { getProfiles })(RespoSearchPage);
