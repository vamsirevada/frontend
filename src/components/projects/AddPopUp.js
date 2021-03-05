import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { Link, useHistory } from 'react-router-dom';
import searchIcon from '../../images/searchIcon.svg';
import { SearchContext } from '../../context/search.context';
import { getProfiles } from '../../actions/profile';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MemberInvite from './MemberInvite';

const AddPopUp = forwardRef(
  ({ profile: { profiles }, project: { singleproject }, getProfiles }, ref) => {
    useEffect(() => {
      getProfiles();
      //eslint-disable-next-line
    }, []);
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
                <div className='body add'>
                  {profiles.length > 0 ? (
                    <Fragment>
                      {profiles.map((profile, index) => (
                        <Fragment key={index}>
                          <MemberInvite
                            key={profile._id}
                            profile={profile}
                            project_id={singleproject._id}
                          />
                        </Fragment>
                      ))}
                    </Fragment>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </>
    );
  }
);

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, { getProfiles })(AddPopUp);
