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
      .catch((error) => {
        console.error(error);
      });
  };
};

export const portfolioDisLike = (fileId, unlikeObj) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(unlikeObj),
      });
  };
};

export const portfolioUnComment = (fileId, uncommentObj) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .update({
        comments: firebase.firestore.FieldValue.arrayRemove(uncommentObj),
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const portfolioAcknowledge = (fileId, acknowledgeObj) => {
  return async (dispatch) => {
    projectFirestore
      .collection('images')
      .doc(fileId)
      .update({
        acknowledgements:
          firebase.firestore.FieldValue.arrayUnion(acknowledgeObj),
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
