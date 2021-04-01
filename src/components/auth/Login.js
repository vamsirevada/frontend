import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import vlogo from '../../images/vanitylogo3.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/welcomescreen' />;
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
            <div className='signup-top'>
              <h3 className='signup-heading'>Login to Vanity</h3>
              <p className='signup-para'>
                Hey ! Welcome, Please login into your account
              </p>
              <p className='signup-para invite'>
                {' '}
                <Link to='/invite'>
                  <span className='referral-request-1'>Invite friends</span>
                </Link>
              </p>
            </div>
            <br className='hide' />
            <form className='flex-form-l1' onSubmit={(e) => onSubmit(e)}>
              <div className='usergroup'>
                <label htmlFor='email' className='signup-label'>
                  Email:
                </label>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='usergroup'>
                <label htmlFor='password' className='signup-label'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='fgt'>
                <Link to='/forgot-password' className='fgt-1'>
                  Forgot Password
                </Link>
                <Link to='/register'>
                  <span className='referral-request'>
                    Don't have an account?
                  </span>
                </Link>
              </div>
              <br />
              <button type='Submit' className='btn-yellow'>
                {' '}
                Login
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
