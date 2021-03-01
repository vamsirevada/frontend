import { GET_NOTIFICATIONS } from '../actions/types';

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
    default:
      return state;
  }
}
