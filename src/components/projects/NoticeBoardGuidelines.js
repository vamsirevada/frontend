import React from 'react';
import nounPlus from '../../images/blackcross.svg';

const NoticeBoardGuidelines = ({ closeGuide }) => {
  return (
    <div
      className='noticeboard-guideline'
      data-aos='zoom-in'
      data-aos-delay='25'
      data-aos-duration='500'
      data-aos-easing='ease'
    >
      <div className='noticeboard-popup'>
        <div className='noticeboard-heading'>
          <div>
            <h3>About Notice Board </h3>
          </div>

          <div onClick={closeGuide}>
            <img className='black-cross' src={nounPlus} alt='' />
          </div>
        </div>
        <div className='noticeboard-body'>
          <ul>
            <li>
              <span className='lato-num'>1.</span>
              Notice Board is your personalised space where you get information
              related to opportunities, Industry News, Film Festival News etc.
            </li>
            <li>
              <span className='lato-num'>2.</span> You can also post your
              requirement for your Project and that will be notified to target
              individuals{' '}
            </li>
            <li>
              <span className='lato-num'>3.</span> To create a Notice, you first
              have to create a concerned project and from there you can create
              and publish notices.{' '}
            </li>
            <li>
              <span className='lato-num'>4.</span> All your notices are saved in
              this project page, which you can access it any time.{' '}
            </li>
            <li>
              <span className='lato-num'>5.</span> You can see Analytics of
              Individual Notice like number of people applied and you can also
              shortlist for further screenings.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardGuidelines;
