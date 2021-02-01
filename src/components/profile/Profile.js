/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import briefcase from "../../images/icons/nounBriefcase.svg";
import nounEducation from "../../images/icons/noun_education_2177318.svg";
import nounAwards from "../../images/icons/noun_Trophy_2135552.svg";
import nounSkill from "../../images/icons/noun_skill_1863702.svg";
import nounevent from "../../images/icons/noun_event_1828492.svg";
import part from "../../images/specialisation.svg";
import cli from "../../images/client.svg";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
// import ProfileExperience from './ProfileExperience';
import ProfileEducation from "./ProfileEducation";
import ProfileAward from "./ProfileAward";
import ProfileSkill from "./ProfileSkill";
import ProfileEvent from "./ProfileEvent";
import GroupProfileFound from "./GroupProfileFound";
import GroupTeamMember from "./GroupTeamMember";
import GroupPartner from "./GroupPartner";
import GroupClient from "./GroupClient";
import GroupContact from "./GroupContact";
import { deleteExperience } from "../../actions/profile";
import Moment from "react-moment";
import nounPlus from "../../images/icons/noun_Plus_2310779.svg";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  deleteExperience,
  auth: { isGroup },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div id="c-profile">
            <div className="container">
              <div className="create-container">
                <div className="profile">
                  <div className="prof-heading">
                    <h2 className="heading-1">
                      <span className="m-1">Profile Details</span>{" "}
                    </h2>
                  </div>
                </div>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <hr className="new" />
                {profile.founder.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-btn">
                        <div className="prof-btn-grid">
                          {profile.founder.length > 0 && (
                            <Fragment>
                              {profile.founder.map((founder) => (
                                <GroupProfileFound
                                  key={founder._id}
                                  profile={profile}
                                />
                              ))}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="new"></hr>
                  </div>
                )}
                {profile.experience.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img
                            className="breifcase"
                            src={briefcase}
                            alt="briefcase"
                          />{" "}
                          <span className="m-1">Professional Experience</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn">
                        <div className="prof-btn-grid">
                          {profile.experience.length > 0 ? (
                            <Fragment>
                              {profile.experience.map((experience) => (
                                // <ProfileExperience
                                //   key={experience._id}
                                //   experience={experience}
                                // />
                                <div className="btn-gray">
                                  <div>
                                    {experience.title}
                                    {experience._id}
                                    <a
                                      className="cross-1"
                                      onClick={() =>
                                        deleteExperience(experience._id)
                                      }
                                    >
                                      <img src={nounPlus} alt="" />
                                    </a>
                                    <br />
                                    {experience.company} <br />
                                    <span className="font-light">
                                      <Moment format="MMM YYYY">
                                        {experience.from}
                                      </Moment>{" "}
                                      -{" "}
                                      {experience.to === null ? (
                                        "Now"
                                      ) : (
                                        <Moment format="MMM YYYY">
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
                    <hr className="new" />
                  </div>
                )}

                {profile.education.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img
                            className="breifcase"
                            src={nounEducation}
                            alt="edu"
                          />{" "}
                          <span className="m-1">Education</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn-1">
                        <div className="prof-btn-grid-1">
                          {profile.education.length > 0 ? (
                            <Fragment>
                              {profile.education.map((education) => (
                                <ProfileEducation
                                  key={education._id}
                                  education={education}
                                />
                              ))}
                            </Fragment>
                          ) : (
                            <h4> No Education credientials</h4>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="new"></hr>
                  </div>
                )}
                {profile.awards.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img
                            className="breifcase"
                            src={nounAwards}
                            alt="edu"
                          />{" "}
                          <span className="m-1">Awards & honours</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn-1">
                        <div className="prof-btn-grid-1">
                          {profile.awards.length > 0 && (
                            <Fragment>
                              {profile.awards.map((awards) => (
                                <ProfileAward
                                  key={awards._id}
                                  awards={awards}
                                />
                              ))}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="new" />
                  </div>
                )}

                {profile.skills.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img
                            className="breifcase"
                            src={nounSkill}
                            alt="edu"
                          />{" "}
                          <span className="m-1">Specialised in</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn">
                        <div className="prof-btn-grid">
                          {profile.skills.length > 0 && (
                            <Fragment>
                              {profile.skills.map((skills) => (
                                <ProfileSkill
                                  key={skills._id}
                                  skills={skills}
                                />
                              ))}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="new"></hr>
                  </div>
                )}

                {profile.teammembers.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <span className="m-1">Team Members </span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn prof-btn-2">
                        <div className="prof-btn-grid">
                          {profile.teammembers.length > 0 ? (
                            <Fragment>
                              {profile.teammembers.map((teammember) => (
                                <GroupTeamMember
                                  key={teammember._id}
                                  teammember={teammember}
                                />
                              ))}
                            </Fragment>
                          ) : (
                            <h4> No experience credientials</h4>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="new"></hr>
                  </div>
                )}

                {profile.events.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img
                            className="breifcase"
                            src={nounevent}
                            alt="edu"
                          />{" "}
                          <span className="m-1">Events :</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn-1">
                        <div className="prof-btn-grid-1">
                          {profile.events.length > 0 && (
                            <Fragment>
                              {profile.events.map((events) => (
                                <ProfileEvent
                                  key={events._id}
                                  events={events}
                                />
                              ))}
                            </Fragment>
                          )}
                        </div>
                      </div>
                    </div>
                    <hr className="new" />
                  </div>
                )}
                {profile.partners.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img className="breifcase" src={part} alt="edu" />{" "}
                          <span className="m-1">Our Partners</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn">
                        <div className="prof-btn-grid">
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
                    <hr className="new"></hr>
                  </div>
                )}
                {profile.clients.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <img className="breifcase" src={cli} alt="edu" />{" "}
                          <span className="m-1">Our Clients</span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn">
                        <div className="prof-btn-grid">
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
                    <hr className="new"></hr>
                  </div>
                )}
                {profile.contactus.length > 0 && (
                  <div id="prof-exp">
                    <div className="prof-exp-container">
                      <div className="prof-heading">
                        <h3>
                          <span className="m-1">Contact Us </span>{" "}
                        </h3>
                      </div>

                      <div className="prof-btn prof-btn-2">
                        <div className="prof-btn-grid prof-btn-grid-g">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, deleteExperience })(
  Profile
);
