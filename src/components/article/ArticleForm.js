import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { addArticle } from '../../actions/article';

const ArticleForm = ({ addArticle, setAlert }) => {
  const [post, setPost] = useState({
    title: '',
    author: '',
    body: '',
    time: '',
    imgName: '',
  });

  const { title, author, body, time, imgName } = post;

  const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      title === '' ||
      author === '' ||
      body === '' ||
      time === '' ||
      imgName === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else {
      addArticle(post);
      console.log(post);
      setPost({
        title: '',
        author: '',
        body: '',
        time: '',
        imgName: '',
      });
      setAlert('Article Uploaded', 'success');
    }
  };

  return (
    <div className='post-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <h2 className='mb-2'>New Article</h2>

        <label htmlFor='title'>Title</label>
        <br />
        <input
          type='text'
          placeholder='title'
          name='title'
          value={title}
          onChange={(e) => onChange(e)}
        />
        <br />
        <label htmlFor='Written By'>Written By:</label>
        <input
          type='text'
          placeholder='Wriiten by:'
          name='author'
          value={author}
          onChange={(e) => onChange(e)}
        />
        <br />
        <label htmlFor='Read Time'>Read Time:</label>
        <input
          type='text'
          name='time'
          value={time}
          onChange={(e) => onChange(e)}
        />
        <br />
        <label htmlFor='Image File Name'>Image FileName:</label>
        <input
          type='text'
          placeholder='Image File name'
          name='imgName'
          value={imgName}
          onChange={(e) => onChange(e)}
        />
        <br />
        <label htmlFor='mainBody'>Main Body:</label>
        <textarea
          type='text'
          placeholder='Write what you believe....'
          name='body'
          value={body}
          onChange={(e) => onChange(e)}
          rows='20'
        />

        <br />

        <div className='mb-4'>
          <input type='submit' value='Post' className='button' />
        </div>
      </form>
    </div>
  );
};

export default connect(null, { addArticle, setAlert })(ArticleForm);
