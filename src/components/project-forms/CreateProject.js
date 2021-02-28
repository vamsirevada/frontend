import React, { Fragment, useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/project';
import { projectStorage } from '../../firebase/config';
import { ProfileContext } from '../../context/profile/profile.context';
import logo from '../../images/dummyimage.jpg';

const Createproject = ({ createProject, history }) => {
  let fileInput = React.createRef();
  const { img, setImg } = useContext(ProfileContext);

  const [formData, setFormData] = useState({
    projectname: '',
    location: '',
    // avatar: '',
    description: '',
  });

  const {
    projectname,
    location,
    // avatar,
    description,
  } = formData;

  // const onOpenFileDialog = () => {
  //   fileInput.current.click();
  // };

  // const onFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   const storageRef = projectStorage.ref('profilepictures');
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //   setFormData({
  //     ...formData,
  //     avatar: await fileRef.getDownloadURL(),
  //   });

  //   setImg(await fileRef.getDownloadURL());

  //   createProject(
  //     { ...formData, avatar: await fileRef.getDownloadURL() },
  //     history,
  //     true
  //   );
  // };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createProject(formData, history);
  };

  return (
    <Fragment>
      <div id='c-profile'>
        <div className='container'>
          <div className='create-container'>
            <h2>Create your Project</h2>
            {/* <div className='dp'>
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
            </div> */}

            <div className='c-form'>
              <form onSubmit={(e) => onSubmit(e)}>
                <div>
                  <label htmlFor='projectname'>
                    Project Name: <span className='blue'>*</span>
                  </label>
                  <input
                    type='text'
                    name='projectname'
                    value={projectname}
                    onChange={(e) => onChange(e)}
                    placeholder=''
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
                  <label htmlFor='about'>Description :</label>
                  <textarea
                    name='description'
                    id='messages'
                    rows='10'
                    value={description}
                    onChange={(e) => onChange(e)}
                    placeholder='Write Something about project'
                    required
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Createproject.propTypes = {
  createProject: PropTypes.func.isRequired,
};

export default connect(null, { createProject })(withRouter(Createproject));
