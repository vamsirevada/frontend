/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import UseFirestore from './UseFireStore';
import api from '../../utils/api';
import { motion } from 'framer-motion';
import path from '../../images/path.svg';
import { projectFirestore, projectStorage } from '../../firebase/config';
import { getRealtimeData } from '../../actions/portfolio';
import './Gallery.css';
import Audio from '../../images/audio.svg';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import VideoModal from './VideoModal';

const ImageGrid = ({ id, profile }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState('');
  const { docs } = UseFirestore('images');
  const [viewAllImg, setViewAllImg] = useState(false);
  const [viewAllVideo, setViewAllVideo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [value, setValue] = useState(0);
  const [dispImage, setDispImage] = useState({ imageUrl: '' });
  const [dispVideo, setDispVideo] = useState({ videoUrl: '' });

  const _remove = async (name, type) => {
    if (type === 'blog') {
      const collectionRef = projectFirestore.collection('images');
      collectionRef
        .where('Id', '==', name?.Id)
        .get()
        .then((i) => {
          i.forEach((d) => {
            d.ref.delete();
          });
        });
      await api.post(`/posts/delete`, {
        url: name?.url,
      });
    } else {
      const storageRef = projectStorage.refFromURL(name?.url);
      storageRef.delete();
      const collectionRef = projectFirestore.collection('images');
      collectionRef
        .where('Id', '==', name?.Id)
        .get()
        .then((i) => {
          i.forEach((d) => {
            d.ref.delete();
          });
        });
      await api.post(`/posts/delete`, {
        url: name?.url,
      });
    }
  };

  const meta = (url) => {
    var new_url = url.substring(0, url.indexOf('?alt'));
    const ext = new_url.substring(new_url.lastIndexOf('.'));
    return ext;
  };

  const videos =
    docs && docs.filter((i) => i.userId === id && i?.type === 'Video');
  const images =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'Picture');
  const audio =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'Audio');
  const blog =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'Blog');

  const displayImage = (index) => {
    const image = images[index];
    setDispImage({
      imageUrl: image.url,
    });
    setValue(index);
    setShowImage(true);
  };

  const hideImage = () => {
    setShowImage(false);
  };

  const displayVideo = (index) => {
    const video = videos[index];
    setDispVideo({
      videoUrl: video.url,
    });
    setValue(index);
    setShowVideo(true);
  };

  const hideVideo = () => {
    setShowVideo(false);
  };

  return (
    <span>
      {showImage && (
        <Modal
          displayImage={displayImage}
          dispImage={dispImage}
          images={images}
          profile={profile}
          close={hideImage}
          value={value}
        />
      )}
      {showVideo && (
        <VideoModal
          displayVideo={displayVideo}
          dispVideo={dispVideo}
          videos={videos}
          profile={profile}
          close={hideVideo}
          value={value}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <h3>
          Videos
          <span style={{ color: '#5d67cc' }}>({videos.length})</span>
        </h3>
        <div
          onClick={() => {
            setViewAllVideo(!viewAllVideo);
          }}
          style={{ color: '#5d67cc', cursor: 'pointer', fontSize: '14px' }}
        >
          View All
        </div>
      </div>
      <div className='img-grid'>
        {videos &&
          videos
            .slice(0, viewAllVideo ? videos.length : 3)
            .map((doc, index) => (
              <motion.div
                className='img-wrap'
                key={doc.id}
                layout
                style={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
              >
                <div className='edit-container'>
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
                </div>
                <motion.video
                  onClick={() => {
                    displayVideo(index);
                    dispatch(getRealtimeData(doc.id));
                  }}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <h3>
          Pictures <span style={{ color: '#5d67cc' }}>({images.length})</span>
        </h3>
        <div
          onClick={() => {
            setViewAllImg(!viewAllImg);
          }}
          style={{ color: '#5d67cc', cursor: 'pointer', fontSize: '14px' }}
        >
          View All
        </div>
      </div>

      <div className='img-grid'>
        {images &&
          images.slice(0, viewAllImg ? images.length : 3).map(
            (doc, index) =>
              meta(doc.url) !== '.mp4' && (
                <motion.div
                  className='img-wrap'
                  key={doc.id}
                  layout
                  style={{ opacity: 1 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className='edit-container'>
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
                          Remove Project
                        </div>
                      </div>
                    )}
                  </div>
                  <motion.img
                    onClick={() => {
                      displayImage(index);
                      dispatch(getRealtimeData(doc.id));
                    }}
                    src={doc.url}
                    alt='uploaded pic'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                  <p className='title-hide'>{doc.title}</p>
                </motion.div>
              )
          )}
      </div>
      <h3>
        Audio <span style={{ color: '#5d67cc' }}>({audio.length})</span>
      </h3>
      <div className='img-grid'>
        {audio &&
          audio.map((doc, index) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
              style={{ opacity: 1 }}
              whileHover={{ opacity: 1 }}
            >
              <div className='edit-container'>
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
                      Remove Project
                    </div>
                  </div>
                )}
              </div>
              <motion.video
                poster={Audio}
                src={doc.url}
                alt='uploaded pic'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          ))}
      </div>
      <h3>
        Blog <span style={{ color: '#5d67cc' }}>({blog.length})</span>
      </h3>
      <div className='img-grid'>
        {blog &&
          blog.map((doc) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
              style={{ opacity: 1 }}
              whileHover={{ opacity: 1 }}
            >
              <div className='edit-container'>
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
                        _remove(doc, 'blog');
                      }}
                    >
                      Remove Project
                    </div>
                  </div>
                )}
              </div>
              <motion.a
                href={doc.url}
                target='_blank'
                alt='uploaded pic'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {doc.url}
              </motion.a>
            </motion.div>
          ))}
      </div>
    </span>
  );
};

export default ImageGrid;
