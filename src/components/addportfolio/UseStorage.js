import api from '../../utils/api';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from '../../firebase/config';
import preview from '../../images/preview.png';

const UseStorage = (
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
) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);

    const collectionRef = projectFirestore.collection('images');

    storageRef.put(file).on(
      'state_changed',
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = await timestamp();
        const userId = user?._id;
        const userName = user?.fullName ? user?.fullName : user?.groupName;
        const userAvatar = user?.avatar;
        const Id = uuidv4();

        const body = {
          text: description,
          title: title,
          url: `${url}`,
          type: type,
          user: userId,
        };

        await api
          .post('/posts', body)
          .then(async (res) => {
            await collectionRef.add({
              type,
              url,
              title,
              description,
              stringlength,
              createdAt,
              userId,
              userName,
              userAvatar,
              Id,
            });
            await setAlert('Portfolio updated Successfully', 'success');
            await setUpload(false);
            await setTitle('');
            await setDescription('');
            await setStringLength(0);
            await setDisplay(preview);
          })

          .catch((err) => {
            alert(JSON.stringify(err));
          });

        setUrl(url);
      }
    );
  }, [
    description,
    file,
    setAlert,
    title,
    type,
    stringlength,
    user?._id,
    user?.fullName,
    user?.groupName,
    user?.avatar,
    setUpload,
    setTitle,
    setDescription,
    setStringLength,
    setDisplay,
  ]);

  return { progress, url, error };
};

export default UseStorage;
