import React, { useEffect } from 'react';
import UseStorage from './UseStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({
  file,
  setFile,
  type,
  title,
  description,
  setAlert,
  setUpload,
  setTitle,
  setDescription,
}) => {
  const { progress, url } = UseStorage(
    file,
    type,
    title,
    description,
    setAlert,
    setUpload,
    setTitle,
    setDescription
  );
  useEffect(() => {
    if (url) {
      setFile(null);
      setUpload(false);
    }
  }, [url, setFile, setUpload]);

  return (
    <motion.div
      className='progress-bar'
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    >
      {Math.round(progress) + '%'}
    </motion.div>
  );
};

export default ProgressBar;
