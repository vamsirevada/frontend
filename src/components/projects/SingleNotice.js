import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getNotice,
  shortlistNotice,
  getAppliedMembers,
  getShortlistedMembers,
} from '../../actions/notice';
import Moment from 'react-moment';
import cover from '../../images/Article-1b.png';
import back from '../../images/icons/back.svg';
import noticelogo from '../../images/noticelogo.png';
import bin from '../../images/noun_bin_2832480.svg';
import './NoticeBoard.css';
import ProfileItem from '../profiles/ProfileItem';
import UseFirestore from '../addportfolio/UseFireStore';

const SingleNotice = ({
  getNotice,
  shortlistNotice,
  getAppliedMembers,
  getShortlistedMembers,
  notice: { notice, applied, shortlisted },
  match,
}) => {
  const history = useHistory();
  const [apply, setApply] = useState(true);
  const [shortlist, setShortlist] = useState(false);
  const { docs } = UseFirestore('images');
  const [text, setText] = useState('false');

  const onClick1 = () => {
    setShortlist(true);
    setApply(false);
  };

  const onClick2 = () => {
    setApply(true);
    setShortlist(false);
  };

  const shortList = (notice, item) => {
    shortlistNotice(notice?._id, item?._id);
    setText(true);
  };

  useEffect(() => {
    getNotice(match.params.id);
    getAppliedMembers(match.params.id);
    getShortlistedMembers(match.params.id);
  }, [getNotice, getAppliedMembers, getShortlistedMembers, match.params.id]);

  return (
    <>
      <div className='singlenotice'>
        <div>
          <div>
            <img onClick={() => history.goBack()} src={back} alt='' />
          </div>
        </div>
        <div className='singlenotice-left'>
          <span>
            <img src={notice?.noticeImg ? notice?.noticeImg : cover} alt='' />
          </span>
        </div>

        <div>
          <div className='singlenotice-project-heading'>
            <img
              src={
                notice?.project?.avatar ? notice?.project?.avatar : noticelogo
              }
              alt=''
            />
            <h1>Sci-fi movie - Trail of blood (2021)</h1>
          </div>
          <div className='singlenotice-title'>
            <h1>{notice?.title}</h1>
            <div className='singlenotice-buttons'>
              <button type='button' className='btn-blue1'>
                <img src={bin} alt='' />
              </button>
              <button type='button' className='btn-yellow'>
                Edit Notice
              </button>
            </div>
          </div>

          <div className='noticeboardpopup-main'>
            <div className='noticeboardpopup-content'>
              <h5>Posted by : </h5>{' '}
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
        </div>
      </div>
      <div className='noticemembers-sorting'>
        <div className='noticemembers-sort'>
          <button
            onClick={onClick2}
            className={
              apply
                ? 'right left-top left-right-bottom'
                : 'left left-top left-right-bottom'
            }
          >
            List of applied Members ({notice?.applied.length})
          </button>
          <button
            onClick={onClick1}
            className={
              shortlist
                ? 'right right-top right-left-bottom'
                : 'left right-top right-left-bottom'
            }
          >
            List of shortlisted members ({notice?.shortlisted.length})
          </button>
        </div>
      </div>
      <div className='singlenotice-noticemembers'>
        <>
          {shortlist ? (
            <>
              {shortlisted.length > 0 &&
                shortlisted.map((item) => (
                  <ProfileItem
                    key={item._id}
                    item={item}
                    docs={docs}
                    displayAdd={true}
                  />
                ))}
            </>
          ) : (
            <>
              {applied.length > 0 &&
                applied.map((item) => (
                  <div
                    key={item?._id}
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div>
                      <ProfileItem item={item} docs={docs} displayAdd={true} />
                    </div>
                    <div>
                      <button
                        onClick={shortList(notice, item)}
                        className='btn-blue'
                      >
                        {text ? 'Shortlisted' : 'Shortlist'}
                      </button>
                    </div>
                  </div>
                ))}
            </>
          )}
        </>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, {
  getNotice,
  shortlistNotice,
  getAppliedMembers,
  getShortlistedMembers,
})(SingleNotice);
