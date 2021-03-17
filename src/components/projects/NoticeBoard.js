import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getNoticesByUser, getNotice, applyNotice } from '../../actions/notice';
import './NoticeBoard.css';
import noticecover from '../../images/volodymy2.png';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import nounPlus from '../../images/icons/noun_Plus_2310779.svg';

const NoticeBoard = ({
  getNoticesByUser,
  getNotice,
  applyNotice,
  notice: { notice, notices },
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    getNoticesByUser();
  }, [getNoticesByUser]);

  const close = () => {
    setShow(false);
  };

  const handleClick = (not) => {
    setShow(true);
    getNotice(not?._id);
  };

  const apply = () => {
    applyNotice(notice?._id);
    setShow(false);
  };

  return (
    <div className='noticeboard-container'>
      <div className='noticeboard-heading'>
        <h2>Notice Board</h2>
      </div>
      <div className='noticeboard-main'>
        <div className='noticeboard-main-container'>
          {notices.map((not) => (
            <div
              onClick={() => handleClick(not)}
              className='noticeboard-content'
              key={not?._id}
            >
              <img
                className='noticeboard-cover'
                src={not?.noticeImg ? not?.noticeImg : noticecover}
                alt=''
              />
              <div className='noticeboard-bottom'>
                <h5>{not?.title}</h5>
                <div className='noticeboard-bottom-dates'>
                  <div className='noticeboard-bottom-child1'>
                    <p>
                      Posted :{' '}
                      <span>
                        <Moment format='DD MMMM YYYY'>{not?.date}</Moment>
                      </span>
                    </p>
                  </div>
                  <div className='noticeboard-bottom-child2'>
                    <p>
                      Deadline :{' '}
                      <span>
                        <Moment format='DD MMMM YYYY'>{not?.deadline}</Moment>
                      </span>
                    </p>
                  </div>
                  <p>
                    Posted by :{' '}
                    <Link to={`project/${not?.project?._id}`}>
                      <span
                        style={{
                          color: '#7480fc',
                          textDecoration: 'underline',
                        }}
                      >
                        {not?.project?.projectname}
                      </span>
                    </Link>
                  </p>
                  <div>
                    <div className='noticeboard-bottom-child1'>
                      <div className='noticeboard-avatars'>
                        <span className='noticeboard-avatar'>
                          <img
                            src='https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg'
                            alt=''
                          />
                        </span>
                        <span className='noticeboard-avatar'>
                          <img
                            src='https://da4e1j5r7gw87.cloudfront.net/wp-content/uploads/sites/768/2018/08/glasses-american-man-20s-hipster.jpg'
                            alt=''
                          />
                        </span>
                      </div>
                      <p
                        style={{
                          color: '#27D143',
                          textDecoration: 'underline',
                          marginTop: '8px',
                        }}
                      >
                        {not?.shortlisted.length} members Shortlisted
                      </p>
                    </div>
                    <div className='noticeboard-bottom-child2'>
                      <div className='noticeboard-avatars'>
                        <span className='noticeboard-avatar'>
                          <img
                            src='https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg'
                            alt=''
                          />
                        </span>
                        <span className='noticeboard-avatar'>
                          <img
                            src='https://htmlstream.com/preview/unify-v2.6.2/assets/img-temp/400x450/img5.jpg'
                            alt=''
                          />
                        </span>
                        <span className='noticeboard-avatar'>
                          <img
                            src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                            alt=''
                          />
                        </span>
                      </div>
                      <p
                        style={{
                          color: '#5D5D5D',
                          textDecoration: 'underline',
                          marginTop: '8px',
                        }}
                      >
                        {not?.applied.length} members applied
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {show && (
        <div className='noticeboardpopupscreen'>
          <div className='noticeboardpopup'>
            <div className='noticeboardpopup-heading'>
              <h3>{notice?.title}</h3>
              <a className='noticeboardpopup-cross' onClick={close}>
                <img src={nounPlus} alt='' />
              </a>
            </div>
            <div className='noticeboardpopup-main'>
              <div className='noticeboardpopup-content'>
                <h5>Posted by :</h5>
                <span>
                  <p>{notice?.project?.projectname}</p>
                </span>
              </div>
              <div className='noticeboardpopup-content'>
                <h5>Posted on : </h5>{' '}
                <span>
                  <p>
                    <Moment format='Do MMMM'>{notice?.date}</Moment>
                  </p>
                </span>
              </div>
              <div className='noticeboardpopup-content'>
                <h5>Deadline : </h5>{' '}
                <span>
                  <p>
                    <Moment format='Do MMMM'>{notice?.deadline}</Moment>
                  </p>
                </span>
              </div>
              <div className='noticeboardpopup-content'>
                <h5>Eligibility : </h5>{' '}
                <span>
                  <p>{notice?.eligibility}</p>
                </span>
              </div>
              <div className='noticeboardpopup-content'>
                <h5>Venue : </h5>{' '}
                <span>
                  <p>{notice?.venue}</p>
                </span>
              </div>
              <div className='noticeboardpopup-content'>
                <h5>Role : </h5>{' '}
                <span>
                  <p>{notice?.role}</p>
                </span>
              </div>
              <div className='noticeboardpopup-content'>
                <h5>Description :</h5>
                <p>{notice?.description}</p>
              </div>
            </div>
            <div>
              <button onClick={apply} className='btn-blue'>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, {
  getNoticesByUser,
  getNotice,
  applyNotice,
})(NoticeBoard);
