import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProject } from '../../actions/project';
import ProjectLeft from './ProjectLeft';
import notify from '../../images/noun_notification_887294.svg';
import Notices from './Notices';
import ProjectAdd from './ProjectAdd';
import ProjectPostForm from '../projectposts/ProjectPostForm';
import ProjectPosts from '../projectposts/ProjectPosts';

const SingleProject = ({
  profile: { profile },
  getProject,
  project: { singleproject, loading },
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
        <a href='#!' onClick={(e) => onClick1(e)} className='ribbon-left'>
          {/* <BallotIcon /> */}
        </a>
        <a href='#!' onClick={(e) => onClick2(e)} className='ribbon-right'>
          <img src={notify} alt='portfolioe' />
        </a>
      </div>
      <div>
        <div className='portfolio project'>
          <div className='portfolio-left'>
            <div id='left-sidebar'>
              <ProjectLeft singleproject={singleproject} loading={loading} />
            </div>
          </div>
          {displayLeft && (
            <div className='center'>
              <div id='feed-main'>
                <div className='feed-main-container'>
                  {singleproject !== null && (
                    <ProjectAdd singleproject={singleproject} />
                  )}

                  <ProjectPostForm singleproject={singleproject} />
                  <ProjectPosts
                    profile={profile}
                    // singleproject={singleproject}
                    id={match.params.id}
                  />
                </div>
              </div>
            </div>
          )}
          {displayRight && (
            <div className='right'>
              <Notices id={match.params.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  project: state.project,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProject })(SingleProject);
