/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import vlogo from "../../images/vanitylogo3.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { sendInvite } from "../../actions/auth";

const Invite = ({ isAuthenticated, sendInvite, setAlert }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const { email, phone } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setAlert("Email is required", "danger", 2000);
    } else {
      sendInvite({ email });
    }
  };

  return (
    <Fragment>
      <div id="login" className="login">
        <div className="column-l1">
          <div className="logo-black">
            <Link to="/">
              <img src={vlogo} alt="" />
            </Link>
          </div>
        </div>

        <div className="column-l2">
          <div className="login-column">
            <div className="signup-top">
              <h3 className="signup-heading">Send Invites to your Friends</h3>
              <p className="signup-para">
                Enter your friends/colleagues Email-ids, so we send them
                referral code to join us!
              </p>
            </div>
            <br />
            <div style={{ display: "none" }}></div>
            <form className="flex-form-l1" onSubmit={(e) => onSubmit(e)}>
              <div className="usergroup">
                <label htmlFor="email" className="signup-label">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  className="btn-light"
                />
              </div>
              <button type="Submit" className="btn-yellow">
                {" "}
                Invite
              </button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Invite.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
  sendInvite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, sendInvite })(Invite);
