/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addClient } from '../../actions/profile';
import c31 from '../../images/Component 31.svg';
import cli from '../../images/client.svg';

const AddClients = ({ profile: { profile }, addClient }) => {
  const [formData, setFormData] = useState({
    client: '',
  });

  const [displaySkl, toogleSkl] = useState(false);

  const { client } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addClient(formData);
    setFormData({
      client: '',
    });
  };

  return (
    <Fragment>
      {/* skills */}

      <div id='prof-exp'>
        <div className='prof-exp-container'>
          <div className='prof-heading'>
            <h3>
              <img className='breifcase' src={cli} alt='' />
              <span className='m-1'>Our Clients</span>{' '}
            </h3>

            <div className='prof-heading-flex'>
              <a onClick={() => toogleSkl(!displaySkl)}>
                <img src={c31} alt='c31' />
              </a>
            </div>
          </div>

          {displaySkl && (
            <Fragment>
              {/* feeling boxes  */}
              <div className='prof-box'>
                <form onSubmit={(e) => onSubmit(e)} className='prof-left'>
                  <div className='prof-flex-a'>
                    <div>
                      <label htmlFor='Description'>Client Name :</label>
                      <br />
                      <input
                        name='client'
                        id='client'
                        value={client}
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

AddClients.propTypes = {
  addClient: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addClient })(AddClients);
