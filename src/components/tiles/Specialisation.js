import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const Specialisation = ({ skills }) => {
  const skill = skills.map((skl) => (
    <div className='flex-1'>
      <div>
        <p>{skl.skill}</p>
        <a href='#!' className='cross-4'>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className='prof-btn'>
        <div className='prof-btn-grid prof-btn-grid-3'>{skill}</div>
      </div>
    </Fragment>
  );
};

Specialisation.propTypes = {
  skills: PropTypes.object.isRequired,
};

export default connect(null, null)(Specialisation);
