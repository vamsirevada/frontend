import React, { Fragment, useEffect, useContext, useState } from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import searchIcon from '../../images/searchIcon.svg';
import { SearchContext } from '../../context/search.context';
import { getProfiles } from '../../actions/profile';
import axios from 'axios';
import { connect } from 'react-redux';
import MemberInvite from './MemberInvite';

const AddPopUp = ({
  profile: { profiles },
  project: { singleproject },
  getProfiles,
  show,
  close,
}) => {
  const { search, Addsearch, clearSearch } = useContext(SearchContext);
  const [value, setValue] = useState('');

  useEffect(() => {
    getProfiles();
    //eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
    _onsearch();
  };

  const _onsearch = async () => {
    clearSearch();
    const res = await axios.get(`/api/search?title=${value}`);
    if (res) {
      Addsearch(res?.data);
    } else {
      Addsearch([]);
    }
  };

  return (
    <>
      {show && (
        <Fragment>
          <div className='memberpopupscreen'>
            <div className='memberpopup add'>
              <div className='mem-heading add'>
                <h3>Add Project Members</h3>
                <a href='#!' className='member-cross' onClick={close}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>
              <div className='search active'>
                <input
                  type='text'
                  name='search'
                  value={value}
                  onChange={(e) => onChange(e)}
                  className='search-btn'
                  placeholder='search'
                />
                <br />
                <img onClick={_onsearch} src={searchIcon} alt='search' />
              </div>
              <div className='body add'>
                {search.length > 0
                  ? search.map((profile) => (
                      <MemberInvite
                        key={profile._id}
                        profile={profile}
                        project_id={singleproject?._id}
                      />
                    ))
                  : profiles.length > 0 &&
                    profiles.map((profile) => (
                      <MemberInvite
                        key={profile._id}
                        profile={profile}
                        project_id={singleproject?._id}
                      />
                    ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, { getProfiles })(AddPopUp);
