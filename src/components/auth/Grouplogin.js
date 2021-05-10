import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import vlogo from "../../images/vanitylogo3.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { groupLogin } from "../../actions/auth";

const Grouplogin = ({ groupLogin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit1 = async (e) => {
    e.preventDefault();
    groupLogin(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/groupportfolio" />;
  }

  return (
    <Fragment>
      <div id="login" className="login">
        <div className="column-l1 group">
          <div className="logo-black">
            <Link to="/">
              <img src={vlogo} alt="" />
            </Link>
          </div>
        </div>

        <div className="column-l2">
          <div className="login-column">
            <div className="signup-top">
              <h3 className="signup-heading">Login to Vanity</h3>
              <p className="signup-para">
                Hey ! Welcome, Please login into your account
              </p>
              <p className="signup-para invite">
                {" "}
                <Link to="/invite">
                  <span className="referral-request-1">Invite friends</span>
                </Link>
              </p>
            </div>
            <br />
            <div className="signup-usertype">
              <h4 className="signup-label">Are you an individual or Group?</h4>
              <div className="ut-flexform">
                <Link to="/login" className="ut-btn-light">
                  individual
                </Link>
                <br />
                <Link to="/grouplogin" className="ut-btn-light-border">
                  Group
                </Link>
              </div>
            </div>
            <br />
            <form className="flex-form-l1" onSubmit={(e) => onSubmit1(e)}>
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

              <div className="usergroup">
                <label htmlFor="password" className="signup-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  className="btn-light"
                />
              </div>

              <div className="fgt">
                <Link to="/forgot-password" className="fgt-1">
                  Forgot Password
                </Link>
                <Link to="/groupregister">
                  <span className="referral-request">
                    Don't have an account?
                  </span>
                </Link>
              </div>
              <br />
              <button type="Submit" className="btn-yellow">
                {" "}
                Login
              </button>
              <br />
            </form>
            <br />
            <br />
            <p className="or">-------or-------</p>
            <br />

            <div className="flex-form">
              <div className="formcolumn-1">
                <button type="Submit" className="ut-btn-light-g">
                  {" "}
                  Sign in with Google{" "}
                </button>
              </div>

              <div className="formcolumn-2">
                <button type="Submit" className="ut-btn-light-f">
                  {" "}
                  Sign in with Facebook{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Grouplogin.propTypes = {
  groupLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { groupLogin })(Grouplogin);
