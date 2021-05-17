import React, { useState } from 'react';
import logo from '../../images/dummyimage.jpg';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import { Link } from 'react-router-dom';
import { getRealtimeData, portfolioAcknowledge } from '../../actions/portfolio';
import { useDispatch } from 'react-redux';

const PortfolioAcknowledgePopup = ({ auth, file, close }) => {
  const dispatch = useDispatch();
  const [acktext, setAckText] = useState('');
  const [ackcomment, setAckComment] = useState('');

  const acknowledge = (file) => {
    const acknowledgeObj = {
      user: auth?.user?._id,
      fullName: auth?.user?.fullName
        ? auth?.user?.fullName
        : auth?.user?.groupName,
      acknowledgedUserAvatar: auth?.user?.avatar,
      acknowledgedText: acktext,
      acknowledgedComment: ackcomment,
      acknowledgedTime: new Date(),
    };
    dispatch(portfolioAcknowledge(file.id, acknowledgeObj));
    setAckText('');
    setAckComment('');
    dispatch(getRealtimeData(file.id));
  };

  return (
    <div
      className='acknowledgepopupscreen'
      onClick={(e) => {
        if (e.target.classList.contains('acknowledgepopupscreen')) {
          close();
        }
      }}
    >
      <div className='acknowledgepopup'>
        <div className='acknowledge-heading'>
          <h3>Acknowledged by:</h3>
          <a href='#!' className='acknowledge-cross' onClick={close}>
            <img src={nounPlus} alt='' />
          </a>
        </div>
        <div className='acknowledge-body'>
          <div className='acknowledge-body-container'>
            <div className='acknowledge-user'>
              <div
                style={{
                  background: `url(${
                    auth?.user?.avatar ? auth?.user?.avatar : logo
                  }) no-repeat center center/cover`,
                }}
                className='dp'
              ></div>
              <div className='acknowledge-body-flex'>
                <div className='chat-name'>
                  <Link target='_blank' to={`/portfolio/${auth?.user?._id}`}>
                    {auth?.user?.fullName
                      ? auth?.user?.fullName
                      : auth?.user?.groupName}
                  </Link>
                </div>
              </div>
            </div>
            <div className='acknowledge-form'>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  acknowledge(file);
                  close();
                }}
              >
                <div>
                  <label>How are you related to Project :</label>
                  <br />
                  <input
                    type='text'
                    name='remark'
                    className='remark'
                    value={acktext}
                    onChange={(e) => setAckText(e.target.value)}
                  />
                  <label>Write a Testimonials :</label>
                  <br />
                  <textarea
                    type='text'
                    name='remark'
                    className='remark'
                    value={ackcomment}
                    onChange={(e) => setAckComment(e.target.value)}
                  />
                </div>
                <div className='prof-flex-btn'>
                  <button type='submit'>Acknowledge</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAcknowledgePopup;
