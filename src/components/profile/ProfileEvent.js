/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/profile';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import thumbnail from '../../images/icons/Thumbnail-01.png';

const ProfileEvent = ({
  events: { _id, event, date, description },
  deleteEvent,
  show,
}) => (
  <div className='btn-gray btn-gray-1'>
    <div className='flex-1'>
      <div className='prof-dp-1'>
        <img src={thumbnail} alt='' />
      </div>
      <div className='m-1'>
        {event} - <Moment format='YYYY'>{date}</Moment>
        {show && (
          <a className='cross-5' onClick={() => deleteEvent(_id)}>
            <img src={nounPlus} alt='' />
          </a>
        )}
        <br />
        <p className='font-light'>{description}</p>
      </div>
    </div>
  </div>
);

ProfileEvent.propTypes = {
  events: PropTypes.object.isRequired,
};

export default connect(null, { deleteEvent })(ProfileEvent);
