import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteAward } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const ProfileAward = ({
  awards: { _id, award, date, description },
  deleteAward,
}) => (
  <div className='btn-gray btn-gray-1' href='#!'>
    <div className='flex-1'>
      <div className='prof-dp-1'></div>

      <div className='m-1'>
        {award} - <Moment format='YYYY'>{date}</Moment>
        <br />
        <a href='#!' className='cross-3' onClick={() => deleteAward(_id)}>
          <img src={nounPlus} alt='' />
        </a>
        <p className='font-light'>{description}</p>
      </div>
    </div>
  </div>
);

ProfileAward.propTypes = {
  awards: PropTypes.object.isRequired,
};

export default connect(null, { deleteAward })(ProfileAward);
