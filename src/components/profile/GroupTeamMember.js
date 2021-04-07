/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteMember } from '../../actions/profile';
import { connect } from 'react-redux';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const GroupTeamMember = ({
  teammember: { _id, name, status, from, to },
  deleteMember,
  show,
}) => (
  <div className='btn-gray'>
    <div>
      {name}
      <br />
      {status} <br />
      {show && (
        <a className='cross-1' onClick={() => deleteMember(_id)}>
          <img src={nounPlus} alt='' />
        </a>
      )}
      <span className='font-light'>
        <Moment format='MMM YYYY'>{from}</Moment> -{' '}
        {to === null ? 'Now' : <Moment format='MMM YYYY'>{to}</Moment>}
      </span>
    </div>
  </div>
);

GroupTeamMember.propTypes = {
  teammember: PropTypes.object.isRequired,
};

export default connect(null, { deleteMember })(GroupTeamMember);
