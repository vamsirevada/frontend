/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
import ChatItem from './ChatItem';

const ChatSearchResults = ({ searchResults, onClickHandler }) => {
  if (searchResults.length === 0) {
    return <p className='no-search-results'>No results found!</p>;
  }

  return (
    <>
      {searchResults.map((val, key) => (
        <ChatItem key={key} val={val} onClickHandler={onClickHandler} />
      ))}
    </>
  );
};

export default ChatSearchResults;
