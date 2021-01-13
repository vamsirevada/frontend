import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import vlogo from '../../images/vanitylogo3.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginWriter } from '../../actions/auth';

const WriterLogin = ({ loginWriter, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    loginWriter(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/add' />;
  }

  return (
    <Fragment>
      <div id='login' className='login'>
        <div className='column-l1'>
          <div className='logo-black'>
            <Link to='/'>
              <img src={vlogo} alt='' />
            </Link>
          </div>
        </div>

        <div className='column-l2'>
          <div className='login-column'>
            <form onSubmit={onSubmit} className='form-container login-form'>
              <div className='main-form'>
                <h4 className='mb-2'>Vanity Writer Login</h4>

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
                />
                <br />

                <div>
                  <input type='submit' value='Login' className='button' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

WriterLogin.propTypes = {
  loginWriter: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginWriter })(WriterLogin);
