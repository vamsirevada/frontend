import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProject } from '../../actions/project';
import ProjectLeft from './ProjectLeft';
import notify from '../../images/noun_notification_887294.svg';
import Notices from './Notices';

const SingleProject = ({
  project: { project, loading },
  getProject,
  match,
}) => {
  useEffect(() => {
    getProject(match.params.id);
    //eslint-disable-next-line
  }, []);

  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);

  const onClick1 = (e) => {
    toogleLeft(true);
    toogleRight(false);
  };
  const onClick2 = (e) => {
    toogleLeft(false);
    toogleRight(true);
  };
  return (
    <>
      <div className='ribbon'>
        <a onClick={(e) => onClick1(e)} className='ribbon-left'>
          {/* <BallotIcon /> */}
        </a>
        <a onClick={(e) => onClick2(e)} className='ribbon-right'>
          <img src={notify} alt='portfolioe' />
        </a>
      </div>
      <div>
        <div id='feed'>
          <div className='left'>
            <div id='left-sidebar'>
              <ProjectLeft project={project} loading={loading} />
            </div>
          </div>
          {displayLeft && (
            <div className='center'>
              <div id='feed-main'>
                <div className='feed-main-container'>
                  {/* <PostForm /> */}
                  {/* <Posts profile={profile} /> */}
                </div>
              </div>
            </div>
          )}
          {displayRight && (
            <div className='right'>
              {/* <FriendRequests /> */}
              {/* <hr /> */}
              <Notices creator={project?.projectname} id={match.params.id} />
              {/* <NotePeoples profile={profile} /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProject })(SingleProject);
