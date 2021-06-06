import React, { useState } from 'react';
import { projectFirestore, timestamp } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import api from '../../utils/api';
import { usePopper } from 'react-popper';
import { Fragment } from 'react';

const AddBlog = ({ auth: { user }, suggestions, setAlert }) => {
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [show, setShow] = useState(false);
  const [stringlength, setStringLength] = useState(0);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = projectFirestore.collection('images');
    if (link === '') {
      setAlert('Blog Link is required', 'danger');
    } else if (description === '') {
      setAlert('Description is required', 'danger');
    } else {
      const createdAt = await timestamp();
      const userId = user?._id;
      const userName = user?.fullName ? user?.fullName : user?.groupName;
      const userAvatar = user?.avatar;
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
            stringlength,
            createdAt,
            userId,
            userName,
            userAvatar,
            Id,
          });
          await setAlert('Portfolio updated Successfully', 'success');
          setDescription('');
          setLink('');
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
              onChange={(e) => {
                setDescription(e.target.value);
                if (e.target.value.includes('@')) {
                  setShow(true);
                }
              }}
              ref={setReferenceElement}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, fugiat.
            </textarea>
            {show && (
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
                        setDescription(description.concat(`${x + ' '}`));
                        setStringLength(x.length);
                        setShow(false);
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(AddBlog);
