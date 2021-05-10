import React from 'react';
import PropTypes from 'prop-types';

const GroupProfileFound = ({ profile: { founder } }) => {
  return (
    <div id='prof-exp'>
      <div className='prof-exp-container'>
        <div className='prof-heading mb-1'>
          <h3>
            {' '}
            <span className='m-1'>Founder :</span>{' '}
          </h3>
        </div>

        <div className='prof-btn-1'>
          <div className='prof-btn-grid-1'>
            <div className='flex-1 '>
              <div className='prof-dp-4 m-1'></div>
              <div className='font-dark m-1'>
                {founder}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupProfileFound.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default GroupProfileFound;
