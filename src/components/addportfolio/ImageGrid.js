/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import path from '../../images/path.svg';
import poster from '../../images/poster.png';
import { projectFirestore, projectStorage } from '../../firebase/config';
import './Gallery.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ImageGrid = ({ auth: { user }, id, profile, docs, guest }) => {
  const history = useHistory();
  const [edit, setEdit] = useState('');
  const [viewAllImg, setViewAllImg] = useState(false);
  const [viewAllVideo, setViewAllVideo] = useState(false);
  const [viewAllAudio, setViewAllAudio] = useState(false);
  const [viewAllBlog, setViewAllBlog] = useState(false);

  const _remove = async (doc) => {
    if (doc?.type === 'Blog') {
      const collectionRef = projectFirestore.collection('images');
      collectionRef.doc(doc.id).delete();
      await api.post(`/posts/delete`, {
        url: doc?.url,
      });
    } else {
      const storageRef = projectStorage.refFromURL(doc?.url);
      storageRef.delete();
      const collectionRef = projectFirestore.collection('images');
      collectionRef.doc(doc.id).delete();
      await api.post(`/posts/delete`, {
        url: doc?.url,
      });
    }
  };

  const showModal = (docId) => {
    localStorage.setItem('location', history.location.pathname);
    history.push(`/portfolio/${id}/view/${docId}`);
  };

  const videos =
    docs && docs.filter((i) => i.userId === id && i?.type === 'Video');
  const images =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'Picture');
  const audios =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'Audio');
  const blogs =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'Blog');

  return (
    <span className='img-grid-container'>
      <div className='img-grid-heading'>
        <h3>
          Videos <span>({videos.length})</span>
        </h3>
      </div>
      <div className='img-grid'>
        {videos &&
          videos
            .slice(0, viewAllVideo ? videos.length : 9)
            .map((doc, index) => (
              <motion.div
                className='img-wrap video'
                key={doc.id}
                layout
                style={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
              >
                <div className='edit-container'>
                  {profile?.user?._id === user?._id && (
                    <>
                      <div
                        onClick={() => {
                          setEdit(edit === doc.url ? '' : doc.url);
                        }}
                        className='edit'
                      >
                        <img src={path} className='resize' alt='' />
                      </div>
                      {edit === doc.url && (
                        <ul className='edit-text-box'>
                          <li>
                            <a
                              className='edit-text'
                              onClick={() => {
                                _remove(doc);
                              }}
                            >
                              Remove
                            </a>
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </div>
                <motion.video
                  onClick={() => showModal(doc.id)}
                  className='img-wrap-audio'
                  muted
                  autoPlay
                  src={doc.url}
                  alt='uploaded pic'
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                ></motion.video>
                <p className='video-desc'>{doc.title}</p>
              </motion.div>
            ))}
      </div>
      {videos.length > 9 && (
        <div
          className='load'
          onClick={() => {
            setViewAllVideo(!viewAllVideo);
          }}
        >
          <div className='loadmore'>
            {viewAllVideo ? 'View Less' : 'View All'}
          </div>
        </div>
      )}
      <div className='img-grid-heading'>
        <h3>
          Pictures <span>({images.length})</span>
        </h3>
      </div>
      <div className='img-grid'>
        {images &&
          images.slice(0, viewAllImg ? images.length : 9).map((doc, index) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
              style={{ opacity: 1 }}
              whileHover={{ opacity: 1 }}
            >
              <div className='edit-container'>
                {profile?.user?._id === user?._id && (
                  <>
                    <div
                      onClick={() => {
                        setEdit(edit === doc.url ? '' : doc.url);
                      }}
                      className='edit'
                    >
                      <img src={path} className='resize' alt='' />
                    </div>
                    {edit === doc.url && (
                      <div className='edit-text-box'>
                        <div
                          className='edit-text'
                          onClick={() => {
                            _remove(doc);
                          }}
                        >
                          Remove
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <motion.img
                onClick={() => showModal(doc.id)}
                src={doc.url}
                alt='uploaded pic'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
              <p className='title-hide'>{doc.title}</p>
            </motion.div>
          ))}
      </div>
      {images.length > 9 && (
        <div
          className='load'
          onClick={() => {
            setViewAllImg(!viewAllImg);
          }}
        >
          <div className='loadmore'>
            {viewAllImg ? 'View Less' : 'View All'}
          </div>
        </div>
      )}
      <div className='img-grid-heading'>
        <h3>
          Audios <span>({audios.length})</span>
        </h3>
      </div>
      <div className='img-grid'>
        {audios &&
          audios
            .slice(0, viewAllAudio ? audios.length : 9)
            .map((doc, index) => (
              <motion.div
                className='img-wrap video'
                key={doc.id}
                layout
                style={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
              >
                <div className='edit-container'>
                  {profile?.user?._id === user?._id && (
                    <>
                      <div
                        onClick={() => {
                          setEdit(edit === doc.url ? '' : doc.url);
                        }}
                        className='edit'
                      >
                        <img src={path} className='resize' alt='' />
                      </div>

                      {edit === doc.url && (
                        <div className='edit-text-box'>
                          <div
                            className='edit-text'
                            onClick={() => {
                              _remove(doc);
                            }}
                          >
                            Remove
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <motion.video
                  className='img-wrap-audio'
                  onClick={() => showModal(doc.id)}
                  poster={poster}
                  controls
                  src={doc.url}
                  alt='uploaded pic'
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                ></motion.video>
                <p className='video-desc'>{doc.title}</p>
              </motion.div>
            ))}
      </div>
      {audios.length > 9 && (
        <div
          className='load'
          onClick={() => {
            setViewAllAudio(!viewAllAudio);
          }}
        >
          <div className='loadmore'>
            {viewAllAudio ? 'View Less' : 'View All'}
          </div>
        </div>
      )}
      <div className='img-grid-heading'>
        <h3>
          Blog <span>({blogs.length})</span>
        </h3>
      </div>
      <div className='img-grid blog'>
        {blogs &&
          blogs.slice(0, viewAllBlog ? blogs.length : 9).map((doc) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
              style={{ opacity: 1 }}
              whileHover={{ opacity: 1 }}
            >
              <div className='edit-container'>
                {profile?.user?._id === user?._id && (
                  <>
                    <div
                      onClick={() => {
                        setEdit(edit === doc.url ? '' : doc.url);
                      }}
                      className='edit'
                    >
                      <img src={path} className='resize' alt='' />
                    </div>
                    {edit === doc.url && (
                      <div className='edit-text-box blog'>
                        <div
                          className='edit-text'
                          onClick={() => {
                            _remove(doc, 'Blog');
                          }}
                        >
                          Remove
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <a rel='noreferrer' target='_blank' href={doc.url}>
                {doc.description}
              </a>
            </motion.div>
          ))}
      </div>
      {blogs.length > 9 && (
        <div
          className='load'
          onClick={() => {
            setViewAllBlog(!viewAllBlog);
          }}
        >
          <div className='loadmore'>
            {viewAllBlog ? 'View Less' : 'View All'}
          </div>
        </div>
      )}
    </span>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ImageGrid);
