import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addProjectPost } from '../../actions/projectpost';
import attach from '../../images/icons/noun_attach_2188273.svg';
import { setAlert } from '../../actions/alert';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const _gettype = (type) => {
  // selected.type.split('/')[0]
  if (type === 'image') {
    return 'photo';
  } else if (type === 'audio') {
    return 'audio';
  } else if (type === 'video') {
    return 'video';
  } else {
    return 'default';
  }
};

const ProjectPostForm = ({ addProjectPost, setAlert, singleproject }) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const fileInput = React.createRef();
  const [url, setUrl] = useState(null);
  const [filetype, setFileType] = useState(null);

  const onOpenFileDialog = () => {
    fileInput.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const type = _gettype(file.type.split('/')[0]);
    setFileType(type);
    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(Math.round(percentage));
        setShow(true);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(`${url}`);
      }
    );
  };

  const _onupload = (e) => {
    e.preventDefault();
    if (url !== null) {
      addProjectPost(singleproject._id, { text: text, url, type: filetype });
      setText('');
      setShow(false);
    } else {
      addProjectPost(singleproject._id, { text });
      setText('');
      setShow(false);
    }
  };

  return (
    <form className='post-some-grid' onSubmit={_onupload}>
      <input
        accept='audio/*,video/*,image/*'
        onChange={handleChange}
        type='file'
        hidden={true}
        ref={fileInput}
      />
      {/* <div className='display-pic'></div> */}
      <div className='postForm'>
        <input
          type='text'
          placeholder='Write Something New...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {!show && (
        <div className='attach'>
          <img onClick={onOpenFileDialog} src={attach} alt='attach' />
        </div>
      )}
      {show && (
        <div style={{ width: 50, height: 50, margin: 'auto' }}>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </div>
      )}
      <div>
        <button type='submit' className='btn-blue' value='Post'>
          Post{' '}
        </button>
      </div>
    </form>
  );
};

ProjectPostForm.propTypes = {
  addProjectPost: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   project: state.project,
// });

export default connect(null, { addProjectPost, setAlert })(ProjectPostForm);
