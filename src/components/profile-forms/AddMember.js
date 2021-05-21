/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMembers } from '../../actions/profile';
import c31 from '../../images/Component 31.svg';

const AddMember = ({ profile: { profile }, addMembers }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    from: '',
    to: '',
    current: false,
  });

  const [displayAdd, toogleAdd] = useState(false);
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { name, status, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addMembers(formData);
    setFormData({
      name: '',
      status: '',
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
              <span className='m-1'>Team Members </span>{' '}
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
                <form className='prof-left' onSubmit={(e) => onSubmit(e)}>
                  <div className='prof-flex'>
                    <div>
                      <label htmlFor='name'>Name :</label>
                      <input
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor='status'>Designation :</label>
                      <input
                        type='text'
                        name='status'
                        value={status}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    {/* <div>
                      <label htmlFor='organisation'>
                        Organisation/Company Name :
                      </label>
                      <input type='text' name='organisation' />
                    </div> */}
                    <div>
                      <label htmlFor='duration'>Duration (month/year) :</label>
                      <div className='grid'>
                        <input
                          className='b-1'
                          type='month'
                          name='from'
                          value={from}
                          onChange={(e) => onChange(e)}
                          placeholder='from date'
                          required
                        />

                        <span className='c-align'>to</span>
                        <input
                          className='b-1'
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
                          <label htmlFor='current'>current</label>
                        </div>
                      </div>
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

AddMember.propTypes = {
  addMembers: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { addMembers })(AddMember);
