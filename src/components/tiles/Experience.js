import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <div className='btn-gray'>
      <div>
        {exp.title}
        <button className='cross-1' onClick={() => deleteExperience(exp._id)}>
          <img src={nounPlus} alt='' />
        </button>
        <br />
        {exp.company} <br />
        <span className='font-light'>
          <Moment format='MMM YYYY'>{exp.from}</Moment> -{' '}
          {exp.to === null ? (
            'Now'
          ) : (
            <Moment format='MMM YYYY'>{exp.to}</Moment>
          )}
        </span>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className='prof-btn-1'>
        <div className='prof-btn-grid-1'>{experiences}</div>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
