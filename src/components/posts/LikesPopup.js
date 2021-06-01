import React from 'react';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import logo from '../../images/dummyimage.jpg';
import { Link } from 'react-router-dom';

const LikesPopup = ({ hide, likes }) => {
  return (
    <div
      className='memberpopupscreen'
      onClick={(e) => {
        if (e.target.classList.contains('memberpopupscreen')) {
          hide();
        }
      }}
    >
      <div
        className='memberpopup'
        data-aos='zoom-in'
        data-aos-delay='10'
        data-aos-duration='500'
        data-aos-easing='ease-in'
      >
        <div className='mem-heading'>
          <h3>Appreciators</h3>
          <a href='#!' className='member-cross' onClick={hide}>
            <img src={nounPlus} alt='' />
          </a>
        </div>
        {likes.map((like) => (
          <div key={like?._id} className='member-body'>
            <div
              style={{
                background: `url(${
                  like.avatar ? like.avatar : logo
                }) no-repeat center center/cover`,
              }}
              className='dp'
            ></div>
            <div className='flex-column-1'>
              <div className='chat-name'>
                <Link target='_blank' to={`/portfolio/${like.user}`}>
                  {like.fullName && like.fullName}
                </Link>
                <Link target='_blank' to={`/portfolio/${like.user}`}>
                  {like.groupName && like.groupName}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikesPopup;
