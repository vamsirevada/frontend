import { GET_CHATS, GET_MESSAGES, MARK_MESSAGES_READ } from './types';
import { projectFirestore } from '../firebase/config';

export const updateMessage = (msgObj) => {
  return async () => {
    projectFirestore
      .collection('conversations')
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getAllConversations = (user_id) => {
  return async (dispatch) => {
    projectFirestore
      .collection('conversations')
      // .where('user_uid_2', '==', user_id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({
          type: GET_MESSAGES,
          payload: { messages },
        });
      });
  };
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    projectFirestore
      .collection('conversations')
      .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        const conversations = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push({ id: doc.id, ...doc.data() });
          }
        });

        dispatch({
          type: GET_CHATS,
          payload: { conversations },
        });
      });
  };
};

export const messageNotificationsRead = (messageIds) => {
  return async (dispatch) => {
    const batch = projectFirestore.batch();
    messageIds.forEach((messageId) => {
      const message = projectFirestore.doc(`/conversations/${messageId}`);
      batch.update(message, { isView: true });
    });
    batch.commit();
    dispatch({
      type: MARK_MESSAGES_READ,
    });
  };
};
