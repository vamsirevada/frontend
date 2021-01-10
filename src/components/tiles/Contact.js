import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const Contact = ({ clients }) => {
  const clien = clients.map((cli) => (
    <div className='flex-1'>
      <div>
        <p>{cli.client}</p>
        <a href='#!' className='cross-4'>
          <img src={nounPlus} alt='' />
        </a>
      </div>
    </div>
  ));
  return (
    <Fragment>
      <div className='prof-btn'>
        <div className='prof-btn-grid prof-btn-grid-3'>{clien}</div>
      </div>
    </Fragment>
  );
};

Contact.propTypes = {
  clients: PropTypes.object.isRequired,
};

export default connect(null, null)(Contact);
