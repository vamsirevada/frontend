/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';
import { connect } from 'react-redux';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const ProfileExperience = ({
  experience: { _id, title, company, project, description, location, from, to },
  deleteExperience,
  show,
}) => (
  <div className='btn-gray'>
    <div className='profile-table'>
      {show && (
        <a className='cross-1' onClick={() => deleteExperience(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      )}
      <table>
        <thead></thead>

        <tbody>
          <tr>
            <td className='font-bold'>Designation :</td>
            <td className='font-light'>{title}</td>
          </tr>
          <tr>
            <td className='font-bold'>Project Name: </td>
            <td className='font-light'>{project}</td>
          </tr>
          <tr>
            <td className='font-bold'>Company: </td>
            <td className='font-light'>{company}</td>
          </tr>
          <tr>
            <td className='font-bold'>Location: </td>
            <td className='font-light'>{location}</td>
          </tr>
          <tr>
            <td className='font-bold white-space-desc'>Description: </td>
            <td className='font-light'>{description}</td>
          </tr>
          <tr>
            <td className='font-bold'>Timeline: </td>
            <td className='font-light'>
              <Moment format='MMM YYYY'>{from}</Moment> -{' '}
              {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {/* <div>
      Designation: {title}
      {show && (
        <a className='cross-1' onClick={() => deleteExperience(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      )}
      <br />
      Project Name:{project}
      <br />
      Company: {company} <br />
      Location: {location} <br />
      <p className='white-space-desc'>Description: {description}</p> <br />
      <span className='font-light'>
        <Moment format='MMM YYYY'>{from}</Moment> -{' '}
        {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
      </span>
    </div> */}
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ProfileExperience);
