import React from 'react';
import PropTypes from 'prop-types';
import { deleteSpecialisation } from '../../actions/profile';
import { connect } from 'react-redux';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const GroupProfileSpecs = ({ skill: { _id, skill }, deleteSpecialisation }) => {
  return (
    <div className='flex-1'>
      <p>{skill}</p>
      <a
        href='#!'
        className='cross-4'
        onClick={() => deleteSpecialisation(_id)}
      >
        <img src={nounPlus} alt='' />
      </a>
    </div>
  );
};

GroupProfileSpecs.propTypes = {
  skill: PropTypes.object.isRequired,
};

export default connect(null, { deleteSpecialisation })(GroupProfileSpecs);
