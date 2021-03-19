import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getNoticesByUser, getNotice } from '../../actions/notice';
import noticecover from '../../images/volodymy2.png';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import NoticeBoardPopup from './NoticeBoardPopup';
import { Fragment } from 'react';

const NoticeBoardItem = ({
  getNoticesByUser,
  getNotice,
  notice: { notices, notice },
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    getNoticesByUser();
  }, [getNoticesByUser]);

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
              </div>
            </div>
          </div>
        ))}
      </>
      {show && (
        <div className='noticeboardpopupscreen'>
          <NoticeBoardPopup notice={notice} hide={hide} />
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, { getNoticesByUser, getNotice })(
  NoticeBoardItem
);
