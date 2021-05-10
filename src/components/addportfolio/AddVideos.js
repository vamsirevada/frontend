import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './Gallery.css';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';

const AddVideos = ({ setAlert }) => {
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
      setDisplay('');
    }
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    const blob = selected.slice(0, selected.size, selected.type);
    const newFile = new File([blob], selected.name, { type: 'video/mp4' });

    if (newFile) {
      setDisplay(URL.createObjectURL(newFile));
      setFile(newFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <div className='main-right'>
      <div className='main-right-container'>
        <div>
          <h2 className='des mb'>Upload Files (Max-Length: 3mins)</h2>
          <video
            width='250px'
            height='150px'
            src={display}
            controls
            className={display ? '' : 'box1'}
          ></video>
          <br />
          {upload && (
            <ProgressBar
              className='box4 blue-text'
              file={file}
              setFile={setFile}
              type={'Video'}
              title={formData.title}
              description={formData.description}
              setAlert={setAlert}
              setUpload={setUpload}
              setFormData={setFormData}
            />
          )}
        </div>
        <div className='select'>
          <div className='cloud pos'></div>
          <input
            accept='video/*'
            onChange={handleChange}
            onClick={(e) => (e.target.value = null)}
            type='file'
            hidden={true}
            ref={fileInput}
          />
          <span onClick={onOpenFileDialog} className='btn-blue pos'>
            Select
          </span>
          {error && <div className='error'>{error}</div>}
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
            ></textarea>
          </div>
          <div className='prof-flex-btn'>
            <button type='submit' className='btn-yellow'>
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setAlert })(AddVideos);
