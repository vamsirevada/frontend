/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';
import { connect } from 'react-redux';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const ProfileEducation = ({
  education: { _id, school, degree, fieldofstudy, from, to },
  deleteEducation,
  show,
}) => (
  <div className='btn-gray'>
    <div className='flex-1'>
      {/* <div className='prof-dp'></div> */}
      <div className='m-1'>
        {school}
        <br />
        {degree}, {fieldofstudy}
        {show && (
          <a className='cross-2' onClick={() => deleteEducation(_id)}>
            <img src={nounPlus} alt='' />
          </a>
        )}
        <br />
        <span className='font-light'>
          <Moment format='MMM YYYY'>{from}</Moment> -{' '}
          {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
        </span>
      </div>
    </div>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(ProfileEducation);
