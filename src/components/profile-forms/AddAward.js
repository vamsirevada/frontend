/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addAward } from '../../actions/profile';
import nounAwards from '../../images/icons/noun_Trophy_2135552.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';

const AddAward = ({ profile: { profile, display }, addAward }) => {
  const [formData, setFormData] = useState({
    award: '',
    date: '',
    description: '',
  });

  const [displayAwd, toogleAwd] = useState(false);

  const { award, date, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addAward(formData);
    setFormData({
      award: '',
      date: '',
      description: '',
    });
  };

  // const { awards } = profile;

  return (
    <Fragment>
      {/* Awards & Honours */}

      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={nounAwards} alt='award' />{' '}
              <span className='m-1'>Awards & honours</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleAwd(!displayAwd)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displayAwd && (
            <Fragment>
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex-a'>
                    <div>
                      <label htmlFor='Award'>Award Name :</label>
                      <br />
                      <input
                        type='text'
                        name='award'
                        value={award}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='duration'>Date(month/year) :</label>
                      <br />
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
                      <label htmlFor='Description'>Description</label>
                      <br />
                      <textarea
                        name='description'
                        id='award-des'
                        cols='30'
                        rows='5'
                        value={description}
                        onChange={(e) => onChange(e)}
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

AddAward.propTypes = {
  addAward: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addAward })(AddAward);
