import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { projectStorage } from '../../firebase/config';
import logo from '../../images/dummyimage.jpg';

const Createprofile = ({ createProfile, history }) => {
  let fileInput = React.createRef();

  const [formData, setFormData] = useState({
    location: '',
    avatar: '',
    status: '',
    bio: '',
    dob: '',
    gender: '',
    hometown: '',
    languageknown: '',
  });

  const {
    location,
    avatar,
    status,
    bio,
    dob,
    gender,
    hometown,
    languageknown,
  } = formData;

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref('profilepictures');
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFormData({
      ...formData,
      avatar: await fileRef.getDownloadURL(),
    });

    createProfile(
      { ...formData, avatar: await fileRef.getDownloadURL() },
      history,
      true
    );
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <div id='c-profile'>
        <div className='container'>
          <div className='create-container'>
            <h2>Create your Profile</h2>
            <div className='dp'>
              <input
                type='file'
                onChange={onFileChange}
                hidden={true}
                ref={fileInput}
              />
              <div className='display-pic'>
                <img
                  className='display-pic'
                  src={avatar ? avatar : logo}
                  alt=''
                />
              </div>
              <button className='btn-yellow' onClick={onOpenFileDialog}>
                Upload Picture
              </button>
            </div>

            <div className='c-form'>
              <form onSubmit={(e) => onSubmit(e)}>
                <div>
                  <label htmlFor='location'>
                    Location <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='location'
                    // id='location'
                    value={location}
                    onChange={(e) => onChange(e)}
                    placeholder='Enter Your Location'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='profession'>
                    Profession <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='status'
                    id='Profession'
                    value={status}
                    onChange={(e) => onChange(e)}
                    placeholder='Enter Your Designation'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='about'>About</label>
                  <textarea
                    name='bio'
                    id='messages'
                    rows='10'
                    value={bio}
                    onChange={(e) => onChange(e)}
                    placeholder='Write Something about yourself'
                    required
                  ></textarea>
                </div>

                <div>
                  <label htmlFor='dob'>
                    Date of Birth <span className='blue'>*</span>
                  </label>
                  <input
                    type='date'
                    name='dob'
                    value={dob}
                    onChange={(e) => onChange(e)}
                    className='date'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='Gender'>
                    {' '}
                    Gender <span className='blue'>*</span>
                  </label>
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Male'
                    checked={gender === 'Male'}
                    onChange={(e) => onChange(e)}
                  />
                  Male{' '}
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Female'
                    checked={gender === 'Female'}
                    onChange={(e) => onChange(e)}
                  />
                  Female{' '}
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Others'
                    checked={gender === 'Others'}
                    onChange={(e) => onChange(e)}
                  />
                  Others{' '}
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Prefer not to say'
                    checked={gender === 'Prefer not to say'}
                    onChange={(e) => onChange(e)}
                  />
                  Prefer not to say{' '}
                </div>
                <div>
                  <label htmlFor='hometown'>
                    Hometown <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='hometown'
                    value={hometown}
                    onChange={(e) => onChange(e)}
                    id='hometown'
                    required
                  />
                </div>

                <div>
                  <label htmlFor='Language'>
                    Language proficiency :<span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='languageknown'
                    value={languageknown}
                    onChange={(e) => onChange(e)}
                    id='Language'
                    required
                  />
                </div>
                <br />
                <button type='Submit' className='btn-blue f-right'>
                  {' '}
                  Save changes
                </button>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Createprofile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(Createprofile));
