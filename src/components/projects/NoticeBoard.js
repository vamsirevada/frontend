import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getNoticesByUser } from '../../actions/notice';
import './NoticeBoard.css';
import noticecover from '../../images/volodymy2.png';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const NoticeBoard = ({ getNoticesByUser, notice: { notices } }) => {
  useEffect(() => {
    getNoticesByUser();
  }, [getNoticesByUser]);

  return (
    <div className='noticeboard-container'>
      <div className='noticeboard-heading'>
        <h2>Notice Board</h2>
      </div>
      <div className='noticeboard-main'>
        <div className='noticeboard-main-container'>
          {notices.map((notice) => (
            <div className='noticeboard-content' key={notice?._id}>
              <Link to={`/notice/${notice?._id}`}>
                <img
                  className='noticeboard-cover'
                  src={notice?.noticeImg ? notice?.noticeImg : noticecover}
                  alt=''
                />
                <div className='noticeboard-bottom'>
                  <h5>{notice?.title}</h5>
                  <div className='noticeboard-bottom-dates'>
                    <div className='noticeboard-bottom-child1'>
                      <p>
                        Posted :{' '}
                        <span>
                          <Moment format='DD MMMM YYYY'>{notice?.date}</Moment>
                        </span>
                      </p>
                    </div>
                    <div className='noticeboard-bottom-child2'>
                      <p>
                        Deadline :{' '}
                        <span>
                          <Moment format='DD MMMM YYYY'>
                            {notice?.deadline}
                          </Moment>
                        </span>
                      </p>
                    </div>
                    <p>
                      Posted by :{' '}
                      <Link to={`project/${notice?.project?._id}`}>
                        <span
                          style={{
                            color: '#7480fc',
                            textDecoration: 'underline',
                          }}
                        >
                          {notice?.project?.projectname}
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
                          02 members Shortlisted
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
                          40 members applied
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, { getNoticesByUser })(NoticeBoard);
