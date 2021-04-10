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
    <div>
      {title}
      {show && (
        <a className='cross-1' onClick={() => deleteExperience(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      )}
      <br />
      {project}
      <br />
      {company} <br />
      {location} <br />
      {description} <br />
      <span className='font-light'>
        <Moment format='MMM YYYY'>{from}</Moment> -{' '}
        {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
      </span>
    </div>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ProfileExperience);
