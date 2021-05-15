import api from '../../utils/api';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from '../../firebase/config';

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
const UseStorage = (
  file,
  type,
  title,
  description,
  setAlert,
  setUpload,
  setTitle,
  setDescription
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
        const token = await localStorage.getItem('token');
        const user = await parseJwt(token);
        const userId = user?.user?.id;
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
              createdAt,
              userId,
              Id,
            });
            await setUpload(false);
            await setTitle('');
            await setDescription('');
            await setAlert('Portfolio updated Successfully', 'success');
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
    setUpload,
    title,
    type,
    setTitle,
    setDescription,
  ]);

  return { progress, url, error };
};

export default UseStorage;
