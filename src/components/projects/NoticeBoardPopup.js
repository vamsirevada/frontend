/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { applyNotice } from '../../actions/notice';
import Moment from 'react-moment';

import nounPlus from '../../images/icons/noun_Plus_2310779.svg';
import Spinner from '../layout/Spinner';

const NoticeBoardPopup = ({ notice, applyNotice, hide }) => {
  const [loading, setLoading] = useState(true);

  const close = () => {
    hide();
  };

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(t);
    };
  });

  const apply = () => {
    applyNotice(notice?._id);

    hide();
  };

  return (
    <>
      {loading ? (
        <div className='noticeboardpopupscreen'>
          <div className='noticeboardpopup'>
            <Spinner />
          </div>
        </div>
      ) : (
        <div
          className='noticeboardpopupscreen'
          onClick={(e) => {
            if (e.target.classList.contains('noticeboardpopupscreen')) {
              close();
            }
          }}
        >
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
    </>
  );
};

export default connect(null, { applyNotice })(NoticeBoardPopup);
