import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import vlogo from '../../images/vanitylogo3.png';
import api from '../../utils/api';

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: '',
      showError: false,
      error: '',
      showNullError: false,
    };
  }

  sendEmail = async (e) => {
    e.preventDefault();
    this.setState({ message: '', error: '' });
    const { email } = this.state;
    if (email === '') {
      console.log('email');
      this.setState({
        showError: false,
        message: '',
        showNullError: true,
      });
    } else {
      await api.put('/password/forgot-password', { email }).then((response) => {
        if (response.data.error) {
          this.setState({ error: response.data.error });
        } else {
          this.setState({ message: response.data.message });
        }
      });
    }
  };

  render() {
    const { email, message, showNullError, showError } = this.state;
    return (
      <Fragment>
        <div id='forgot' className='forgot'>
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
                <h3 className='signup-heading'>Forgot Password</h3>
                <p
                  style={{ display: this.state.message.length ? 'none' : '' }}
                  className='signup-para'
                >
                  Enter the email address you used while registering
                  <br />
                  and we'll send you a link to reset your password
                </p>
              </div>
              {/* <br /> */}
              {message && <h3>{message}</h3>}
              <form
                style={{ display: this.state.message.length ? 'none' : '' }}
                className='flex-form-l1'
                onSubmit={this.sendEmail}
              >
                <div className='usergroup'>
                  <label htmlFor='email' className='signup-label'>
                    E-mail address
                  </label>
                  <input
                    type='text'
                    name='email'
                    value={email}
                    onChange={(e) =>
                      this.setState({
                        email: e.target.value,
                        message: '',
                        error: '',
                      })
                    }
                    placeholder='Email Address'
                    className='btn-light'
                  />
                </div>
                <div className='fgt'>
                  <Link to='/register'>
                    <span className='referral-request'>
                      Don't have an account?
                    </span>
                  </Link>
                </div>
                <br />
                <button type='submit' className='btn-yellow'>
                  {' '}
                  Send reset Link
                </button>
              </form>
              {showNullError && (
                <div>
                  <p>The email address cannot be null.</p>
                </div>
              )}
              {showError && (
                <div>
                  <p>
                    That email address is not recognized. Please try again or
                    register for a new account.
                  </p>
                  <Link to='/register'>Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
