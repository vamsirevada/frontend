import React, { Fragment, useState } from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import { getProfiles } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { notePeople } from '../../actions/profile';
import logo from '../../images/dummyimage.jpg';

const NotePeoplePopUp = ({
  show,
  close,
  id,
  avatar,
  status,
  user,
  notePeople,
}) => {
  const [formData, setFormData] = useState({
    remark: '',
  });

  const { remark } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    notePeople(id, formData);
  };

  return (
    <>
      {show && (
        <Fragment>
          <div className='memberpopupscreen note'>
            <div className='memberpopup add'>
              <div className='mem-heading add'>
                <h3>Note People for future reference</h3>
                <a href='#!' className='member-cross' onClick={close}>
                  <img src={nounPlus} alt='' />
                </a>
              </div>

              <div className='body add note'>
                <div className='noteform'>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                      <label htmlFor='remark'>Note Remark :</label>
                      <br />
                      <input
                        type='text'
                        name='remark'
                        className='remark'
                        value={remark}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='prof-flex-btn'>
                      <button className='btn-blue note' type='submit'>
                        Note
                      </button>
                    </div>
                  </form>
                </div>
                <div className='post'>
                  <div className='post-heading'>
                    <div className='flex'>
                      <Link to={`portfolio/${user?._id}`}>
                        <div className='display-pic'>
                          <img
                            className='display-pic'
                            src={avatar ? avatar : logo}
                            alt=''
                          />
                        </div>
                      </Link>

                      <div className='name-lato'>
                        {' '}
                        <Link to={`portfolio/${user?._id}`}>
                          {user?.fullName && user?.fullName}{' '}
                          {user?.groupName && user?.groupName} <br />
                        </Link>{' '}
                        <span className='third-bold'>{status}</span> <br />
                        <span className='date-lato'>
                          {/* <span className='f-1'>
                            <Moment format='hh:mm A'>{date}</Moment>
                            {', '}
                            <Moment format='DD MMM YY'>{date}</Moment>
                          </span> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default connect(null, { getProfiles, notePeople })(NotePeoplePopUp);
