import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotice } from '../../actions/notice';
import Moment from 'react-moment';
import cover from '../../images/Article-1b.png';
import back from '../../images/icons/back.svg';
import logo from '../../images/dummyimage.jpg';

const SingleNotice = ({ getNotice, notice: { notice }, match }) => {
  const history = useHistory();
  useEffect(() => {
    getNotice(match.params.id);
  }, [getNotice, match.params.id]);

  return (
    <>
      <div id='feed'>
        <div className='left'>
          <div className='left-sidebar'>
            <img
              onClick={() => history.goBack()}
              style={{ float: 'left' }}
              src={back}
              alt=''
            />
            <span>
              <img
                height='340px'
                width='340px'
                src={notice?.noticeImg ? notice?.noticeImg : cover}
                alt=''
              />
            </span>
          </div>
        </div>
        <div className='right'>
          <img
            className='display-pic'
            src={notice?.project?.avatar ? notice?.project?.avatar : logo}
            alt=''
          />
          <h1
            style={{
              float: 'right',
              alignSelf: 'center',
              fontWeight: 'lighter',
            }}
          >
            Sci-fi movie - Trail of blood (2021)
          </h1>
          <div>
            <button type='button' className='btn-yellow'>
              Edit Notice
            </button>
            <h1>{notice?.title}</h1>
          </div>
          <div>
            <div>
              <h3>Posted by: </h3>{' '}
              <span>
                <p style={{ float: 'right' }}>{notice?.project?.projectname}</p>
              </span>
            </div>
            <div>
              <h3>Posted on : </h3>{' '}
              <span>
                <p style={{ float: 'right' }}>
                  <Moment format='Do MMMM'>{notice?.date}</Moment>
                </p>
              </span>
            </div>
            <div>
              <h3>Deadline : </h3>{' '}
              <span>
                <p style={{ float: 'right' }}>
                  <Moment format='Do MMMM'>{notice?.deadline}</Moment>
                </p>
              </span>
            </div>
            <div>
              <h3>Eligibility : </h3>{' '}
              <span>
                <p style={{ float: 'right' }}>{notice?.eligibility}</p>
              </span>
            </div>
            <div>
              <h3>Venue : </h3>{' '}
              <span>
                <p style={{ float: 'right' }}>{notice?.venue}</p>
              </span>
            </div>
            <div>
              <h3>Role : </h3>{' '}
              <span>
                <p style={{ float: 'right' }}>{notice?.role}</p>
              </span>
            </div>
            <div>
              <h3>Description :</h3>
              <p>{notice?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='float-container' style={{ marginTop: '100px' }}>
        <div style={{ padding: '100px', width: '50%', float: 'left' }}>
          <h3>List of applied Members (104)</h3>
        </div>
        <div style={{ padding: '100px', width: '50%', float: 'left' }}>
          <h3>List of shortlisted members (24)</h3>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  notice: state.notice,
});

export default connect(mapStateToProps, { getNotice })(SingleNotice);
