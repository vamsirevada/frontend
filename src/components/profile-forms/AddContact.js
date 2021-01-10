import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../../actions/profile';
// import nounAwards from '../../images/icons/noun_Trophy_2135552.svg';
import PropTypes from 'prop-types';
import c31 from '../../images/Component 31.svg';
// import Award from '../tiles/Award';

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
              {/* <img className='breifcase' src={nounAwards} alt='award' />{' '} */}
              <span className='m-1'>Contact Us</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleAwd(!displayAwd)} href='#!'>
                <img src={c31} alt='c31' />
                {/* <h4>
                  <span className='bg-1'>Add Contact Details</span>
                </h4> */}
              </a>
            </div>
          </div>

          {/* {awards === null ? (
            <p>Please Add this field</p>
          ) : (
            <Award awards={awards} />
          )} */}

          {displayAwd && (
            <Fragment>
              {/* feeling boxes  */}
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
                      ></textarea>
                    </div>
                  </div>

                  <div className='prof-flex-btn'>
                    <button type='submit' className='btn-blue' href='#!'>
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
