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
    return 'Picture';
  } else if (type === 'audio') {
    return 'Audio';
  } else if (type === 'video') {
    return 'Video';
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
        await storageRef.getDownloadURL().then((x) => {
          setUrl(`${x}`);
        });
      }
    );
  };

  const _onupload = (e) => {
    e.preventDefault();
    const index = text.indexOf('http');
    const newText = text.slice(0, index);
    const newLink = text.slice(index, text.length);
    if (url !== null) {
      addProjectPost(singleproject._id, {
        text: index >= 0 ? newText : text,
        url,
        link: index >= 0 ? newLink : null,
        type: filetype,
      });
      setText('');
      setShow(false);
    } else if (index >= 0) {
      addProjectPost(singleproject._id, {
        text: newText,
        link: newLink,
        type: 'Blog',
      });
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
          placeholder='Post about project work & updates'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {show ? (
        <div style={{ width: 50, height: 50, margin: 'auto' }}>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </div>
      ) : (
        <div className='attach'>
          <img onClick={onOpenFileDialog} src={attach} alt='attach' />
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

export default connect(null, { addProjectPost, setAlert })(ProjectPostForm);
