/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import vlogo from '../../images/vanitylogo3.png';
import { setAlert } from '../../actions/alert';
import { groupRegister } from '../../actions/auth';
import PropTypes from 'prop-types';

const Groupregister = ({ setAlert, groupRegister, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    groupName: '',
    userName: '',
    email: '',
    password: '',
    password2: '',
    isGroup: true,
    userpermission: false,
    // code: '',
  });

  const {
    groupName,
    userName,
    email,
    password,
    password2,
    isGroup,
    userpermission,
    // code,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      groupRegister({
        groupName,
        userName,
        email,
        password,
        isGroup,
        userpermission,
        // code,
      });
      setAlert('User Registered Successful', 'success');
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/welcomeRscreen' />;
  }

  return (
    <Fragment>
      <div id='signup' className='signup'>
        <div className='column-1 group'>
          <div className='logo-black'>
            <Link to='/'>
              <img src={vlogo} alt='' />
            </Link>
          </div>
        </div>

        <div className='column-2'>
          <div className='signup-column'>
            <div className='signup-top'>
              <h3 className='signup-heading'>Sign up to Vanity</h3>
            </div>

            <div className='signup-usertype'>
              <h4 className='signup-label'>
                Do you want to create an individual or Group account?
              </h4>
              <div className='ut-flexform'>
                <Link to='/register' className='ut-btn-light'>
                  individual
                </Link>
                <br />
                <Link to='/groupregister' className='ut-btn-light-border'>
                  Group
                </Link>
              </div>
            </div>

            <form className='flex-form-1' onSubmit={(e) => onSubmit(e)}>
              {/* <div className='usergroup'>
                <label htmlFor='referral-code' className='signup-label'>
                  Enter the referral code <span className='blue'>*</span>
                  <Link to='/referral'>
                    <span className='referral-request'>
                      Don't have a referral-code?
                    </span>
                  </Link>
                </label>
                <input
                  type='text'
                  name='code'
                  placeholder='Referal Code is required'
                  className='btn-light'
                  value={code}
                  required
                  onChange={(e) => onChange(e)}
                />
              </div> */}
              <div className='usergroup'>
                <label htmlFor='groupName' className='signup-label'>
                  Group Name
                </label>
                <input
                  type='text'
                  name='groupName'
                  value={groupName}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='usergroup'>
                <label htmlFor='userName' className='signup-label'>
                  UserName
                </label>
                <input
                  type='text'
                  name='userName'
                  value={userName}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='usergroup'>
                <label htmlFor='email' className='signup-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='usergroup'>
                <label htmlFor='create-password' className='signup-label'>
                  Create Password
                </label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='usergroup'>
                <label htmlFor='create-password' className='signup-label'>
                  Retype Password
                </label>
                <input
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={(e) => onChange(e)}
                  className='btn-light'
                />
              </div>

              <div className='user-permission usergroup'>
                Already have an account?{' '}
                <Link to='/login' className='referral-request'>
                  Login
                </Link>
              </div>

              <div className='user-permission usergroup'>
                <input
                  type='checkbox'
                  name='userpermission'
                  value={userpermission}
                  id='permission'
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      userpermission: !userpermission,
                    });
                  }}
                />{' '}
                Creating an account means you’re agree with our{' '}
                <a className='referral-request'>Terms of Service</a>,
                <a className='referral-request'> Privacy Policy</a>, and our
                default Notification Settings.
              </div>

              <button type='Submit' className='btn-yellow'>
                {' '}
                Sign Up
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

groupRegister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  groupRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, groupRegister })(
  Groupregister
);
