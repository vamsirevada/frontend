import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSkills } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const Skill = ({ skills, deleteSkills }) => {
  const skilltile = skills.map((skl) => (
    <div className='flex-1'>
      <div className='prof-dp-1'>{/* <img src={photoShop} alt='' /> */}</div>
      <div className='m-1'>
        <p>{skl.skill}</p>
        <button className='cross-4' onClick={() => deleteSkills(skl._id)}>
          <img src={nounPlus} alt='' />
        </button>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className='prof-btn'>
        <div className='prof-btn-grid'>{skilltile}</div>
      </div>
    </Fragment>
  );
};

Skill.propTypes = {
  skills: PropTypes.array.isRequired,
  deleteSkills: PropTypes.func.isRequired,
};

export default connect(null, { deleteSkills })(Skill);
