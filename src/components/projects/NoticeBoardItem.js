import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { getNoticesByUser, getNotice } from '../../actions/notice';
import { getAllNotices, getNotice } from '../../actions/notice';
import noticecover from '../../images/volodymy2.png';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import NoticeBoardPopup from './NoticeBoardPopup';
import { Fragment } from 'react';

const NoticeBoardItem = ({
  // getNoticesByUser,
  getAllNotices,
  getNotice,
  notice: { notices, notice },
}) => {
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   getNoticesByUser();
  // }, [getNoticesByUser]);

  useEffect(() => {
    getAllNotices();
  }, [getAllNotices]);

  const handleClick = (not) => {
    setShow(true);
    getNotice(not?._id);
  };

  const hide = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <>
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
                <div className='notice-dates-info'>
                  <div>
                    <p>
                      Posted :{' '}
                      <span className='notice-date'>
                        <Moment format='DD MMM YYYY'>{not?.date}</Moment>
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Deadline :{' '}
                      <span className='notice-date'>
                        <Moment format='DD MMM YYYY'>{not?.deadline}</Moment>
                      </span>
                    </p>
                  </div>
                </div>
                <div className='notice-postedby'>
                  <p>
                    Posted by :{' '}
                    <Link to={`project/${not?.project?._id}`}>
                      <span className='postedby-name'>
                        {not?.project?.projectname}
                      </span>
                    </Link>
                  </p>
                </div>
                <div className='noticeboard-member-applied'>
                  <div className='noticeboard-avatars'>
                    {not?.applied.map((x, index) => (
                      <span key={index} className='noticeboard-avatar'>
                        <img src={x?.avatar} alt='' />
                      </span>
                    ))}
                  </div>
                  <p>{not?.applied.length} members applied</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
      {show && <NoticeBoardPopup notice={notice} hide={hide} />}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, { getAllNotices, getNotice })(
  NoticeBoardItem
);
