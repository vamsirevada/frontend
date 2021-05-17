import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import logo from '../../images/dummyimage.jpg';

const CreateGroupProfile = ({ createProfile, history }) => {
  let fileInput = React.createRef();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    avatar: '',
    status: '',
    bio: '',
    founder: '',
  });

  const { location, avatar, status, bio, founder } = formData;

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
          setProgress(0);
          setShow(false);
        });
      }
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
              <img
                className='display-pic'
                src={avatar ? avatar : logo}
                alt=''
              />
              {show ? (
                <div
                  style={{
                    width: 50,
                    height: 50,
                    margin: 'auto',
                  }}
                >
                  <CircularProgressbar value={progress} text={`${progress}%`} />
                </div>
              ) : (
                <button className='btn-yellow' onClick={onOpenFileDialog}>
                  Upload Picture
                </button>
              )}
            </div>

            <div className='c-form'>
              <form onSubmit={(e) => onSubmit(e)}>
                <div>
                  <label htmlFor='Type'>
                    Group Type <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='status'
                    value={status}
                    onChange={(e) => onChange(e)}
                    placeholder='Production House, Casting Agency, Institute...'
                    required
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
                    required
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
                <br />
                <button type='submit' className='btn-blue f-right'>
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

CreateGroupProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateGroupProfile));
