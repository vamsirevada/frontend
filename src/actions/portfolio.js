import { GET_DATA } from './types';
import { projectFirestore } from '../firebase/config';
import firebase from 'firebase/app';

export const portfolioLike = (fileId, likeObj) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(likeObj),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const portfolioDisLike = (fileId, likes, userId) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .update({
        likes: likes.filter((like) => like.user !== userId),
      });
  };
};

export const getRealtimeData = (fileId) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .get()
      .then((data) => {
        dispatch({
          type: GET_DATA,
          payload: data.data(),
        });
      });
  };
};
