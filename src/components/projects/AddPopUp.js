import React, {
  Fragment,
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { Link, useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import { SearchContext } from '../../context/search.context';
import axios from 'axios';

const AddPopUp = forwardRef(({}, ref) => {
  const history = useHistory();
  const [boxIsOpen, setBoxIsOpen] = useState(true);
  const { Addsearch, clearSearch } = useContext(SearchContext);

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

  const handleOpen = () => {
    setBoxIsOpen(true);
  };

  const handleClose = () => {
    setBoxIsOpen(false);
  };

  useImperativeHandle(ref, () => {
    return {
      open: () => handleOpen(),
      close: () => handleClose(),
    };
  });

  return (
    <>
      {boxIsOpen && (
        <Fragment>
          <div className='memberpopupscreen'>
            <div className='memberpopup add'>
              <div className='mem-heading add'>
                <h3>Add Project Members</h3>
                <a href='#!' className='member-cross' onClick={handleClose}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>
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
              {/* {members.length > 0 ? (
                <Fragment>
                  {members.map((member) => (
                    <Fragment>
                      <div className='member-body'>
                        <div
                          style={{
                            background: `url(${
                              member.avatar ? member.avatar : logo
                            }) no-repeat center center/cover`,
                          }}
                          className='dp'
                        ></div>
                        <div className='flex-column-1'>
                          <div className='chat-name'>
                            <Link to={`/portfolio/${member.user}`}>
                              {member.fullName && member.fullName}
                            </Link>
                            <Link to={`/portfolio/${member.user}`}>
                              {member.groupName && member.groupName}
                            </Link>
                          </div>
                          <div className='chat-body'>
                            <p>{member.status}</p>
                            
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </Fragment>
              ) : (
                <p>Add Members</p>
              )} */}
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
});

export default AddPopUp;
