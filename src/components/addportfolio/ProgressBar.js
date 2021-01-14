import React, { useEffect } from "react";
import UseStorage from "./UseStorage";
import { motion } from "framer-motion";

const ProgressBar = ({
  file,
  setFile,
  type,
  description,
  setAlert,
  setUpload,
}) => {
  const { progress, url } = UseStorage(
    file,
    type,
    description,
    setAlert,
    setUpload
  );

  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
      setUpload(false);
    }
  }, [url, setFile, setUpload]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    >
      {Math.round(progress) + "%"}
    </motion.div>
  );
};

export default ProgressBar;
