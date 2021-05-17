import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../actions/project';
import briefcase from '../../images/icons/nounBriefcase.svg';
import nounEducation from '../../images/icons/noun_education_2177318.svg';

import nounAwards from '../../images/icons/noun_Trophy_2135552.svg';
import nounSkill from '../../images/icons/noun_skill_1863702.svg';
import nounevent from '../../images/icons/noun_event_1828492.svg';
import partner from '../../images/specialisation.svg';
import client from '../../images/client.svg';
import c31 from '../../images/Component 31.svg';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileAward from './ProfileAward';
import ProfileSkill from './ProfileSkill';
import ProfileEvent from './ProfileEvent';
import GroupProfileFound from './GroupProfileFound';
import GroupTeamMember from './GroupTeamMember';
import GroupPartner from './GroupPartner';
import GroupClient from './GroupClient';
import Loader from '../layout/Loader';

const Profile2 = ({
  profile: { profile, loading },
  auth: { user },
  project: { projects },
  getProjects,
}) => {
  const { isGroup, _id } = user;

  useEffect(() => {
    getProjects(_id);
  }, [getProjects, _id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div id='c-profile'>
            <div className='container'>
              <div className='create-container'>
                <div className='profile'>
                  <div className='prof-heading'>
                    <h2 className='heading-1'>
                      <span className='m-1'>Profile Details</span>{' '}
                    </h2>
                    <p className='btn-yellow'>
                      {' '}
                      <Link to='/edit-profile'>Edit Profile</Link>{' '}
                    </p>
                  </div>
                </div>
                <ProfileTop
                  profile={profile}
                  isGroup={isGroup}
                  projects={projects}
                />
                <ProfileAbout profile={profile} />
                <hr className='new' />
                {profile?.founder.length !== 0 && (
                  <Fragment>
                    <GroupProfileFound profile={profile} />
                    <hr className='new' />
                  </Fragment>
                )}

                {profile?.teammembers.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <span className='m-1'>Team Members </span>{' '}
                          </h3>
                          {/* {profile.teammembers.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )} */}
                        </div>

                        <div className='prof-btn prof-btn-2'>
                          <div className='prof-btn-grid'>
                            {profile.teammembers.length > 0 && (
                              <Fragment>
                                {profile.teammembers.map((teammember) => (
                                  <GroupTeamMember
                                    key={teammember._id}
                                    teammember={teammember}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new' />
                  </Fragment>
                )}
                {profile.experience.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img
                              className='breifcase'
                              src={briefcase}
                              alt='briefcase'
                            />{' '}
                            <span className='m-1'>Professional Experience</span>{' '}
                          </h3>
                          {profile.experience.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn'>
                          <div className='prof-btn-grid'>
                            {profile.experience.length > 0 && (
                              <Fragment>
                                {profile.experience.map((experience) => (
                                  <ProfileExperience
                                    key={experience._id}
                                    experience={experience}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new' />
                  </Fragment>
                )}
                {profile.education.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img
                              className='breifcase'
                              src={nounEducation}
                              alt='edu'
                            />{' '}
                            <span className='m-1'>Education</span>{' '}
                          </h3>
                          {profile.education.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn-1'>
                          <div className='prof-btn-grid-1'>
                            {profile.education.length > 0 && (
                              <Fragment>
                                {profile.education.map((education) => (
                                  <ProfileEducation
                                    key={education._id}
                                    education={education}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new'></hr>
                  </Fragment>
                )}
                {profile.skills.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img
                              className='breifcase'
                              src={nounSkill}
                              alt='edu'
                            />{' '}
                            <span className='m-1'>
                              Specialisation / Skills :
                            </span>{' '}
                          </h3>
                          {profile.skills.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn'>
                          <div className='prof-btn-grid'>
                            {profile.skills.length > 0 && (
                              <Fragment>
                                {profile.skills.map((skills) => (
                                  <ProfileSkill
                                    key={skills._id}
                                    skills={skills}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new'></hr>
                  </Fragment>
                )}
                {profile.partners.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img
                              className='breifcase'
                              src={partner}
                              alt='edu'
                            />{' '}
                            <span className='m-1'>Our Partners</span>{' '}
                          </h3>
                          {profile.partners.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn'>
                          <div className='prof-btn-grid'>
                            {profile.partners.length > 0 && (
                              <Fragment>
                                {profile.partners.map((partner) => (
                                  <GroupPartner
                                    key={partner._id}
                                    partner={partner}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new'></hr>
                  </Fragment>
                )}
                {profile.clients.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img className='breifcase' src={client} alt='edu' />{' '}
                            <span className='m-1'>Our Clients</span>{' '}
                          </h3>
                          {profile.clients.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn'>
                          <div className='prof-btn-grid'>
                            {profile.clients.length > 0 && (
                              <Fragment>
                                {profile.clients.map((client) => (
                                  <GroupClient
                                    key={client._id}
                                    client={client}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new'></hr>
                  </Fragment>
                )}
                {profile.awards.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img
                              className='breifcase'
                              src={nounAwards}
                              alt='edu'
                            />{' '}
                            <span className='m-1'>Awards & honours</span>{' '}
                          </h3>
                          {profile.awards.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn-1'>
                          <div className='prof-btn-grid-1'>
                            {profile.awards.length > 0 && (
                              <Fragment>
                                {profile.awards.map((awards) => (
                                  <ProfileAward
                                    key={awards._id}
                                    awards={awards}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className='new' />
                  </Fragment>
                )}

                {profile.events.length !== 0 && (
                  <Fragment>
                    <div id='prof-exp'>
                      <div className='prof-exp-container'>
                        <div className='prof-heading'>
                          <h3>
                            <img
                              className='breifcase'
                              src={nounevent}
                              alt='edu'
                            />{' '}
                            <span className='m-1'>Events :</span>{' '}
                          </h3>
                          {profile.events.length === 0 && (
                            <div className='prof-heading-flex'>
                              <Link to='/edit-profile'>
                                <img src={c31} alt='c31' />
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className='prof-btn-1'>
                          <div className='prof-btn-grid-1'>
                            {profile.events.length > 0 && (
                              <Fragment>
                                {profile.events.map((events) => (
                                  <ProfileEvent
                                    key={events._id}
                                    events={events}
                                    show={true}
                                  />
                                ))}
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className='new' />
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile2.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProjects })(Profile2);
