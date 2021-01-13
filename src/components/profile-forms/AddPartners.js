import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPartner } from '../../actions/profile';
import c31 from '../../images/Component 31.svg';
import specialisation from '../../images/specialisation.svg';

const AddPartners = ({ profile: { profile }, addPartner }) => {
  const [formData, setFormData] = useState({
    partner: '',
  });

  const [displaySkl, toogleSkl] = useState(false);

  const { partner } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addPartner(formData);
    setFormData({
      partner: '',
    });
  };

  return (
    <Fragment>
      {/* skills */}

      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={specialisation} alt='' />
              <span className='m-1'>Our Partners</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleSkl(!displaySkl)} href='#!'>
                <img src={c31} alt='c31' />
                {/* <h4>
                  <span className='bg-1'>Add Partners</span>
                </h4> */}
              </a>
            </div>
          </div>

          {/* gray boxes  */}
          {/* {profile.partners === null ? (
            <Fragment>
              <p>Add Team Members</p>
            </Fragment>
          ) : (
            <Partner key={profile.partners._id} partners={profile.partners} />
          )} */}

          {displaySkl && (
            <Fragment>
              {/* feeling boxes  */}
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex-a'>
                    <div>
                      <label htmlFor='Description'>partners Name :</label>
                      <br />
                      <input
                        name='partner'
                        id='partner'
                        value={partner}
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

AddPartners.propTypes = {
  addPartner: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addPartner })(AddPartners);
