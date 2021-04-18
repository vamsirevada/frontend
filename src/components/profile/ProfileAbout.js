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
              <div className='flex-a'>
                {/* <LabelImportantIcon /> */}
                <h3 className='m-1'>About:</h3>
              </div>
              <p>{bio}</p>
            </div>
          </Fragment>
        )}
        <div className='profile-table'>
          <table>
            <thead></thead>

            <tbody>
              {dob && (
                <tr>
                  <td className='font-bold m-1'>Date of Birth :</td>
                  <td>
                    <span className='f-1'>
                      <Moment format='DD MMM YYYY'>{dob}</Moment>
                    </span>
                  </td>
                </tr>
              )}
              {gender && (
                <tr>
                  <td className='font-bold m-1'>Gender :</td>
                  <td>{gender}</td>
                </tr>
              )}
              {hometown && (
                <tr>
                  <td className='font-bold m-1'>Hometown :</td>
                  <td>{hometown}</td>
                </tr>
              )}
              {languageknown && (
                <tr>
                  <td className='font-bold m-1'>Language proficiency : </td>
                  <td>{languageknown}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
