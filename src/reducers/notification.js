import { GET_NOTIFICATIONS, MARK_NOTIFICATIONS_READ } from '../actions/types';

const initialState = {
  notifications: [],
};
//eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload.notifications,
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
