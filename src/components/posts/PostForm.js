import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import attach from '../../images/icons/noun_attach_2188273.svg';
import { projectStorage } from '../../firebase/config';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const _gettype = (type) => {
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

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  const fileInput = React.createRef();
  const [url, setUrl] = useState('');
  const [filetype, setFileType] = useState('');

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
          setUrl(x);
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
      addPost({
        text: index >= 0 ? newText : text,
        url: url ? url : null,
        link: index >= 0 ? newLink : null,
        type: filetype ? filetype : 'default',
      });
      setText('');
      setShow(false);
    }
  };

  return (
    <form className='post-some-grid' onSubmit={_onupload}>
      <input
        accept='audio/*,video/*,image/*'
        onChange={handleChange}
        onClick={(e) => (e.target.value = null)}
        type='file'
        hidden={true}
        ref={fileInput}
      />
      <div className='postForm'>
        <textarea
          type='text'
          placeholder='Post about work, art, interests & new learnings'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
