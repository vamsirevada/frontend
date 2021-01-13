import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileAbout = ({
  profile: { bio, dob, gender, hometown, languageknown, user },
}) => {
  return (
    <div className='profile-des'>
      <div className='prof-container'>
        {bio && (
          <Fragment>
            <div>
              <h3>About:</h3>
              <p>{bio}</p>
            </div>
          </Fragment>
        )}

        {!user.isGroup && (
          <div className='profile-table'>
            <table>
              <thead></thead>

              <tbody>
                <tr>
                  <td className='font-bold'>Date of Birth :</td>
                  <td>
                    <span className='f-1'>
                      <Moment format='DD MMM YYYY'>{dob}</Moment>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='font-bold'>Gender :</td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td className='font-bold'>Hometown :</td>
                  <td>{hometown}</td>
                </tr>
                <tr>
                  <td className='font-bold'>Language proficiency : </td>
                  <td>{languageknown}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
