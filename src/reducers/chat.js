import { GET_CHATS, GET_MESSAGES, MARK_MESSAGES_READ } from '../actions/types';

const initialState = {
  messages: [],
  conversations: [],
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        conversations: action.payload.conversations,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case MARK_MESSAGES_READ:
      state.conversations.forEach((not) => (not.isView = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
