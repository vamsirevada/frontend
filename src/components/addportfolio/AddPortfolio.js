/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import AddPhoto from './AddPhoto';
import AddVideo from './AddVideos';
import AddSound from './AddSoundTracks';
import AddBlog from './AddBlog';
import { connect } from 'react-redux';
import api from '../../utils/api';

const AddPortfolio = ({ auth: { user } }) => {
  const [displayPhoto, tooglePhoto] = useState(true);
  const [displayVideo, toogleVideo] = useState(false);
  const [displaySound, toogleSound] = useState(false);
  const [displayBlog, toogleBlog] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    return await api.get('/profile').then((data) => {
      setUsers(data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const suggestions = users.map((user) =>
    user.user.fullName ? user.user.fullName : user.user.groupName
  );

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
    <div className='add-portfolio'>
      <div className='container'>
        <div className='add-heading'>
          <div className='container'>
            <div className='heading-container'>
              <div className='middle-heading'>
                <h1>Starting adding Files</h1>
                <p>
                  <span className='blue-text'> {user && user.fullName}</span>
                  <span className='blue-text'> {user && user.groupName}</span>
                </p>
              </div>
            </div>
            <hr className='new1' />
          </div>
        </div>

        <div id='add'>
          <div className='container'>
            <div className='main-add'>
              <div className='main-left'>
                <ul>
                  <a onClick={(e) => onClick1(e)}>
                    <li className={displayPhoto ? 'btn-gray blue' : 'btn-gray'}>
                      Images
                      <br />
                      <span className='card'>JPG,GIFs,PNG</span>
                    </li>
                  </a>
                  <a onClick={(e) => onClick2(e)}>
                    <li className={displayVideo ? 'btn-gray blue' : 'btn-gray'}>
                      Videos
                      <br />
                      <span className='card'>Mp4, Mkv, Mov,(Any)</span>
                    </li>
                  </a>
                  <a onClick={(e) => onClick3(e)}>
                    <li className={displaySound ? 'btn-gray blue' : 'btn-gray'}>
                      SoundTracks
                      <br />
                      <span className='card'>Mp3</span>
                    </li>
                  </a>
                  <a onClick={(e) => onClick4(e)}>
                    <li className={displayBlog ? 'btn-gray blue' : 'btn-gray'}>
                      Blog
                      <br />
                      <span className='card'>Urls</span>
                    </li>
                  </a>
                </ul>
              </div>
              {displayPhoto && <AddPhoto suggestions={suggestions} />}
              {displayVideo && <AddVideo suggestions={suggestions} />}
              {displaySound && <AddSound suggestions={suggestions} />}
              {displayBlog && <AddBlog suggestions={suggestions} />}
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
