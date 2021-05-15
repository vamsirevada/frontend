import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import './Gallery.css';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import preview from '../../images/preview.png';
import { usePopper } from 'react-popper';
import { Fragment } from 'react';

const AddPhoto = ({ suggestions, setAlert }) => {
  const fileInput = React.createRef();
  const [state, setState] = useState({
    show: false,
    file: null,
    display: preview,
    error: null,
    upload: false,
    title: '',
    description: '',
    stringlength: 0,
  });

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
    if (state.file === null) {
      setAlert('Select File', 'danger', 1000);
    } else if (state.title === '') {
      setAlert('Please add a Title ', 'danger', 1000);
    } else if (state.description === '') {
      setAlert('Please add a Description', 'danger', 1000);
    } else {
      setState({
        ...state,
        upload: true,
      });
    }
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    if (selected) {
      setState({
        ...state,
        display: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
        error: '',
      });
    } else {
      setState({
        ...state,
        file: null,
        error: 'Please select an image file (png or jpg)',
      });
    }
  };

  return (
    <div className='main-right'>
      <div className='main-right-container'>
        <div>
          <h2 className='des mb'>Upload Files (.Jpg, Png,Gifs)</h2>

          <img src={state.display} className='preview' alt='' />
          <br />
          <div>
            {state.upload && (
              <ProgressBar
                className='box4 blue-text'
                file={state.file}
                type={'Picture'}
                title={state.title}
                description={state.description}
                setAlert={setAlert}
                setState={setState}
                stringlength={state.stringlength}
              />
            )}
          </div>
        </div>
        <div className='select'>
          <div className='cloud pos'></div>
          <input
            accept='image/*'
            onChange={handleChange}
            onClick={(e) => (e.target.value = null)}
            type='file'
            hidden={true}
            ref={fileInput}
          />
          <span onClick={onOpenFileDialog} className='btn-blue pos'>
            Select
          </span>
          {state.error && <div className='error'>{state.error}</div>}
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h2 className='des'>Title</h2>
            <input
              type='text'
              className='search-btn'
              name='title'
              value={state.title}
              placeholder='add a title'
              onChange={(e) =>
                setState({
                  ...state,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div>
            <h2 className='des'>Description</h2>
            <textarea
              type='text'
              id='portfolio-description'
              className='search-btn'
              name='description'
              value={state.description}
              placeholder='add description'
              onChange={(e) => {
                setState({
                  ...state,
                  description: e.target.value,
                });
                if (e.target.value.includes('@')) {
                  setState({ ...state, show: true });
                }
              }}
              ref={setReferenceElement}
            ></textarea>
            {state.show && (
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
                        setState({
                          ...state,
                          description: state.description.concat(`${x + ' '}`),
                          stringlength: x.length,
                          show: false,
                        });
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

export default connect(null, { setAlert })(AddPhoto);
