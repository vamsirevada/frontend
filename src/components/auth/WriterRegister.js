import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import vlogo from '../../images/vanitylogo3.png';
import { setAlert } from '../../actions/alert';
import { writerRegister } from '../../actions/auth';
import PropTypes from 'prop-types';

const WriterRegister = ({ setAlert, writerRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      writerRegister({ name, email, password });

      setAlert('Writer Registered Successful', 'success');
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/add' />;
  }

  return (
    <Fragment>
      <div id='signup' className='signup'>
        <div className='column-1'>
          <div className='logo-black'>
            <Link to='/'>
              <img src={vlogo} alt='' />
            </Link>
          </div>
        </div>

        <div className='column-2'>
          <div className='signup-column'>
            <form onSubmit={onSubmit} className='form-container register-form'>
              <div className='main-form'>
                <h1 className='mb-2'>Account Register</h1>
                <label htmlFor='name'>Name</label>
                <br />
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChange}
                />
                <br />
                <label htmlFor='email'>Email Address</label>
                <br />
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                <br />
                <label htmlFor='password'>Password</label>
                <br />
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  minLength='6'
                />
                <br />
                <label htmlFor='password2'>Confirm Password</label>
                <br />
                <input
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  minLength='6'
                />
                <br />

                <div>
                  <input type='submit' value='Register' className='button' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

WriterRegister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  writerRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, writerRegister })(
  WriterRegister
);
