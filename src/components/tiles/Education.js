import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <div className='btn-gray'>
      <div className='flex-1'>
        {/* <div className='prof-dp'></div> */}
        <div className='m-1'>
          {edu.school}
          <button className='cross-2' onClick={() => deleteEducation(edu._id)}>
            <img src={nounPlus} alt='' />
          </button>
          <br />
          {edu.degree}, {edu.fieldofstudy}
          <br />
          <span className='font-light'>
            <Moment format='MMM YYYY'>{edu.from}</Moment> -{' '}
            {edu.to === null ? (
              'Now'
            ) : (
              <Moment format='MMM YYYY'>{edu.to}</Moment>
            )}
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className='prof-btn-1'>
        <div className='prof-btn-grid-1'>{educations}</div>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
