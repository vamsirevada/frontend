/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { createRef, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import nounBriefcase from '../../images/icons/nounBriefcase.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';
import { projectStorage } from '../../firebase/config';
import logo from '../../images/dummyimage.jpg';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    project: '',
    projectavatar: '',
    description: '',
    location: '',
    from: '',
    to: '',
    current: false,
  });

  const [displayAdd, toogleAdd] = useState(false);
  const [toDateDisabled, toggleDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const fileInput = createRef();

  const {
    title,
    company,
    from,
    to,
    current,
    project,
    projectavatar,
    description,
    location,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = projectStorage.ref('experiencepictures');
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
            projectavatar: url,
          });
          setProgress(0);
          setShow(false);
        });
      }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData);
    setFormData({
      title: '',
      company: '',
      project: '',
      projectavatar: '',
      description: '',
      location: '',
      from: '',
      to: '',
      current: false,
    });
  };

  return (
    <Fragment>
      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={nounBriefcase} alt='briefcase' />{' '}
              <span className='m-1'>Professional Experience</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleAdd(!displayAdd)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displayAdd && (
            <Fragment>
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex'>
                    <div>
                      <div>
                        <input
                          type='file'
                          onChange={onFileChange}
                          ref={fileInput}
                          hidden={true}
                        />
                        <img
                          className='display-pic'
                          src={projectavatar ? projectavatar : logo}
                          alt=''
                        />
                        {show ? (
                          <div
                            style={{ width: 50, height: 50, margin: 'auto' }}
                          >
                            <CircularProgressbar
                              value={progress}
                              text={`${progress}%`}
                            />
                          </div>
                        ) : (
                          <div
                            className='btn-yellow'
                            onClick={onOpenFileDialog}
                          >
                            Upload Pic
                          </div>
                        )}
                      </div>
                    </div>
                    <div></div>
                    <div>
                      <label htmlFor='Designation'>Designation :</label>
                      <input
                        className='experience-input'
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='organisation'>Company Name :</label>
                      <input
                        className='experience-input'
                        type='text'
                        name='company'
                        value={company}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='project'>Project Name :</label>
                      <input
                        className='experience-input'
                        type='text'
                        name='project'
                        value={project}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='location'>Location :</label>
                      <input
                        className='experience-input'
                        type='text'
                        name='location'
                        value={location}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className='last'>
                      <label htmlFor='duration'>Duration (month/year) :</label>
                      <div className='grid'>
                        <input
                          className='experience-input b-1'
                          type='month'
                          name='from'
                          value={from}
                          onChange={(e) => onChange(e)}
                          placeholder='from date'
                        />

                        <span className='c-align'>to</span>
                        <input
                          className='experience-input b-1'
                          type='month'
                          name='to'
                          value={to}
                          onChange={(e) => onChange(e)}
                          disabled={toDateDisabled ? 'disabled' : ''}
                          placeholder='to date'
                        />
                        <div className='c-flex'>
                          <input
                            className='experience-input'
                            type='checkbox'
                            name='current'
                            checked={current}
                            value={current}
                            onChange={(e) => {
                              setFormData({ ...formData, current: !current });
                              toggleDisabled(!toDateDisabled);
                            }}
                          />{' '}
                          <label htmlFor='current'>current</label>
                        </div>
                      </div>
                    </div>
                    <div className='last'>
                      <label htmlFor='Description'>Description</label>
                      <br />
                      <textarea
                        className='experience-input'
                        name='description'
                        id='award-des'
                        cols='30'
                        rows='5'
                        type='text'
                        value={description}
                        onChange={(e) => onChange(e)}
                      ></textarea>
                    </div>
                  </div>

                  <div className='prof-flex-btn'>
                    <button className='btn-blue' type='submit'>
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
