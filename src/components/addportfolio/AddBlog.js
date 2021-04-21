import React, { useState } from 'react';
import { projectFirestore, timestamp } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import api from '../../utils/api';

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const AddBlog = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    description: '',
  });

  const [link, setLink] = useState('');

  const { description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = projectFirestore.collection('images');
    if (link === '') {
      setAlert('Blog Link is required', 'danger');
    } else if (description === '') {
      setAlert('Description is required', 'danger');
    } else {
      const createdAt = await timestamp();
      const token = await localStorage.getItem('token');
      const user = await parseJwt(token);
      const userId = user?.user?.id;
      const Id = uuidv4();
      const body = {
        text: description,
        url: link,
        type: 'Blog',
        user: userId,
      };
      await api
        .post('/posts', body)
        .then(async (res) => {
          await collectionRef.add({
            type: 'Blog',
            url: link,
            description: description,
            createdAt,
            userId,
            Id,
          });
          setLink('');
          setFormData({
            description: '',
          });
          await setAlert('Portfolio updated Successfully', 'success');
        })

        .catch((err) => {
          alert(JSON.stringify(err));
        });
    }
  };

  return (
    <div className='main-right'>
      <div className='main-right-container blog'>
        <div>
          <h2 className='des mb'>Link to Blog</h2>
          <input
            type='url'
            name='link'
            className='search-btn'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder='Add Link'
          />
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h2 className='des mb'>Description</h2>
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
export default connect(mapStateToProps, { setAlert })(AddBlog);
