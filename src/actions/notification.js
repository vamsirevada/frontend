import { GET_NOTIFICATIONS } from './types';
import { projectFirestore } from '../firebase/config';

export const getRealtimeNotifications = () => {
  return async (dispatch) => {
    projectFirestore
      .collection('notifications')
      .orderBy('createdAt', 'asc')
      .onSnapshot((snapshot) => {
        const notifications = [];
        snapshot.forEach((doc) => {
          notifications.push(doc.data());
        });
        dispatch({
          type: GET_NOTIFICATIONS,
          payload: { notifications },
        });
      });
  };
};
