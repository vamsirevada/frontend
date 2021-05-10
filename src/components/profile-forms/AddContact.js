/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../../actions/profile';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';

const AddContact = ({ profile: { profile }, addContact }) => {
  const [formData, setFormData] = useState({
    email: '',
    address: '',
  });

  const [displayAwd, toogleAwd] = useState(false);

  const { email, address } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addContact(formData);
    setFormData({
      email: '',
      address: '',
    });
  };

  return (
    <Fragment>
      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <span className='m-1'>Contact Us</span>{' '}
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
                      <label htmlFor='email'>Email :</label>
                      <br />
                      <input
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='address'>Address</label>
                      <br />
                      <textarea
                        name='address'
                        cols='30'
                        rows='5'
                        value={address}
                        onChange={(e) => onChange(e)}
                        required
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

AddContact.propTypes = {
  addContact: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addContact })(AddContact);
