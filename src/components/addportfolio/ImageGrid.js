import React, { useState } from 'react';
import UseFirestore from './UseFireStore';
import axios from 'axios';
import { motion } from 'framer-motion';
import path from '../../images/path.svg';
import { projectFirestore, projectStorage } from '../../firebase/config';
import './Gallery.css';
import Audio from '../../images/audio.svg';

const ImageGrid = ({ type, setSelectedImg, id }) => {
  const [edit, setEdit] = useState('');
  const { docs } = UseFirestore('images');
  const [viewAllImg, setViewAllImg] = useState(false);
  const [viewAllVideo, setViewAllVideo] = useState(false);

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
      await axios.post(`/api/posts/delete`, {
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
      await axios.post(`/api/posts/delete`, {
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
    docs && docs.filter((i) => i.userId === id && i?.type === 'video');
  const image =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'photo');
  const audio =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'audio');

  const blog =
    docs && docs.filter((i) => i?.userId === id && i?.type === 'blog');

  return (
    // <div className="img-grid">
    //   {docs &&
    //     docs.map(
    //       (doc) =>
    //         doc.userId === id && (
    //           <motion.div
    //             className="img-wrap"
    //             key={doc.id}
    //             layout
    //             whileHover={{ opacity: 1 }}
    //           >
    //             {meta(doc.url) === ".mp4" ? (
    //               <motion.video
    //                 onClick={() =>
    //                   setSelectedImg({ selectedImg: doc.url, type: "video" })
    //                 }
    //                 controls
    //                 src={doc.url}
    //                 alt="uploaded pic"
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 transition={{ delay: 1 }}
    //               />
    //             ) : (
    //               <motion.img
    //                 onClick={() =>
    //                   setSelectedImg({ selectedImg: doc.url, type: "image" })
    //                 }
    //                 src={doc.url}
    //                 alt="uploaded pic"
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 transition={{ delay: 1 }}
    //               />
    //             )}
    //           </motion.div>
    //         )
    //     )}
    // </div>
    // ) : (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <h3>
          Videos <span style={{ color: '#5d67cc' }}>({videos.length})</span>
        </h3>
        <div
          onClick={() => {
            setViewAllVideo(!viewAllVideo);
          }}
          style={{ color: '#5d67cc', cursor: 'pointer' }}
        >
          View All
        </div>
      </div>
      <div className='img-grid'>
        {videos &&
          videos.slice(0, viewAllVideo ? videos.length : 3).map((doc) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
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
                        href='#!'
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
                onClick={() =>
                  setSelectedImg({
                    selectedImg: doc.url,
                    type: 'video',
                    description: doc?.description,
                  })
                }
                src={doc.url}
                alt='uploaded pic'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
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
          Pictures <span style={{ color: '#5d67cc' }}>({image.length})</span>
        </h3>
        <div
          onClick={() => {
            setViewAllImg(!viewAllImg);
          }}
          style={{ color: '#5d67cc', cursor: 'pointer' }}
        >
          View All
        </div>
      </div>

      <div className='img-grid'>
        {image &&
          image.slice(0, viewAllImg ? image.length : 3).map(
            (doc) =>
              meta(doc.url) !== '.mp4' && (
                <motion.div
                  className='img-wrap'
                  key={doc.id}
                  layout
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
                    onClick={() =>
                      setSelectedImg({
                        selectedImg: doc.url,
                        type: 'image',
                        description: doc?.description,
                      })
                    }
                    src={doc.url}
                    alt='uploaded pic'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </motion.div>
              )
          )}
      </div>

      <h3>
        Audio <span style={{ color: '#5d67cc' }}>({audio.length})</span>
      </h3>
      <div className='img-grid'>
        {audio &&
          audio.map((doc) => (
            <motion.div
              className='img-wrap'
              key={doc.id}
              layout
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
                onClick={() =>
                  setSelectedImg({
                    selectedImg: doc.url,
                    type: 'audio',
                    description: doc?.description,
                  })
                }
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
                // onClick={() =>
                //   setSelectedImg({ selectedImg: doc.url, type: "audio" })
                // }
                href={doc.url}
                // poster={Audio}
                target='_blank'
                // src={doc.url}
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
    </>
  );
};

export default ImageGrid;
