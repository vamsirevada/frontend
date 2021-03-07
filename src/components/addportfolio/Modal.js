/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import logo from '../../images/dummyimage.jpg';
import backward from '../../images/Group 6054.svg';
import forward from '../../images/Group 6056.svg';
import cancel from '../../images/close.svg';
import Moment from 'react-moment';

const Modal = ({
  profile: { avatar, user },
  images,
  videos,
  show,
  close,
  value,
}) => {
  const [current, setCurrent] = useState(0);
  const files = videos.concat(images);

  const length = files.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(files) || files.length <= 0) {
    return null;
  }

  return (
    <>
      {show &&
        files.map((file, index) => (
          <div
            key={index}
            className={`post-pop-up ${
              index === current ? 'slide active' : 'slide'
            }`}
          >
            <div className='post-pop-up-container'>
              <div>
                <div className='flex'>
                  <div className='flex-left'>
                    <div className='flex-1'>
                      <div
                        className='display-pic'
                        style={{
                          background: `url(${
                            avatar ? avatar : logo
                          }) no-repeat center center/cover`,
                        }}
                      ></div>
                      <div className='lh-title'>
                        <h2 className='modal-title w-100'>{file.title}</h2>
                        {/* <br /> */}
                        <p>
                          by <span className='blue'>{user.fullName}</span>
                          {', '}
                          <Moment format='DD MMM YY'>
                            {file.createdAt.toDate()}
                          </Moment>{' '}
                          {', '}
                          <Moment format='hh:mm A'>
                            {file.createdAt.toDate()}
                          </Moment>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex-right'>
                    <img src={cancel} onClick={close} alt='' />
                  </div>
                </div>
                <hr className='hori' />
              </div>

              <div className='main-post-container'>
                <div className='main-post-top'>
                  <div onClick={prevSlide} className='prev'>
                    <img src={backward} alt='' />
                  </div>
                  <div className='post-pic-1'>
                    {file.type === 'photo' ? (
                      <img src={file.url} alt='' />
                    ) : (
                      <video
                        controls
                        controlsList='nodownload'
                        src={file.url}
                        alt=''
                      />
                    )}
                  </div>
                  <div onClick={nextSlide} className='prev'>
                    {' '}
                    <img src={forward} alt='' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Modal;
