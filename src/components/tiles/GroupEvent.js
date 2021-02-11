import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
// import { deleteEvent } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const GroupEvent = ({ events }) => {
  const eventtile = events.map((eve) => (
    <div className='btn-gray btn-gray-1'>
      <div className='flex-1'>
        <div className='prof-dp-2'></div>
        <div className='m-1'>
          {eve.event} - <Moment format='YYYY'>{eve.date}</Moment>
          <button className='cross-5'>
            <img src={nounPlus} alt='' />
          </button>
          <br />
          <p className='font-light'>{eve.description}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className='prof-btn-1'>
        <div className='prof-btn-grid-1'>{eventtile}</div>
      </div>
    </Fragment>
  );
};

GroupEvent.propTypes = {
  events: PropTypes.array.isRequired,
};

export default connect(null, null)(GroupEvent);
