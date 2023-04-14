/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { getProjects } from '../../actions/project';
import briefcase from '../../images/icons/nounBriefcase.svg';
import nounEducation from '../../images/icons/noun_education_2177318.svg';
import nounAwards from '../../images/icons/noun_Trophy_2135552.svg';
import nounSkill from '../../images/icons/noun_skill_1863702.svg';
import nounevent from '../../images/icons/noun_event_1828492.svg';
import part from '../../images/specialisation.svg';
import cli from '../../images/client.svg';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileAward from './ProfileAward';
import ProfileSkill from './ProfileSkill';
import ProfileEvent from './ProfileEvent';
import GroupProfileFound from './GroupProfileFound';
import GroupTeamMember from './GroupTeamMember';
import GroupPartner from './GroupPartner';
import GroupClient from './GroupClient';
import GroupContact from './GroupContact';
import Moment from 'react-moment';
import Loader from '../layout/Loader';
import { hideLoader } from '../../actions/application';

const Profile = ({
  getProfileById,
  profile: { profile1, loading },
  project: { projects },
  getProjects,
  hideLoader,
  auth: { isGroup },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getProjects(match.params.id);
    setTimeout(() => {
      hideLoader();
    }, 1500);
  }, [getProfileById, getProjects, hideLoader, match.params.id]);

  return (
    <Fragment>
      <Loader />
      <div id='c-profile'>
        <div className='container'>
          <div className='create-container'>
            <div className='profile'>
              <div className='prof-heading'>
                <h2 className='heading-1'>
                  <span className='m-1'>Profile Details</span>{' '}
                </h2>
              </div>
            </div>
            <ProfileTop profile={profile1} projects={projects} />
            <ProfileAbout profile={profile1} />
            <hr className='new' />
            {profile1.founder.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-btn'>
                    <div className='prof-btn-grid'>
                      {profile1.founder.length > 0 && (
                        <Fragment>
                          {profile1.founder.map((founder) => (
                            <GroupProfileFound
                              key={founder._id}
                              profile={profile1}
                            />
                          ))}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
              </div>
            )}
            {profile1.experience.length > 0 && (
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
                  </div>

                  <div className='prof-btn'>
                    <div className='prof-btn-grid'>
                      {profile1.experience.length > 0 ? (
                        <Fragment>
                          {profile1.experience.map((experience) => (
                            // <profileExperience
                            //    key={experience._id}
                            //   experience={experience}
                            // />
                            <div key={experience._id} className='btn-gray'>
                              <div>
                                {experience.title}
                                <br />
                                {experience.company} <br />
                                <span className='font-light'>
                                  <Moment format='MMM YYYY'>
                                    {experience.from}
                                  </Moment>{' '}
                                  -{' '}
                                  {experience.to === null ? (
                                    'Now'
                                  ) : (
                                    <Moment format='MMM YYYY'>
                                      {experience.to}
                                    </Moment>
                                  )}
                                </span>
                              </div>
                            </div>
                          ))}
                        </Fragment>
                      ) : (
                        <h4> No experience credientials</h4>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new' />
              </div>
            )}

            {profile1.education.length > 0 && (
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
                  </div>

                  <div className='prof-btn-1'>
                    <div className='prof-btn-grid-1'>
                      {profile1.education.length > 0 ? (
                        <Fragment>
                          {profile1.education.map((education) => (
                            <ProfileEducation
                              key={education._id}
                              education={education}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      ) : (
                        <h4> No Education credientials</h4>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
              </div>
            )}
            {profile1.teammembers.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <span className='m-1'>Team Members </span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn prof-btn-2'>
                    <div className='prof-btn-grid'>
                      {profile1.teammembers.length > 0 ? (
                        <Fragment>
                          {profile1.teammembers.map((teammember) => (
                            <GroupTeamMember
                              key={teammember._id}
                              teammember={teammember}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      ) : (
                        <h4> No experience credientials</h4>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
              </div>
            )}
            {profile1.skills.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <img className='breifcase' src={nounSkill} alt='edu' />{' '}
                      <span className='m-1'>Specialised in</span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn'>
                    <div className='prof-btn-grid'>
                      {profile1.skills.length > 0 && (
                        <Fragment>
                          {profile1.skills.map((skills) => (
                            <ProfileSkill
                              key={skills._id}
                              skills={skills}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
              </div>
            )}
            {profile1.awards.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <img className='breifcase' src={nounAwards} alt='edu' />{' '}
                      <span className='m-1'>Awards & honours</span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn-1'>
                    <div className='prof-btn-grid-1'>
                      {profile1.awards.length > 0 && (
                        <Fragment>
                          {profile1.awards.map((awards) => (
                            <ProfileAward
                              key={awards._id}
                              awards={awards}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new' />
              </div>
            )}

            {profile1.events.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <img className='breifcase' src={nounevent} alt='edu' />{' '}
                      <span className='m-1'>Events :</span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn-1'>
                    <div className='prof-btn-grid-1'>
                      {profile1.events.length > 0 && (
                        <Fragment>
                          {profile1.events.map((events) => (
                            <ProfileEvent
                              key={events._id}
                              events={events}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new' />
              </div>
            )}
            {profile1.partners.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <img className='breifcase' src={part} alt='edu' />{' '}
                      <span className='m-1'>Our Partners</span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn'>
                    <div className='prof-btn-grid'>
                      {profile1.partners.length > 0 && (
                        <Fragment>
                          {profile1.partners.map((partner) => (
                            <GroupPartner
                              key={partner._id}
                              partner={partner}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
              </div>
            )}
            {profile1.clients.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <img className='breifcase' src={cli} alt='edu' />{' '}
                      <span className='m-1'>Our Clients</span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn'>
                    <div className='prof-btn-grid'>
                      {profile1.clients.length > 0 && (
                        <Fragment>
                          {profile1.clients.map((client) => (
                            <GroupClient
                              key={client._id}
                              client={client}
                              show={false}
                            />
                          ))}
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
              </div>
            )}
            {profile1.contactus.length > 0 && (
              <div id='prof-exp'>
                <div className='prof-exp-container'>
                  <div className='prof-heading'>
                    <h3>
                      <span className='m-1'>Contact Us </span>{' '}
                    </h3>
                  </div>

                  <div className='prof-btn prof-btn-2'>
                    <div className='prof-btn-grid prof-btn-grid-g'>
                      {profile1.contactus.length > 0 ? (
                        <Fragment>
                          {profile1.contactus.map((contactus) => (
                            <GroupContact
                              key={contactus._id}
                              awards={contactus}
                            />
                          ))}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <p> Add Details</p>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProfileById,
  getProjects,
  hideLoader,
})(Profile);
