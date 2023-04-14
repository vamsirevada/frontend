import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './Gallery.css';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { usePopper } from 'react-popper';
import { Fragment } from 'react';

const AddVideos = ({ suggestions, setAlert }) => {
  const fileInput = React.createRef();
  // const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState('');
  const [error, setError] = useState(null);
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stringlength, setStringLength] = useState(0);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
  });

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (file === null) {
      setAlert('Select File', 'danger', 1000);
    } else if (title === '') {
      setAlert('Please add a Title ', 'danger', 1000);
    } else if (description === '') {
      setAlert('Please add a Description', 'danger', 1000);
    } else {
      setUpload(true);
    }
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    const blob = selected.slice(0, selected.size, selected.type);
    const newFile = new File([blob], selected.name, { type: 'video/mp4' });
    if (newFile) {
      setDisplay(URL.createObjectURL(newFile));
      setFile(e.target.files[0]);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <div className='main-right'>
      <div className='main-right-container'>
        <div className='main-right-grid'>
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
                type={'Video'}
                title={title}
                description={description}
                setAlert={setAlert}
                setFile={setFile}
                setUpload={setUpload}
                setTitle={setTitle}
                setDescription={setDescription}
                setStringLength={setStringLength}
                setDisplay={setDisplay}
                stringlength={stringlength}
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
              ref={setReferenceElement}
            ></textarea>
            {description.includes('@') && (
              <ul
                className='acknowledge-tooltip'
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                {suggestions.map((x, index) => (
                  <Fragment key={index}>
                    <li
                      onClick={() => {
                        setDescription(
                          description.replace('@', '').concat(`${x + ' '}`)
                        );
                        setStringLength(x.length);
                      }}
                    >
                      {x}
                    </li>
                    <hr />
                  </Fragment>
                ))}
              </ul>
            )}
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

export default connect(null, { setAlert })(AddVideos);
