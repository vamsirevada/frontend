import {
  GET_CHATS,
  CHAT_ERROR,
  GET_CHATS_BY_ID,
  SEND_MESSAGE,
} from "../actions/types";

const initialState = {
  chats: [],
  chatsbyid: [],
};

//eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case GET_CHATS_BY_ID:
      return {
        ...state,
        chatsbyid: payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        chats: [payload, ...state.chats],
        chatsbyid: [payload, ...state.chatsbyid],
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
