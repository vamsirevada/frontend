import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './Gallery.css';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import preview from '../../images/preview.png';

const AddPhoto = ({ setAlert }) => {
  const fileInput = React.createRef();
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(preview);
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

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
      setDisplay(preview);
      setFormData({
        title: '',
        description: '',
      });
    }
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected) {
      setDisplay(URL.createObjectURL(e.target.files[0]));
      setFile(selected);
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
          <h2 className='des mb'>Upload Files (.Jpg, Png,Gifs)</h2>

          <img src={display} className='preview' alt='' />
          <br />
          <div>
            {upload && (
              <ProgressBar
                className='box4 blue-text'
                file={file}
                setFile={setFile}
                type={'Picture'}
                title={formData.title}
                description={formData.description}
                setAlert={setAlert}
                setUpload={setUpload}
              />
            )}
          </div>
        </div>
        <div className='select'>
          <div className='cloud pos'></div>
          <input
            accept='image/*'
            onChange={handleChange}
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
export default connect(mapStateToProps, { setAlert })(AddPhoto);
