/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteSkills } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const ProfileSkill = ({ skills: { skill }, deleteSkills, show }) => (
  <div className='flex-1 btn-gray'>
    <div className='prof-dp-1'>{/* <img src={photoShop} alt='' /> */}</div>
    <div className='m-1'>
      <p>{skill}</p>
      {show && (
        <a className='cross-4' onClick={() => deleteSkills(skill._id)}>
          <img src={nounPlus} alt='' />
        </a>
      )}
    </div>
  </div>
);

ProfileSkill.propTypes = {
  skills: PropTypes.object.isRequired,
};

export default connect(null, { deleteSkills })(ProfileSkill);
