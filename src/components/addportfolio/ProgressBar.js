import React, { useEffect } from 'react';
import UseStorage from './UseStorage';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';

const ProgressBar = ({
  auth: { user },
  file,
  type,
  title,
  description,
  stringlength,
  setAlert,
  setFile,
  setUpload,
  setTitle,
  setDescription,
  setStringLength,
  setDisplay,
}) => {
  const { progress, url } = UseStorage(
    user,
    file,
    type,
    title,
    description,
    stringlength,
    setAlert,
    setUpload,
    setTitle,
    setDescription,
    setStringLength,
    setDisplay
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProgressBar);
