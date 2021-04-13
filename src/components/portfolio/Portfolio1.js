/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import { getProjects } from '../../actions/project';
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
import PortfolioRightTop from './PortfolioRightTop';
import PortfolioRightBody from './PortfolioRightBody';
import GPortfolioLeftTeam from './GPortfolioLeftTeam';
import GPortfolioLeftPartner from './GPortfolioLeftPartner';
import GPortfolioLeftClient from './GPortfolioLeftClient';
import GPortfolioLeftContact from './GPortfolioLeftContact';
import RequestButton from './RequestButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import profile from '../../reducers/profile';

const Portfolio1 = ({
  getProfileById,
  getProjects,
  auth: { user },
  profile: { profile1, loading },
  project: { projects },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getProjects(match.params.id);
  }, [getProfileById, getProjects, match.params.id]);

  const [displayLeft, toogleLeft] = useState(true);
  const [displayRight, toogleRight] = useState(true);
  const [viewAll1, setViewAll1] = useState(false);
  const [viewAll2, setViewAll2] = useState(false);
  const [viewAll3, setViewAll3] = useState(false);
  const [viewAll4, setViewAll4] = useState(false);
  const [viewAll5, setViewAll5] = useState(false);

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
                      {user?._id !== profile1?.user?._id && (
                        <Fragment>
                          <div className='btns'>
                            <div>
                              <RequestButton
                                peerid={profile1?._id}
                                reloadid={match.params.id}
                                profile={profile1}
                                isGroup={false}
                                user={user}
                              />
                            </div>

                            <div className='profile-tour-button'>
                              <Link
                                to={`/profile/${profile1?.user?._id}`}
                                className={`view-button `}
                              >
                                View profile
                              </Link>
                            </div>
                          </div>
                        </Fragment>
                      )}
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
                                  profile1?.experience.length > 2 ? '' : 'none',
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
                                      viewAll1 ? profile1?.experience.length : 2
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
                                  profile1?.education.length > 2 ? '' : 'none',
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
                      {profile1 !== null && (
                        <PortfolioRightTop
                          type='edit'
                          profile={profile1}
                          projects={projects}
                          id={match.params.id}
                        />
                      )}
                      <div className='main-grid-body'>
                        {profile1 !== null && (
                          <PortfolioRightBody type='edit' profile={profile1} />
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
    </>
  );
};

Portfolio1.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, { getProfileById, getProjects })(
  Portfolio1
);
