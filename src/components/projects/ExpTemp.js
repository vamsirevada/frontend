import React, { createRef, useState } from 'react';
import Moment from 'react-moment';
import logo from '../../images/dummyimage.jpg';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { updateExperience, deleteExperience } from '../../actions/profile';
import { connect } from 'react-redux';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ExpTemp = ({
  profile,
  user,
  experience: {
    _id,
    project,
    projectavatar,
    title,
    company,
    location,
    description,
    from,
    to,
  },
  updateExperience,
  deleteExperience,
  showActions,
}) => {
  const [formData, setFormData] = useState({
    title: title,
    company: company,
    project: project,
    projectavatar: projectavatar,
    description: description,
    location: location,
    from: from,
    to: to,
  });

  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const fileInput = createRef();

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
        setOpen(true);
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
          updateExperience(_id, { ...formData, projectavatar: url });
          setProgress(0);
          setOpen(false);
        });
      }
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateExperience(_id, formData);
    setEdit(false);
    setShow(false);
  };

  return (
    <div>
      <div className='projectitem'>
        <div className='p-container'>
          <div className='project-head'>
            {edit ? (
              <p className='list list-1'>
                Project Name:{' '}
                <input
                  className='experience-input'
                  type='text'
                  name='project'
                  defaultValue={project}
                  onChange={(e) => onChange(e)}
                />
              </p>
            ) : (
              <p className='list list-1'>
                Project Name: <span className='list-4'> {' ' + project}</span>
              </p>
            )}

            {show ? (
              <div style={{ display: 'flex' }}>
                <div onClick={onSubmit}>
                  <CheckIcon />
                </div>
                <div
                  onClick={() => {
                    setEdit(false);
                    setShow(false);
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
            ) : (
              <>
                {showActions && (
                  <div style={{ display: 'flex' }}>
                    <div
                      onClick={() => {
                        setEdit(true);
                        setShow(true);
                      }}
                    >
                      <EditIcon />
                    </div>
                    <div onClick={() => deleteExperience(_id)}>
                      <DeleteIcon />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className='project-body'>
            {edit ? (
              <div className='project-body-container'>
                <div className='project-body-desc-container'>
                  <div className='project-body-main'>
                    <div className='project-body-1'>
                      <p className='list'>
                        Company :
                        <input
                          type='text'
                          name='company'
                          defaultValue={company}
                          onChange={(e) => onChange(e)}
                        />
                      </p>

                      <p className='list'>
                        Designation :{' '}
                        <input
                          type='text'
                          name='title'
                          defaultValue={title}
                          onChange={(e) => onChange(e)}
                        />
                      </p>

                      <p className='list'>
                        Location:
                        <input
                          type='text'
                          name='location'
                          defaultValue={location}
                          onChange={(e) => onChange(e)}
                        />
                      </p>
                      <p className='list'>
                        Timeline:{' '}
                        <input
                          type='date'
                          name='from'
                          defaultValue={from && from.slice(0, 10)}
                          onChange={(e) => onChange(e)}
                        />
                        {' - '}
                        <input
                          type='date'
                          name='to'
                          defaultValue={to && to.slice(0, 10)}
                          onChange={(e) => onChange(e)}
                        />
                      </p>
                    </div>
                    <div>
                      <p className='list-5'>
                        Description: <br />
                        <textarea
                          name='description'
                          id='award-des'
                          cols='30'
                          rows='5'
                          type='text'
                          defaultValue={description}
                          onChange={(e) => onChange(e)}
                        ></textarea>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='project-pic'>
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
                  <div>
                    {open ? (
                      <div style={{ width: 50, height: 50, margin: 'auto' }}>
                        <CircularProgressbar
                          value={progress}
                          text={`${progress}%`}
                        />
                      </div>
                    ) : (
                      <a
                        href='#!'
                        className='upload-button'
                        onClick={onOpenFileDialog}
                      >
                        Edit
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className='project-body-container'>
                <div className='project-body-desc-container'>
                  <div className='project-body-main'>
                    <div className='project-body-1'>
                      <p className='list'>
                        Company : <span className='list-4'>{company}</span>
                      </p>

                      <p className='list'>
                        Designation : <span className='list-4'> {title}</span>
                      </p>

                      <p className='list'>
                        Location: <span className='list-4'>{location}</span>
                      </p>
                      <p className='list'>
                        Timeline:{' '}
                        <span className='list-4'>
                          {' '}
                          <Moment format='DD MMM YYYY'>{from}</Moment>
                          {' - '}
                          {to === null ? (
                            'Now'
                          ) : (
                            <Moment format='MMM YYYY'>{to}</Moment>
                          )}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className='list-5'>
                      Description: <br />
                      <span className='list-4'>{description}</span>
                    </p>
                  </div>
                </div>

                <div className='project-pic'>
                  <img
                    className='project-body-avatar'
                    src={projectavatar}
                    alt=''
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { updateExperience, deleteExperience })(ExpTemp);
