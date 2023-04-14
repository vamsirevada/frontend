/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { getProjects } from '../../actions/project';
import Loader from '../layout/Loader';
import briefcase from '../../images/icons/nounBriefcase.svg';
import nounEducation from '../../images/icons/noun_education_2177318.svg';
import nounSkill from '../../images/icons/noun_skill_1863702.svg';
import nounevent from '../../images/icons/noun_event_1828492.svg';
import nounAwards from '../../images/icons/noun_Trophy_2135552.svg';
import f124 from '../../images/Image124.png';
import PortfolioLeftTop from './PortfolioLeftTop';
import PortfolioLeftAbout from './PortfolioLeftAbout';
import PortfolioLeftExperience from './PortfolioLeftExperience';
import PortfolioLeftEducation from './PortfolioLeftEducation';
import PortfolioLeftAwards from './PortfolioLeftAwards';
import PortfolioLeftSkill from './PortfolioLeftSkill';
import PortfolioLeftEvent from './PortfolioLeftEvent';
import PortfolioRightBody from './PortfolioRightBody';
import GPortfolioLeftTeam from './GPortfolioLeftTeam';
import GPortfolioLeftPartner from './GPortfolioLeftPartner';
import GPortfolioLeftClient from './GPortfolioLeftClient';
import GPortfolioLeftContact from './GPortfolioLeftContact';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import NavbarGuest from '../layout/NavbarGuest';
import UseFirestore from '../addportfolio/UseFireStore';
import ProjectTemp from '../projects/ProjectTemp';
import ExpTemp from '../projects/ExpTemp';

const Portfolio2 = ({
  getProfileById,
  getProjects,
  profile: { profile1, loading },
  project: { projects },
  match,
}) => {
  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);
  const [displayPortfolio, tooglePortfolio] = useState(true);
  const [displayProjects, toogleProjects] = useState(false);
  const [viewAll1, setViewAll1] = useState(false);
  const [viewAll2, setViewAll2] = useState(false);
  const [viewAll3, setViewAll3] = useState(false);
  const [viewAll4, setViewAll4] = useState(false);
  const [viewAll5, setViewAll5] = useState(false);
  const { docs } = UseFirestore('images');

  useEffect(() => {
    getProfileById(match.params.id);
    getProjects(match.params.id);
  }, [getProfileById, getProjects, match.params.id]);

  const onClick1 = (e) => {
    toogleLeft(true);
    toogleRight(false);
  };
  const onClick2 = (e) => {
    toogleLeft(false);
    toogleRight(true);
  };

  const PortOn = (e) => {
    tooglePortfolio(true);
    toogleProjects(false);
  };

  const ProjectOn = (e) => {
    tooglePortfolio(false);
    toogleProjects(true);
  };

  return (
    <>
      <NavbarGuest />
      {loading ? (
        <div className='post-pop-up'>
          <Loader />
        </div>
      ) : (
        <Fragment>
          <div className='ribbon'>
            <a
              onClick={(e) => onClick1(e)}
              className={displayLeft ? 'ribbon-left-active' : 'ribbon-left'}
            >
              <AssignmentIndIcon />
            </a>
            <a onClick={(e) => onClick2(e)} className='ribbon-right'>
              <InsertPhotoIcon />
            </a>
          </div>

          <Fragment>
            {profile1 !== null ? (
              <Fragment>
                <div id='portfolio' data-aos='fade-in'>
                  {displayLeft && (
                    <div className='portfolio-left'>
                      <div id='left-sidebar'>
                        <div className='left-container'>
                          <PortfolioLeftTop profile={profile1} />
                          <hr className='hori guest' />

                          <PortfolioLeftAbout
                            key={profile1._id}
                            profile={profile1}
                          />
                          {profile1?.founder.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3> Founder </h3>
                              </div>
                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  <div className='prof-top prof-top-edu'>
                                    <div className='prof-pic'>
                                      <img src={f124} alt='' />
                                    </div>
                                    <div>
                                      <p>
                                        <a className='bold bold-1'>
                                          {profile1?.founder}
                                        </a>{' '}
                                        <br />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.teammembers.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3> Team Members </h3>
                                <a className='text-blue'>View all</a>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  {profile1?.teammembers.length > 0 ? (
                                    <Fragment>
                                      {profile1.teammembers.map((team) => (
                                        <GPortfolioLeftTeam
                                          key={team._id}
                                          team={team}
                                        />
                                      ))}
                                    </Fragment>
                                  ) : (
                                    <h4> No experience credientials</h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.experience.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>
                                  {' '}
                                  <img
                                    className='resize'
                                    src={briefcase}
                                    alt=''
                                  />{' '}
                                  Professional Experience
                                </h3>
                                <div
                                  onClick={() => {
                                    setViewAll1(!viewAll1);
                                  }}
                                  style={{
                                    display:
                                      profile1?.experience.length > 2
                                        ? ''
                                        : 'none',
                                    color: '#8D4EFF',
                                    cursor: 'pointer',
                                  }}
                                  className='text-blue'
                                >
                                  See more
                                </div>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  {profile1?.experience.length > 0 ? (
                                    <Fragment>
                                      {profile1?.experience
                                        .slice(
                                          0,
                                          viewAll1
                                            ? profile1?.experience.length
                                            : 2
                                        )
                                        .map((experience) => (
                                          <PortfolioLeftExperience
                                            key={experience._id}
                                            experience={experience}
                                          />
                                        ))}
                                    </Fragment>
                                  ) : (
                                    <h4> No experience credientials</h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.education.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>
                                  {' '}
                                  <img
                                    className='resize-1'
                                    src={nounEducation}
                                    alt=''
                                  />{' '}
                                  Education
                                </h3>
                                <div
                                  onClick={() => {
                                    setViewAll2(!viewAll2);
                                  }}
                                  style={{
                                    display:
                                      profile1?.education.length > 2
                                        ? ''
                                        : 'none',
                                    color: '#8D4EFF',
                                    cursor: 'pointer',
                                  }}
                                  className='text-blue'
                                >
                                  See more
                                </div>
                              </div>

                              <hr className='hori' />

                              {profile1?.education.length > 0 ? (
                                <Fragment>
                                  {profile1?.education
                                    .slice(
                                      0,
                                      viewAll2 ? profile1?.education.length : 2
                                    )
                                    .map((education) => (
                                      <PortfolioLeftEducation
                                        key={education._id}
                                        education={education}
                                      />
                                    ))}
                                </Fragment>
                              ) : (
                                <h4> No Education credientials</h4>
                              )}
                            </div>
                          )}
                          {profile1?.partners.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>Our Partners</h3>
                                <a className='text-blue'>See more</a>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  {profile1?.partners.length > 0 ? (
                                    <Fragment>
                                      {profile1?.partners.map((partner) => (
                                        <GPortfolioLeftPartner
                                          key={partner._id}
                                          partner={partner}
                                        />
                                      ))}
                                    </Fragment>
                                  ) : (
                                    <h4>Add partners</h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.clients.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3> Our Cilents</h3>
                                <a className='text-blue'>See more</a>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  {profile1?.clients.length > 0 ? (
                                    <Fragment>
                                      {profile1?.clients.map((client) => (
                                        <GPortfolioLeftClient
                                          key={client._id}
                                          client={client}
                                        />
                                      ))}
                                    </Fragment>
                                  ) : (
                                    <h4>Add clients</h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.awards.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>
                                  {' '}
                                  <img
                                    className='resize'
                                    src={nounAwards}
                                    alt=''
                                  />{' '}
                                  Awards & Honours
                                </h3>
                                <div
                                  onClick={() => {
                                    setViewAll3(!viewAll3);
                                  }}
                                  style={{
                                    display:
                                      profile1?.awards.length > 2 ? '' : 'none',
                                    color: '#8D4EFF',
                                    cursor: 'pointer',
                                  }}
                                  className='text-blue'
                                >
                                  See more
                                </div>
                              </div>

                              <hr className='hori' />
                              {profile1?.awards.length > 0 ? (
                                <Fragment>
                                  {profile1?.awards
                                    .slice(
                                      0,
                                      viewAll3 ? profile1?.awards.length : 2
                                    )
                                    .map((awards) => (
                                      <PortfolioLeftAwards
                                        key={awards._id}
                                        awards={awards}
                                      />
                                    ))}
                                </Fragment>
                              ) : (
                                <h4> Add Award </h4>
                              )}
                            </div>
                          )}
                          {profile1?.skills.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>
                                  {' '}
                                  <img
                                    className='resize-1'
                                    src={nounSkill}
                                    alt=''
                                  />{' '}
                                  Skills
                                </h3>
                                <div
                                  onClick={() => {
                                    setViewAll4(!viewAll4);
                                  }}
                                  style={{
                                    display:
                                      profile1?.skills.length > 2 ? '' : 'none',
                                    color: '#8D4EFF',
                                    cursor: 'pointer',
                                  }}
                                  className='text-blue'
                                >
                                  See more
                                </div>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  {profile1?.skills.length > 0 && (
                                    <Fragment>
                                      {profile1?.skills
                                        .slice(
                                          0,
                                          viewAll4 ? profile1?.skills.length : 2
                                        )
                                        .map((skills) => (
                                          <PortfolioLeftSkill
                                            key={skills._id}
                                            skills={skills}
                                          />
                                        ))}
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.events.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>
                                  {' '}
                                  <img
                                    className='resize-1'
                                    src={nounevent}
                                    alt=''
                                  />{' '}
                                  Events
                                </h3>
                                <div
                                  onClick={() => {
                                    setViewAll5(!viewAll5);
                                  }}
                                  style={{
                                    display:
                                      profile1?.events.length > 2 ? '' : 'none',
                                    color: '#8D4EFF',
                                    cursor: 'pointer',
                                  }}
                                  className='text-blue'
                                >
                                  See more
                                </div>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  {profile1?.events.length > 0 && (
                                    <Fragment>
                                      {profile1?.events
                                        .slice(
                                          0,
                                          viewAll5 ? profile1?.events.length : 2
                                        )
                                        .map((events) => (
                                          <PortfolioLeftEvent
                                            key={events._id}
                                            events={events}
                                          />
                                        ))}
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                          {profile1?.contactus.length > 0 && (
                            <div className='prof-exp'>
                              <div className='prof-exp-heading'>
                                <h3>Contact Us:</h3>
                                <a className='text-blue'>See more</a>
                              </div>

                              <hr className='hori' />

                              <div className='prof-btn'>
                                <div className='prof-btn-flex'>
                                  <div className='profile-table profile-table-1'>
                                    {profile1?.contactus.map((contactus) => (
                                      <GPortfolioLeftContact
                                        key={contactus._id}
                                        contactus={contactus}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {displayRight && (
                    <div className='portfolio-right'>
                      <div id='main-grid' className='port-grid'>
                        <div className='main-grid-container'>
                          <div className='main-grid-top'>
                            <div className='profile-info-box p-black'>
                              <a href='#!' onClick={() => PortOn()}>
                                <p className='border-1'>
                                  View
                                  <span
                                    className={
                                      displayPortfolio ? 'b-1 active' : 'b-1'
                                    }
                                  >
                                    <br /> Portfolio
                                  </span>
                                </p>
                              </a>
                              <a href='#!' onClick={() => ProjectOn()}>
                                <p>
                                  <span className='f-1'>
                                    {projects.length > 0 ||
                                    profile1?.experience.length > 0
                                      ? projects.length +
                                        profile1?.experience.length
                                      : '0'}
                                  </span>
                                  <span
                                    className={
                                      displayProjects ? 'b-1 active' : 'b-1'
                                    }
                                  >
                                    <br /> Projects{' '}
                                  </span>
                                </p>
                              </a>
                            </div>
                          </div>
                          <div className='main-grid-body'>
                            {displayPortfolio && profile1 !== null && (
                              <PortfolioRightBody
                                docs={docs}
                                guest={true}
                                profile={profile1}
                              />
                            )}
                            {displayProjects && (
                              <div className='project'>
                                <div className='project-container'>
                                  {projects.length > 0 && (
                                    <Fragment>
                                      <div>
                                        {projects.map((project) => (
                                          <ProjectTemp
                                            key={project._id}
                                            project={project}
                                            profile={profile1}
                                            user={profile1?.user}
                                          />
                                        ))}
                                      </div>
                                    </Fragment>
                                  )}
                                  {profile1?.experience.length > 0 && (
                                    <Fragment>
                                      <div>
                                        {profile1?.experience.map(
                                          (experience) => (
                                            <ExpTemp
                                              key={experience._id}
                                              experience={experience}
                                              profile={profile1}
                                              user={profile1?.user}
                                              showActions={false}
                                            />
                                          )
                                        )}
                                      </div>
                                    </Fragment>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Fragment>
            ) : (
              <Loader />
            )}
          </Fragment>
        </Fragment>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, {
  getProfileById,
  getProjects,
})(Portfolio2);
