/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import nounEducation from '../../images/icons/noun_education_2177318.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';

const AddEducation = ({ profile: { profile }, addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
  });

  const [displayEdu, toogleEdu] = useState(false);
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData);
    setFormData({
      school: '',
      degree: '',
      fieldofstudy: '',
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
              <img className='breifcase' src={nounEducation} alt='edu' />{' '}
              <span className='m-1'>Education</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleEdu(!displayEdu)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displayEdu && (
            <Fragment>
              {/* feeling boxes  */}
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex prof-flex-e'>
                    <div>
                      <label htmlFor='school'>
                        Institute/ College/ School Name :
                      </label>
                      <input
                        type='text'
                        className='experience-input'
                        name='school'
                        value={school}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='organisation'>Degree/ Board</label>
                      <input
                        type='text'
                        className='experience-input'
                        name='degree'
                        value={degree}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='organisation'>Stream of Education</label>
                      <input
                        type='text'
                        className='experience-input'
                        name='fieldofstudy'
                        value={fieldofstudy}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <label htmlFor='duration'>Duration (month/year) :</label>
                      <div className='grid'>
                        <input
                          className='experience-input b-1'
                          type='month'
                          name='from'
                          value={from}
                          onChange={(e) => onChange(e)}
                          placeholder='from date'
                          required
                        />

                        <span className='c-align'>to</span>
                        <input
                          className='experience-input b-1'
                          type='month'
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
                          {/* <span>Current</span> */}
                          <label htmlFor='current'>current</label>
                        </div>
                      </div>
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
