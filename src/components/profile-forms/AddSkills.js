/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addSkills } from '../../actions/profile';
import nounSkill from '../../images/icons/noun_skill_1863702.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';

const AddSkills = ({ profile: { profile }, addSkills }) => {
  const [formData, setFormData] = useState({
    skill: '',
  });

  const [displaySkl, toogleSkl] = useState(false);

  const { skill } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addSkills(formData);
    setFormData({
      skill: '',
    });
  };

  return (
    <Fragment>
      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={nounSkill} alt='edu' />{' '}
              <span className='m-1'>Skills</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleSkl(!displaySkl)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displaySkl && (
            <Fragment>
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex-a'>
                    <div>
                      <label htmlFor='Description'>skill :</label>
                      <br />
                      <input
                        name='skill'
                        id='skill'
                        value={skill}
                        onChange={(e) => onChange(e)}
                        required
                      ></input>
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

AddSkills.propTypes = {
  addSkills: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addSkills })(AddSkills);
