import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSpecialisation } from '../../actions/profile';
import c31 from '../../images/Component 31.svg';

const AddSpecialisation = ({ profile: { profile }, addSpecialisation }) => {
  const [formData, setFormData] = useState({
    skill: '',
  });

  const [displaySkl, toogleSkl] = useState(false);

  const { skill } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addSpecialisation(formData);
    setFormData({
      skill: '',
    });
  };

  return (
    <Fragment>
      {/* skills */}

      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <span className='m-1'>Specialisation</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleSkl(!displaySkl)} href='#!'>
                <img src={c31} alt='c31' />
                {/* <h4>
                  <span className='bg-1'>Add</span>
                </h4> */}
              </a>
            </div>
          </div>

          {/* {profile.skills === null ? (
            <Fragment>
              <p>Please Add this field</p>
            </Fragment>
          ) : (
            <Specialisation key={profile.skills._id} skills={profile.skills} />
          )} */}

          {displaySkl && (
            <Fragment>
              {/* feeling boxes  */}
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex-a'>
                    <div>
                      <label htmlFor='Description'>Specialized in :</label>
                      <br />
                      <input
                        name='skill'
                        id='skill'
                        value={skill}
                        onChange={(e) => onChange(e)}
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

AddSpecialisation.propTypes = {
  addSpecialisation: PropTypes.func.isRequired,
  getCurrentGroupProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addSpecialisation,
})(AddSpecialisation);
