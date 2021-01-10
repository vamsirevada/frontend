import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/vanitylogo.png";

const Page1 = () => {
  return (
    <Fragment>
      <div id="page-1" className="page">
        <div className="container">
          <div className="nav">
            <img className="logo" src={logo} alt="Logo" />
            <div>
              <ul>
                <li>
                  <Link to="/register">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-content">
            <div className="container1">
              <div className="content">
                <h1 className="ft-heading">
                  Networking platform for Media & Entertainment community
                </h1>
                <p className="ft-para">
                  Vanity is an Professional networking platform for the Media &
                  Entertainment community, with an aim to bring entertainment
                  industry professionals under one roof and facilitate them with
                  productive tools that will ensure success.
                </p>
                <Link to="/register" className="btn yellow">
                  Get started
                </Link>

                <div className="hide">
                  <div>
                    <Link to="/register" className="r-btn">
                      SignUp
                    </Link>
                  </div>
                  <div>
                    <Link to="/login" className="r-btn">
                      LogIn
                    </Link>
                  </div>
                  <div>
                    <Link to="/blog" className="r-btn">
                      Blog
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className='content-blank'></div> */}
              <div className="box-3"></div>
            </div>
          </div>
        </div>
        <div className="box-1"></div>
        <div className="box-2"></div>
        {/* <div className='box-3'></div> */}
        <div className="box-5"></div>
        {/* <div className='box-4'>
          <ul>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
            <li className='item'>
              <a href='#!'></a>
            </li>
          </ul>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Page1;
