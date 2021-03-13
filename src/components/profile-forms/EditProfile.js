import React, { Fragment, useState, useEffect, useContext } from 'react';
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
import { ProfileContext } from '../../context/profile/profile.context';

const EditProfile = ({
  profile: { profile, loading },
  auth: { user },
  createProfile,
  history,
}) => {
  let fileInput = React.createRef();
  const { img, setImg } = useContext(ProfileContext);
  const [formData, setFormData] = useState({
    location: '',
    avatar: '',
    status: '',
    bio: '',
    founder: '',
    dob: '',
    gender: '',
    hometown: '',
    languageknown: '',
  });

  const { isGroup } = user;

  useEffect(() => {
    setFormData({
      location: loading || !profile.location ? '' : profile.location,
      avatar: loading || !profile.avatar ? '' : profile.avatar,
      status: loading || !profile.status ? '' : profile.status,
      bio: loading || !profile.bio ? '' : profile.bio,
      founder: loading || !profile.founder ? '' : profile.founder,
      dob: loading || !profile.dob ? '' : profile.dob,
      gender: loading || !profile.gender ? '' : profile.gender,
      hometown: loading || !profile.hometown ? '' : profile.hometown,
      languageknown:
        loading || !profile.languageknown ? '' : profile.languageknown,
      experience: loading || !profile.experience ? '' : profile.experience,
    });
    //eslint-disable-next-line
  }, []);

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
    localStorage.setItem('profilepicture', await fileRef.getDownloadURL());
    setImg(await fileRef.getDownloadURL());

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
              <img
                className='display-pic'
                src={avatar ? avatar : logo}
                alt=''
              />
              <button className='btn-yellow' onClick={onOpenFileDialog}>
                Upload Picture
              </button>
            </div>
            <div className='c-form'>
              <form onSubmit={(e) => onSubmit(e)}>
                <div>
                  <label htmlFor='status'>
                    Type of Group <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='status'
                    value={status}
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
              <img className='display-pic' src={avatar} alt='' />
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
                    value={location}
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    onChange={(e) => onChange(e)}
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
                    value={dob}
                    onChange={(e) => onChange(e)}
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
