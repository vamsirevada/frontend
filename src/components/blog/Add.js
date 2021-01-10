import React, { useEffect } from 'react';
import ArticleForm from '../article/ArticleForm';
import Navbar from '../layout/NavbarBlog';
import { connect } from 'react-redux';
import { loadWriter } from '../../actions/auth';

const Add = ({ auth: { user }, loadWriter }) => {
  useEffect(() => {
    loadWriter();
    loadWriter();
  }, [loadWriter]);
  return (
    <>
      <Navbar dislogout={true} />
      <div className='form-container'>
        <div className='main-form'>
          <div className='username'>
            <h1>
              {' '}
              Welcome <span className='yellow'>{user && user.name}</span>{' '}
            </h1>
          </div>
          <div>{/* <FileUpload /> */}</div>

          <div>
            <ArticleForm />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadWriter })(Add);
