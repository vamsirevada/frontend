import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './Gallery.css';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

const AddSoundTracks = ({ setAlert }) => {
  const fileInput = React.createRef();
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState('');
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [upload, setUpload] = useState(false);
  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const { title, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (file === null) {
      setAlert('Select File', 'danger', 1000);
    } else if (formData.title === '') {
      setAlert('Please add a Title ', 'danger', 1000);
    } else if (formData.description === '') {
      setAlert('Please add a Description', 'danger', 1000);
    } else {
      setUpload(true);
    }
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
      setFile(selected);
      setError('');
      console.log(error);
    } else {
      setFile(null);
      setError('Please select an audio file (mp4)');
    }
  };

  return (
    <div className='main-right'>
      <div className='main-right-container'>
        <div>
          <h2 className='des mb'>Upload Files (Mp3,Mp4)</h2>
          <video
            width='250px'
            height='150px'
            src={display}
            controls
            className={display ? '' : 'box1'}
          />
          <br />
          {upload && (
            <ProgressBar
              className='box4 blue-text'
              file={file}
              setFile={setFile}
              type={'audio'}
              description={formData.description}
              setAlert={setAlert}
              setUpload={setUpload}
            />
          )}
        </div>
        <div className='select'>
          <div className='cloud pos'></div>

          <input
            accept='audio/*'
            onChange={handleChange}
            type='file'
            hidden={true}
            ref={fileInput}
          />
          <span onClick={onOpenFileDialog} className='btn-blue pos'>
            Select
          </span>
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h2 className='des'>Title</h2>

            <input
              type='text'
              className='search-btn'
              name='title'
              value={title}
              placeholder='add a title'
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <h2 className='des'>Description</h2>
            <textarea
              type='text'
              className='search-btn'
              name='description'
              value={description}
              placeholder='add description'
              onChange={(e) => onChange(e)}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, fugiat.
            </textarea>
          </div>
          <div className='prof-flex-btn'>
            <button type='submit' className='btn-yellow' href='#!'>
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setAlert })(AddSoundTracks);
