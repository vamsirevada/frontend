import { GET_CHATS, AFTER_POST_MESSAGE, CHAT_ERROR } from "../actions/types";

//eslint-disable-next-line
export default function (state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case AFTER_POST_MESSAGE:
      return {
        ...state,
        chats: state.chats.concat(payload),
      };
    case CHAT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
