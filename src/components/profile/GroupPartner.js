import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePartner } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const GroupPartner = ({ partner: { _id, partner }, deletePartner }) => {
  return (
    <div className='flex-1 btn-gray'>
      <div className='prof-dp-1'>
        <img src='./images/Image 135.png' alt='' />
      </div>
      <div className='m-1'>
        <p>{partner}</p>
        <a href='#!' className='cross-5' onClick={() => deletePartner(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  );
};

GroupPartner.propTypes = {
  partner: PropTypes.object.isRequired,
};

export default connect(null, { deletePartner })(GroupPartner);
