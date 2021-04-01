import { GET_NOTIFICATIONS, MARK_NOTIFICATIONS_READ } from './types';
import { projectFirestore } from '../firebase/config';

export const getRealtimeNotifications = (user) => {
  return async (dispatch) => {
    projectFirestore
      .collection('notifications')
      .where('receiver', '==', user.uid_1)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const notifications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch({
          type: GET_NOTIFICATIONS,
          payload: { notifications },
        });
      });
  };
};

export const markNotificationsRead = (notificationIds) => {
  return async (dispatch) => {
    const batch = projectFirestore.batch();
    notificationIds.forEach((notificationId) => {
      const notification = projectFirestore.doc(
        `/notifications/${notificationId}`
      );
      batch.update(notification, { read: true });
    });
    batch.commit();
    dispatch({
      type: MARK_NOTIFICATIONS_READ,
    });
  };
};
