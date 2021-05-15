import React, { useState } from 'react';
import { projectFirestore, timestamp } from '../../firebase/config';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import api from '../../utils/api';
import { usePopper } from 'react-popper';
import { Fragment } from 'react';

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

const AddBlog = ({ suggestions, setAlert }) => {
  const [state, setState] = useState({
    description: '',
    link: '',
    show: false,
    stringlength: 0,
  });
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = projectFirestore.collection('images');
    if (state.link === '') {
      setAlert('Blog Link is required', 'danger');
    } else if (state.description === '') {
      setAlert('Description is required', 'danger');
    } else {
      const createdAt = await timestamp();
      const token = await localStorage.getItem('token');
      const user = await parseJwt(token);
      const userId = user?.user?.id;
      const Id = uuidv4();
      const body = {
        text: state.description,
        url: state.link,
        type: 'Blog',
        user: userId,
      };
      await api
        .post('/posts', body)
        .then(async (res) => {
          await collectionRef.add({
            type: 'Blog',
            url: state.link,
            description: state.description,
            createdAt,
            userId,
            Id,
          });
          await setAlert('Portfolio updated Successfully', 'success');
          setState({
            description: '',
            link: '',
          });
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
            value={state.link}
            onChange={(e) =>
              setState({
                ...state,
                link: e.target.value,
              })
            }
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
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Suscipit, fugiat.
            </textarea>
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
export default connect(null, { setAlert })(AddBlog);
