import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const PortfolioLeftAbout = ({
  profile: { bio, dob, gender, languageknown, user },
}) => {
  return (
    <Fragment>
      <div className='about'>
        <h3>About:</h3>
        <p>{bio}</p>
      </div>
      {!user.isGroup && (
        <div className='profile-table'>
          <table>
            <thead></thead>

            <tbody>
              {/* <tr>
                <td className='font-bold'>Date of Birth :</td>
                <td className='font-light'>
                  <span className='f-1'>
                    <Moment format='DD MMM YYYY'>{dob}</Moment>
                  </span>
                </td>
              </tr> */}
              <tr>
                <td className='font-bold'>Gender : </td>
                <td className='font-light'>{gender}</td>
              </tr>
              <tr>
                <td className='font-bold'>Language proficiency : </td>
                <td className='font-light'>{languageknown}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

PortfolioLeftAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default PortfolioLeftAbout;
