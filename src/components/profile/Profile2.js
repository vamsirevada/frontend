import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
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
import GroupProfileAbout from './GroupProfileAbout';
import GroupProfileFound from './GroupProfileFound';
import GroupTeamMember from './GroupTeamMember';
import GroupProfileSpecs from './GroupProfileSpecs';
import GroupProfileEvent from './GroupProfileEvent';
import GroupProfileAward from './GroupProfileAward';
import GroupPartner from './GroupPartner';
import GroupClient from './GroupClient';

const Profile2 = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { isGroup } = user;

  return isGroup ? (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
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
                <ProfileTop profile={profile} />
                <GroupProfileAbout profile={profile} />
                <hr className='new' />
                <GroupProfileFound profile={profile} />
                <hr className='new' />
                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <span className='m-1'>Team Members </span>{' '}
                      </h3>
                      {profile.teammembers.length === 0 && (
                        <div className='prof-heading-flex'>
                          <Link to='/edit-profile'>
                            <img src={c31} alt='c31' />
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className='prof-btn prof-btn-2'>
                      <div className='prof-btn-grid'>
                        {profile.teammembers.length > 0 && (
                          <Fragment>
                            {profile.teammembers.map((teammember) => (
                              <GroupTeamMember
                                key={teammember._id}
                                teammember={teammember}
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className='new'></hr>

                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <span className='m-1'>Specialisation :</span>{' '}
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
                      <div className='prof-btn-grid prof-btn-grid-3'>
                        {profile.skills.length > 0 && (
                          <Fragment>
                            {profile.skills.map((skill) => (
                              <GroupProfileSpecs
                                key={skill._id}
                                skill={skill}
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <img className='breifcase' src={nounevent} alt='edu' />{' '}
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
                              <GroupProfileEvent
                                key={events._id}
                                events={events}
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <img className='breifcase' src={partner} alt='edu' />{' '}
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
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
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
                              <GroupClient key={client._id} client={client} />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <img className='breifcase' src={nounAwards} alt='edu' />{' '}
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
                              <GroupProfileAward
                                key={awards._id}
                                awards={awards}
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new' />
                {/* <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <span className='m-1'>Contact Us </span>{' '}
                      </h3>
                    </div>

                    <div className='prof-btn prof-btn-2'>
                      <div className='prof-btn-grid prof-btn-grid-g'>
                        {profile.contactus.length > 0 ? (
                          <Fragment>
                            {profile.contactus.map((contactus) => (
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
                </div> */}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  ) : (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
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
                <ProfileTop profile={profile} isGroup={isGroup} />
                <ProfileAbout profile={profile} />
                <hr className='new' />
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
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new' />
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
                              />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>

                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <img className='breifcase' src={nounAwards} alt='edu' />{' '}
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
                              <ProfileAward key={awards._id} awards={awards} />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new' />
                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <img className='breifcase' src={nounSkill} alt='edu' />{' '}
                        <span className='m-1'>Skills</span>{' '}
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
                              <ProfileSkill key={skills._id} skills={skills} />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new'></hr>
                <div id='prof-exp'>
                  <div className='prof-exp-container'>
                    <div className='prof-heading'>
                      <h3>
                        <img className='breifcase' src={nounevent} alt='edu' />{' '}
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
                              <ProfileEvent key={events._id} events={events} />
                            ))}
                          </Fragment>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className='new' />
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
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
})(Profile2);
