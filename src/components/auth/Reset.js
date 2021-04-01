/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import vlogo from '../../images/vanitylogo3.png';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const loading = {
  margin: '1em',
  fontSize: '24px',
};

export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      message: '',
    };
  }

  resetPassword = async (e) => {
    e.preventDefault();
    this.setState({ message: '', error: '' });
    await api
      .put('/password/reset-password', {
        newPassword: this.state.password,
        resetPasswordLink: this.props.match.params.resetPasswordToken,
      })
      .then((data) => {
        if (data.data.error) {
          this.setState({ error: true });
          this.setState({ error: data.data.error, newPassword: '' });
        } else {
          this.setState({ message: data.data.message, newPassword: '' });
          this.setState({ updated: true });
        }
      });
  };

  render() {
    const { password, error, isLoading, updated } = this.state;
    if (error) {
      return (
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
                <h3 className='signup-heading'>Password Reset Screen</h3>
                <p className='signup-para'>Not recieved yet ?</p>
                <Link to='/forgot-password'>Send</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
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
              <h3 className='signup-heading'>Password Reset Screen</h3>
            </div>
            <br />
            {this.state.message && (
              <div>
                <p>{this.state.message}</p>
                <Link to='/login'>Login</Link>
              </div>
            )}
            <div style={{ display: this.state.message.length ? 'none' : '' }}>
              <form onSubmit={this.resetPassword} className='profile-form'>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) =>
                    this.setState({
                      password: e.target.value,
                      message: '',
                      error: '',
                    })
                  }
                  className='btn-light'
                />
                <button type='submit' className='btn-yellow'>
                  {' '}
                  Update Password
                </button>
              </form>
              <div>
                <p style={{ marginTop: 11 }} className='signup-para'>
                  Not recieved yet ?
                </p>
                <Link to='/forgot-password'>Send</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
