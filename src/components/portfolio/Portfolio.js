/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/project';
import { getBuddies } from '../../actions/profile';
import Loader from '../layout/Loader';
import briefcase from '../../images/icons/nounBriefcase.svg';
import nounEducation from '../../images/icons/noun_education_2177318.svg';
import nounSkill from '../../images/icons/noun_skill_1863702.svg';
import nounevent from '../../images/icons/noun_event_1828492.svg';
import nounAwards from '../../images/icons/noun_Trophy_2135552.svg';
import f124 from '../../images/Image124.png';
import EditButton from './EditButton';
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
import PortfolioRightBuddies from './PortfolioRIghtBuddies';
import ProjectTemp from '../projects/ProjectTemp';
import ExpTemp from '../projects/ExpTemp';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { Link } from 'react-router-dom';
import { ShepherdTourContext } from 'react-shepherd';
import PortfolioStrength from './PortfolioStrength';
import UseFirestore from '../addportfolio/UseFireStore';

const Portfolio = ({
  getProjects,
  getBuddies,
  auth: { user },
  profile: { profile, buddies },
  project: { projects },
}) => {
  useEffect(() => {
    getProjects(user?._id);
    getBuddies();
  }, [getProjects, getBuddies, user?._id]);

  const tour = useContext(ShepherdTourContext);
  const { docs } = UseFirestore('images');
  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);
  const [displayPortfolio, tooglePortfolio] = useState(true);
  const [displayBuddies, toogleBuddies] = useState(false);
  const [displayProjects, toogleProjects] = useState(false);
  const [viewAll1, setViewAll1] = useState(false);
  const [viewAll2, setViewAll2] = useState(false);
  const [viewAll3, setViewAll3] = useState(false);
  const [viewAll4, setViewAll4] = useState(false);
  const [viewAll5, setViewAll5] = useState(false);

  const xyz = docs.filter((i) => i.userId === user?._id);

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
    toogleBuddies(false);
    toogleProjects(false);
  };
  const BudOn = (e) => {
    tooglePortfolio(false);
    toogleBuddies(true);
    toogleProjects(false);
  };
  const ProjectOn = (e) => {
    tooglePortfolio(false);
    toogleBuddies(false);
    toogleProjects(true);
  };

  return (
    <>
      <div
        data-aos='fade-out'
        data-aos-delay='10'
        data-aos-duration='500'
        data-aos-easing='ease-in'
      >
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
          {profile !== null ? (
            <Fragment>
              <div id='portfolio'>
                {displayLeft && (
                  <div className='portfolio-left'>
                    <div id='left-sidebar'>
                      <div className='left-container'>
                        <PortfolioLeftTop profile={profile} />
                        <EditButton profile={profile} />
                        <PortfolioLeftAbout profile={profile} />
                        {profile?.founder.length > 0 && (
                          <div className='prof-exp'>
                            <div className='prof-exp-heading'>
                              <h3> Founder </h3>
                            </div>
                            <hr className='hori' />

                            <div className='prof-btn'>
                              <div className='prof-btn-flex'>
                                <div className='prof-top prof-top-edu founder'>
                                  <div className='prof-pic'>
                                    <img src={f124} alt='' />
                                  </div>
                                  <div>
                                    <p>
                                      <a className='bold bold-1'>
                                        {profile.founder}
                                      </a>{' '}
                                      <br />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {profile.teammembers.length > 0 && (
                          <div className='prof-exp'>
                            <div className='prof-exp-heading'>
                              <h3> Team Members </h3>
                              <a className='text-blue'>View all</a>
                            </div>

                            <hr className='hori' />

                            <div className='prof-btn'>
                              <div className='prof-btn-flex'>
                                {profile.teammembers.length > 0 ? (
                                  <Fragment>
                                    {profile.teammembers.map((team) => (
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
                        {profile.experience.length > 0 && (
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
                                    profile.experience.length > 2 ? '' : 'none',
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
                                {profile.experience.length > 0 ? (
                                  <Fragment>
                                    {profile.experience
                                      .slice(
                                        0,
                                        viewAll1 ? profile.experience.length : 2
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

                        {profile.education.length > 0 && (
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
                                    profile.education.length > 2 ? '' : 'none',
                                  color: '#8D4EFF',
                                  cursor: 'pointer',
                                }}
                                className='text-blue'
                              >
                                See more
                              </div>
                            </div>

                            <hr className='hori' />

                            {profile.education.length > 0 ? (
                              <Fragment>
                                {profile.education
                                  .slice(
                                    0,
                                    viewAll2 ? profile.education.length : 2
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

                        {profile.partners.length > 0 && (
                          <div className='prof-exp'>
                            <div className='prof-exp-heading'>
                              <h3>Our Partners</h3>
                              <a className='text-blue'>See more</a>
                            </div>

                            <hr className='hori' />

                            <div className='prof-btn'>
                              <div className='prof-btn-flex'>
                                {profile.partners.length > 0 ? (
                                  <Fragment>
                                    {profile.partners.map((partner) => (
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

                        {profile.clients.length > 0 && (
                          <div className='prof-exp'>
                            <div className='prof-exp-heading'>
                              <h3> Our Cilents</h3>
                              <a className='text-blue'>See more</a>
                            </div>

                            <hr className='hori' />

                            <div className='prof-btn'>
                              <div className='prof-btn-flex'>
                                {profile.clients.length > 0 ? (
                                  <Fragment>
                                    {profile.clients.map((client) => (
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

                        {profile.awards.length > 0 && (
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
                                    profile.awards.length > 2 ? '' : 'none',
                                  color: '#8D4EFF',
                                  cursor: 'pointer',
                                }}
                                className='text-blue'
                              >
                                See more
                              </div>
                            </div>

                            <hr className='hori' />
                            {profile.awards.length > 0 ? (
                              <Fragment>
                                {profile.awards
                                  .slice(
                                    0,
                                    viewAll3 ? profile.awards.length : 2
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

                        {profile.skills.length > 0 && (
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
                                    profile.skills.length > 2 ? '' : 'none',
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
                                {profile.skills.length > 0 && (
                                  <Fragment>
                                    {profile.skills
                                      .slice(
                                        0,
                                        viewAll4 ? profile.skills.length : 2
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
                        {profile.events.length > 0 && (
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
                                    profile.events.length > 2 ? '' : 'none',
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
                                {profile.events.length > 0 && (
                                  <Fragment>
                                    {profile.events
                                      .slice(
                                        0,
                                        viewAll5 ? profile.events.length : 2
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
                        {profile.contactus.length > 0 && (
                          <div className='prof-exp'>
                            <div className='prof-exp-heading'>
                              <h3>Contact Us:</h3>
                              <a className='text-blue'>See more</a>
                            </div>

                            <hr className='hori' />

                            <div className='prof-btn'>
                              <div className='prof-btn-flex'>
                                <div className='profile-table profile-table-1'>
                                  {profile.contactus.map((contactus) => (
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
                        {profile.experience.length === 0 &&
                          profile.founder.length === 0 &&
                          profile.education.length === 0 && (
                            <div className='add-profile'>
                              <hr />
                              <p>
                                To add Experience/ Education/ Skills/
                                Team-Members/ Awards etc., Click Add to Profile
                              </p>
                              <Link to='/profile' className='btn-white'>
                                Add Profile
                              </Link>
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
                        {/* {profile !== null && (
                          <PortfolioRightTop
                            profile={profile}
                            projects={projects}
                          />
                        )} */}
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
                            <a href='#!' onClick={() => BudOn()}>
                              <p className='border-1'>
                                <span className='f-1'>
                                  {buddies && buddies.length}
                                </span>

                                <br />
                                <span
                                  className={
                                    displayBuddies ? 'b-1 active' : 'b-1'
                                  }
                                >
                                  Connections
                                </span>
                              </p>
                            </a>
                            <a href='#!' onClick={() => ProjectOn()}>
                              <p>
                                <span className='f-1'>
                                  {projects.length > 0 ||
                                  profile?.experience.length > 0
                                    ? projects.length +
                                      profile?.experience.length
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

                          <div className='mutual-frds'>
                            <div className='prof-heading-flex'>
                              <Link to={'/addfiles'}>
                                <h4>
                                  <span className='bg-1 addtoportfolio'>
                                    Add to Portfolio
                                  </span>
                                </h4>
                              </Link>
                            </div>
                          </div>
                        </div>
                        <PortfolioStrength
                          user={user}
                          profile={profile}
                          xyz={xyz}
                        />
                        <div className='main-grid-body'>
                          {displayPortfolio && profile !== null && (
                            <PortfolioRightBody docs={docs} profile={profile} />
                          )}
                          {displayBuddies && (
                            <Fragment>
                              {buddies.length === 0 ? (
                                <Fragment>
                                  <h2 className='none'> None </h2>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  {buddies.map((item) => (
                                    <PortfolioRightBuddies
                                      key={item?._id}
                                      item={item}
                                    />
                                  ))}
                                </Fragment>
                              )}
                            </Fragment>
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
                                          profile={profile}
                                          user={user}
                                        />
                                      ))}
                                    </div>
                                  </Fragment>
                                )}
                                {profile?.experience.length > 0 && (
                                  <Fragment>
                                    <div>
                                      {profile?.experience.map((experience) => (
                                        <ExpTemp
                                          key={experience._id}
                                          experience={experience}
                                          profile={profile}
                                          user={user}
                                          showActions={true}
                                        />
                                      ))}
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
              <button onClick={tour.start} className='demo-tour-button'>
                Start Demo Tour
                <span className='tooltiptext'>
                  <div className='arrow-up'></div>
                  Take a Tour to get to know about features of website
                </span>
              </button>
            </Fragment>
          ) : (
            <Loader data-aos-duration='1000' />
          )}
        </Fragment>
      </div>
    </>
  );
};

Portfolio.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, { getProjects, getBuddies })(Portfolio);
