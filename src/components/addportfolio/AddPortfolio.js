/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import AddPhoto from "./AddPhoto";
import AddVideo from "./AddVideos";
import AddSound from "./AddSoundTracks";
import AddBlog from "./AddBlog";
import { connect } from "react-redux";

const AddPortfolio = ({ auth: { user } }) => {
  const [displayPhoto, tooglePhoto] = useState(true);
  const [displayVideo, toogleVideo] = useState(false);
  const [displaySound, toogleSound] = useState(false);
  const [displayBlog, toogleBlog] = useState(false);

  const onClick1 = (e) => {
    tooglePhoto(true);
    toogleVideo(false);
    toogleSound(false);
    toogleBlog(false);
  };

  const onClick2 = (e) => {
    tooglePhoto(false);
    toogleVideo(true);
    toogleSound(false);
    toogleBlog(false);
  };
  const onClick3 = (e) => {
    tooglePhoto(false);
    toogleVideo(false);
    toogleSound(true);
    toogleBlog(false);
  };
  const onClick4 = (e) => {
    tooglePhoto(false);
    toogleVideo(false);
    toogleSound(false);
    toogleBlog(true);
  };

  return (
    <div className="add-portfolio">
      <div className="container">
        <div className="add-heading">
          <div className="container">
            <div className="heading-container">
              <div className="middle-heading">
                <h1>Starting adding Files</h1>
                <p>
                  <span className="blue-text"> {user && user.fullName}</span>
                </p>
              </div>
            </div>
            <hr className="new1" />
          </div>
        </div>

        <div id="add">
          <div className="container">
            <div className="main-add">
              <div className="main-left">
                <ul>
                  <a onClick={(e) => onClick1(e)}>
                    <li className="btn-gray">
                      Images
                      <br />
                      <span className="card">JPG,GIFs,PNG</span>
                    </li>
                  </a>
                  <a onClick={(e) => onClick2(e)}>
                    <li className="btn-gray">
                      Videos
                      <br />
                      <span className="card">Mp4</span>
                    </li>
                  </a>
                  <a onClick={(e) => onClick3(e)}>
                    <li className="btn-gray">
                      SoundTracks
                      <br />
                      <span className="card">Mp3</span>
                    </li>
                  </a>
                  <a onClick={(e) => onClick4(e)}>
                    <li className="btn-gray ">
                      Blog
                      <br />
                      <span className="card">Urls</span>
                    </li>
                  </a>
                </ul>
              </div>
              {displayPhoto && <AddPhoto />}
              {displayVideo && <AddVideo />}
              {displaySound && <AddSound />}
              {displayBlog && <AddBlog />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AddPortfolio);
