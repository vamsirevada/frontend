import React, { Fragment, useEffect, useState } from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import searchIcon from '../../images/searchIcon.svg';
import { getProfiles } from '../../actions/profile';
import api from '../../utils/api';
import { connect } from 'react-redux';
import MemberInvite from './MemberInvite';

const AddPopUp = ({
  profile: { profiles },
  project: { singleproject },
  getProfiles,
  show,
  hide,
}) => {
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);

  const newprofiles = profiles.filter(
    (x) => x?.user?._id !== singleproject?.user?._id
  );

  const fetchData = async () => {
    return await api.get('/profile').then((data) => {
      setUsers(data.data);
    });
  };

  useEffect(() => {
    getProfiles();
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {show && (
        <Fragment>
          <div className='memberpopupscreen'>
            <div className='memberpopup add'>
              <div className='mem-heading add'>
                <h3>Add Project Members</h3>
                <a href='#!' className='member-cross' onClick={hide}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>
              <div className='search active'>
                <input
                  type='text'
                  name='search'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  className='search-btn'
                  placeholder='search'
                />
                <br />
                <img src={searchIcon} alt='search' />
              </div>
              <div className='body add'>
                {users.length > 0 && value !== ''
                  ? users
                      .filter((val) => {
                        if (value === '') {
                          return null;
                        } else if (
                          (val.user.fullName &&
                            val.user.fullName
                              .toLowerCase()
                              .includes(value.toLowerCase())) ||
                          val.user.userName
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                          (val.user.groupName &&
                            val.user.groupName
                              .toLowerCase()
                              .includes(value.toLowerCase())) ||
                          val.bio.toLowerCase().includes(value.toLowerCase()) ||
                          val.status.toLowerCase().includes(value.toLowerCase())
                        ) {
                          return val;
                        } else {
                          return null;
                        }
                      })
                      .map((val) => (
                        <MemberInvite
                          key={val._id}
                          profile={val}
                          project={singleproject}
                        />
                      ))
                  : newprofiles.map((profile) => (
                      <MemberInvite
                        key={profile._id}
                        profile={profile}
                        project={singleproject}
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
