import React, { Fragment, createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import logo from '../../images/dummyimage.jpg';
import AddExperience from './AddExperience';
import AddEducation from './AddEducation';
import AddAward from './AddAward';
import AddEvents from './AddEvents';
import AddSkills from './AddSkills';
import AddMember from './AddMember';
import AddSpecialisation from './AddSpecialisation';
import AddGroupEvent from './AddGroupEvent';
import AddPartners from './AddPartners';
import AddClients from './AddClients';
import AddGroupAward from './AddGroupAward';
import AddContact from './AddContact';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const initialState = {
  location: '',
  avatar: '',
  status: '',
  bio: '',
  founder: '',
  dob: '',
  gender: '',
  hometown: '',
  languageknown: '',
};

const EditProfile = ({
  profile: { profile, loading },
  auth: { user },
  createProfile,
  history,
}) => {
  const fileInput = createRef();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { isGroup } = user;

  useEffect(() => {
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, profile]);

  const {
    location,
    avatar,
    status,
    bio,
    dob,
    founder,
    gender,
    hometown,
    languageknown,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref('profilepictures');
    const fileRef = storageRef.child(file.name).put(file);

    fileRef.on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(Math.round(percentage));
        setShow(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        fileRef.snapshot.ref.getDownloadURL().then((url) => {
          setFormData({
            ...formData,
            avatar: url,
          });
          createProfile({ ...formData, avatar: url }, history, true);
          setProgress(0);
          setShow(false);
        });
      }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return isGroup ? (
    <Fragment>
      {' '}
      <div id='c-profile'>
        <div className='container'>
          <div className='create-container'>
            <h2>Edit your Profile</h2>
            <div className='dp'>
              <input
                type='file'
                onChange={onFileChange}
                hidden={true}
                ref={fileInput}
              />
              <img className='display-pic' src={avatar} alt='' />
              {show ? (
                <div style={{ width: 50, height: 50, margin: 'auto' }}>
                  <CircularProgressbar value={progress} text={`${progress}%`} />
                </div>
              ) : (
                <button className='btn-yellow' onClick={onOpenFileDialog}>
                  Upload Picture
                </button>
              )}
            </div>
            <div className='c-form'>
              <form onSubmit={onSubmit}>
                <div>
                  <label htmlFor='status'>
                    Type of Group <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='status'
                    value={status}
                    onChange={onChange}
                    placeholder='Enter Your Designation'
                  />
                </div>
                <div>
                  <label htmlFor='founder'>
                    Founder <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='founder'
                    value={founder}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor='location'>
                    Location <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='location'
                    // id='location'
                    value={location}
                    onChange={onChange}
                    placeholder='Enter Your Location'
                  />
                </div>
                <div>
                  <label htmlFor='about'>About</label>
                  <textarea
                    name='bio'
                    id='messages'
                    rows='10'
                    value={bio}
                    onChange={onChange}
                    placeholder='Write Something about yourself'
                  ></textarea>
                </div>
                <br />
                <button type='Submit' className='btn-blue f-right'>
                  {' '}
                  Save changes
                </button>
                <br />
              </form>
            </div>
            <hr className='new' />
            <AddMember />
            <br />
            <hr className='new' />
            <AddSpecialisation />
            <hr className='new' />
            <AddGroupEvent />
            <hr className='new' />
            <AddPartners />
            <hr className='new' />
            <AddClients />
            <hr className='new' />
            <AddGroupAward />
            <hr className='new' />
            <AddContact />
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div id='c-profile'>
        <div className='container'>
          <div className='create-container'>
            <h2>Edit your Profile</h2>
            <div className='dp'>
              <input
                type='file'
                onChange={onFileChange}
                hidden={true}
                ref={fileInput}
              />
              <img
                className='display-pic'
                src={avatar ? avatar : logo}
                alt=''
              />
              {show ? (
                <div style={{ width: 50, height: 50, margin: 'auto' }}>
                  <CircularProgressbar value={progress} text={`${progress}%`} />
                </div>
              ) : (
                <button className='btn-yellow' onClick={onOpenFileDialog}>
                  Upload Picture
                </button>
              )}
            </div>
            <div className='c-form'>
              <form onSubmit={onSubmit}>
                <div>
                  <label htmlFor='location'>
                    Location <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='location'
                    value={location}
                    onChange={onChange}
                    placeholder='Enter Your Location'
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
                    onChange={onChange}
                    placeholder='Enter Your Designation'
                  />
                </div>

                <div>
                  <label htmlFor='about'>About</label>
                  <textarea
                    name='bio'
                    id='messages'
                    rows='10'
                    value={bio}
                    onChange={onChange}
                    placeholder='Write Something about yourself'
                  ></textarea>
                </div>

                <div>
                  <label htmlFor='dob'>
                    Date of Birth <span className='blue'>*</span>
                  </label>
                  <input
                    type='date'
                    name='dob'
                    value={dob.slice(0, 10)}
                    onChange={onChange}
                    className='date'
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
                    onChange={onChange}
                  />
                  Male{' '}
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Female'
                    checked={gender === 'Female'}
                    onChange={onChange}
                  />
                  Female{' '}
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Others'
                    checked={gender === 'Others'}
                    onChange={onChange}
                  />
                  Others{' '}
                  <input
                    className='gender'
                    type='radio'
                    name='gender'
                    value='Prefer not to say'
                    checked={gender === 'Prefer not to say'}
                    onChange={onChange}
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
                    onChange={onChange}
                    id='hometown'
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
                    onChange={onChange}
                    id='Language'
                  />
                </div>
                <button type='Submit' className='btn-blue f-right'>
                  {' '}
                  Save Changes
                </button>
                <br />
              </form>
            </div>
            <hr className='new' />
            <AddExperience />
            <hr className='new' />
            <AddEducation />
            <hr className='new' />
            <AddAward />
            <hr className='new' />
            <AddEvents />
            <hr className='new' />
            <AddSkills />
            <hr className='new' />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  createProfile,
})(EditProfile);
