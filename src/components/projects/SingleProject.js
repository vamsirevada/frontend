import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getProject, getProjectBudget } from '../../actions/project';
import ProjectLeft from './ProjectLeft';
import notify from '../../images/noun_notification_887294.svg';
import Notices from './Notices';
import ProjectAdd from './ProjectAdd';
import ProjectPostForm from '../projectposts/ProjectPostForm';
import ProjectPosts from '../projectposts/ProjectPosts';
import MiniProjectInfo from './MiniProjectInfo';
import BallotIcon from '@material-ui/icons/Ballot';
import AdminMoney from './AdminMoney';
import { useHistory } from 'react-router';

const SingleProject = ({
  profile: { profile },
  getProject,
  project: {
    singleproject,
    budget: { budget },
    loading,
  },
  match,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);

  useEffect(() => {
    getProject(match.params.id);
    dispatch(getProjectBudget(match.params.id));
    //eslint-disable-next-line
  }, []);

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
          <BallotIcon />
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
                    <MiniProjectInfo singleproject={singleproject} />
                  )}
                  {singleproject?.admin &&
                    singleproject?.admin
                      .map((x) => x?.user === profile?.user?._id)
                      .find((x) => x === true) && (
                      <>
                        <ProjectAdd singleproject={singleproject} />
                        <AdminMoney
                          budget={budget}
                          singleproject={singleproject}
                        />
                      </>
                    )}
                  <ProjectPostForm singleproject={singleproject} />
                  <ProjectPosts profile={profile} id={match.params.id} />
                </div>
              </div>
            </div>
          )}
          {displayRight && (
            <div className='right'>
              <Notices
                userId={profile?.user?._id}
                singleproject={singleproject}
                id={match.params.id}
              />
              {singleproject?.admin
                .map((x) => x?.user === profile?.user?._id)
                .find((x) => x === true) ? (
                <div
                  onClick={() => {
                    history.push(`/projectfinance/${singleproject?._id}`);
                  }}
                  className='expenses-button'
                >
                  <div className='expenses-button-container'>
                    <span>Expenses Tracker</span>
                  </div>
                </div>
              ) : singleproject?.moderator
                  .map((x) => x?.user === profile?.user?._id)
                  .find((x) => x === true) ? (
                <div
                  onClick={() => {
                    history.push(`/projectfinance/${singleproject?._id}`);
                  }}
                  className='expenses-button'
                >
                  <div className='expenses-button-container'>
                    <span>Expenses Tracker</span>
                  </div>
                </div>
              ) : null}
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
