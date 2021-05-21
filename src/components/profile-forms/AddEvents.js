/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../../actions/profile';
import nounevent from '../../images/icons/noun_event_1828492.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';

const AddEvents = ({ profile: { profile }, addEvent }) => {
  const [formData, setFormData] = useState({
    event: '',
    date: '',
    description: '',
  });

  const [displayEve, toogleEve] = useState(false);

  const { event, date, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    setFormData({
      event: '',
      date: '',
      description: '',
    });
  };

  return (
    <Fragment>
      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={nounevent} alt='edu' />{' '}
              <span className='m-1'>Events :</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleEve(!displayEve)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displayEve && (
            <Fragment>
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex-a1'>
                    <div>
                      <label htmlFor='event'>Event Name :</label>
                      <br />
                      <input
                        type='text'
                        name='event'
                        value={event}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='date'>Date(month/year) :</label> <br />
                      <input
                        className='b-1'
                        type='month'
                        name='date'
                        value={date}
                        onChange={(e) => onChange(e)}
                        placeholder='date'
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='description'>Description</label>
                      <br />
                      <textarea
                        name='description'
                        value={description}
                        onChange={(e) => onChange(e)}
                        id='award-des'
                        cols='30'
                        rows='5'
                      ></textarea>
                    </div>
                  </div>
                  <div className='prof-flex-btn'>
                    <button type='submit' className='btn-blue'>
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

AddEvents.propTypes = {
  addEvent: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addEvent })(AddEvents);
