import React, { useEffect } from 'react';
import UseStorage from './UseStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({
  file,
  type,
  title,
  description,
  stringlength,
  setAlert,
  setState,
}) => {
  const { progress, url } = UseStorage(
    file,
    type,
    title,
    description,
    stringlength,
    setAlert,
    setState
  );
  useEffect(() => {
    if (url) {
      setState({
        file: null,
        upload: false,
      });
    }
  }, [url, setState]);

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
