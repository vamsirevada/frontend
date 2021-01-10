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
  // const { teammembers } = profile;

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
              <a onClick={() => toogleAdd(!displayAdd)} href='#!'>
                <img src={c31} alt='c31' />
                {/* <h4>
                  <span className='bg-1'>Add</span>
                </h4> */}
              </a>
            </div>
          </div>

          {/* {profile.teammembers === null ? (
            <Fragment>
              <p>Add Team Members</p>
            </Fragment>
          ) : (
            <TeamMembers
              key={profile.teammembers._id}
              teammembers={profile.teammembers}
            />
          )} */}

          {/* <!-- filling boxes --> */}

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
                      />
                    </div>
                    <div>
                      <label htmlFor='status'>Designation :</label>
                      <input
                        type='text'
                        name='status'
                        value={status}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    {/* <div>
                      <label htmlFor='organisation'>
                        Organisation/Company Name :
                      </label>
                      <input type='text' name='organisation' />
                    </div> */}
                    <div>
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
                          {/* <span>Current</span> */}
                          <label htmlFor='current'>current</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='prof-flex-btn'>
                    <button className='btn-blue' type='submit' href='#!'>
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
