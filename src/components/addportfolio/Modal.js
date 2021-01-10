import React from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

const Modal = ({ setSelectedImg, selectedImg, type, description }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg({
        type: '',
        selectedImg: '',
        description: '',
      });
    }
  };

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {type === 'image' ? (
        <motion.img
          src={selectedImg}
          alt='enlarged pic'
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
        />
      ) : (
        <motion.video
          controls
          src={selectedImg}
          alt='enlarged pic'
          initial={{ y: '-100vh' }}
          animate={{ y: 0 }}
        />
      )}
      <h3 className='text-dec'>{description}</h3>
    </motion.div>
  );
};

export default Modal;
