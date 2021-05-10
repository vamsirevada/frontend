/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from 'react';
// import maskGroup from '../../images/maskGroup.svg';
import maskGroup1 from '../../images/Vanity_logo-09.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavbarBlog = ({ logout, dislogout }) => {
  return (
    <Fragment>
      <div className='navbar'>
        <div className='s-logo'>
          <Link to='/'>
            <img src={maskGroup1} alt='Vanity' />
          </Link>
        </div>

        <div className='container blog'>
          <div className='logo-box'>
            <Link to='/blog' className='hide'></Link>
          </div>

          <div className='nav-icons'>
            {dislogout && (
              <ul>
                <li>
                  <a onClick={logout} className='signOut'>
                    Log out
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NavbarBlog.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(NavbarBlog);
