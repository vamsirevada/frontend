import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects, createProject } from '../../actions/project';
import { projectStorage } from '../../firebase/config';
import logo from '../../images/dummyimage.jpg';

const Createproject = ({
  auth: { user },
  project: { projects, isCreated },
  getProjects,
  createProject,
  history,
}) => {
  useEffect(() => {
    getProjects(user?._id);
  }, [getProjects, user?._id]);

  let fileInput = React.createRef();
  const [formData, setFormData] = useState({
    projectname: '',
    location: '',
    avatar: '',
    description: '',
  });

  const { projectname, location, avatar, description } = formData;

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref('projectpictures');
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFormData({
      ...formData,
      avatar: await fileRef.getDownloadURL(),
    });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProject(formData, history);
  };

  if (isCreated) {
    return <Redirect to={`/project/${projects[0]?._id}`} />;
  }

  return (
    <Fragment>
      <div id='c-profile'>
        <div className='container'>
          <div className='create-container'>
            <h2>Create your Project</h2>
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

            <div className='c-form project'>
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
                    rows='8'
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  project: state.project,
});

Createproject.propTypes = {
  createProject: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProjects, createProject })(
  withRouter(Createproject)
);
