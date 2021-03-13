/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import nounBriefcase from '../../images/icons/nounBriefcase.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    project: '',
    description: '',
    location: '',
    from: '',
    to: '',
    current: false,
  });

  const [displayAdd, toogleAdd] = useState(false);
  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    title,
    company,
    from,
    to,
    current,
    project,
    description,
    location,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData);
    setFormData({
      title: '',
      company: '',
      project: '',
      description: '',
      location: '',
      from: '',
      to: '',
      current: false,
    });
  };

  return (
    <Fragment>
      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={nounBriefcase} alt='briefcase' />{' '}
              <span className='m-1'>Professional Experience</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleAdd(!displayAdd)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displayAdd && (
            <Fragment>
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex'>
                    <div>
                      <label htmlFor='Designation'>Designation :</label>
                      <input
                        type='text'
                        name='title'
                        value={title}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='organisation'>Company Name :</label>
                      <input
                        type='text'
                        name='company'
                        value={company}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='project'>Project Name :</label>
                      <input
                        type='text'
                        name='project'
                        value={project}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='location'>Location :</label>
                      <input
                        type='text'
                        name='location'
                        value={location}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className='last'>
                      <label htmlFor='duration'>Duration :</label>
                      <div className='grid'>
                        <input
                          className='b-1'
                          type='date'
                          name='from'
                          value={from}
                          onChange={(e) => onChange(e)}
                          placeholder='from date'
                        />

                        <span className='c-align'>to</span>
                        <input
                          className='b-1'
                          type='date'
                          name='to'
                          value={to}
                          onChange={(e) => onChange(e)}
                          disabled={toDateDisabled ? 'disabled' : ''}
                          placeholder='to date'
                        />
                        <div className='c-flex'>
                          <input
                            type='checkbox'
                            name='current'
                            checked={current}
                            value={current}
                            onChange={(e) => {
                              setFormData({ ...formData, current: !current });
                              toggleDisabled(!toDateDisabled);
                            }}
                          />{' '}
                          <label htmlFor='current'>current</label>
                        </div>
                      </div>
                    </div>
                    <div className='last'>
                      <label htmlFor='Description'>Description</label>
                      <br />
                      <textarea
                        name='description'
                        id='award-des'
                        cols='30'
                        rows='5'
                        type='text'
                        value={description}
                        onChange={(e) => onChange(e)}
                      ></textarea>
                    </div>
                  </div>

                  <div className='prof-flex-btn'>
                    <button className='btn-blue' type='submit'>
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
