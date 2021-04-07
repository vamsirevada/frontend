import { GET_DATA } from './types';
import { projectFirestore } from '../firebase/config';
import firebase from 'firebase/app';

export const getRealtimeData = (fileId) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .get()
      .then((data) => {
        dispatch({
          type: GET_DATA,
          payload: { id: data.id, ...data.data() },
        });
      });
  };
};

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

export const portfolioComment = (fileId, commentObj) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentObj),
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
