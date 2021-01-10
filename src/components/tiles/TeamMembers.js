import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const TeamMembers = ({ teammembers }) => {
  const team = teammembers.map((team) => (
    <div className='btn-gray'>
      <div>
        {team.name}
        <br />
        {team.status} <br />
        <span className='font-light'>
          <Moment format='MMM YYYY'>{team.from}</Moment> -{' '}
          {team.to === null ? (
            'Now'
          ) : (
            <Moment format='MMM YYYY'>{team.to}</Moment>
          )}
        </span>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className='prof-btn-1'>
        <div className='prof-btn-grid-1'>{team}</div>
      </div>
    </Fragment>
  );
};

TeamMembers.propTypes = {
  teammembers: PropTypes.object.isRequired,
};

export default connect(null, null)(TeamMembers);
